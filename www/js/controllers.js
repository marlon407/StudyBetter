
var studyBetterControllers = angular.module('studyBetterControllers', ['services']);

//Controller for List of Classes---------------
studyBetterControllers.controller('ClassesListCtrl', ['$scope', 'ClassRepository', function($scope, ClassRepository){
    $scope.classesList = [];
    db = window.openDatabase("myapp.db", "1.0", "My app", -1);
    ClassRepository.all().then(function(classes){
        $scope.classesList = classes;
    });

  }]);

//Controller of Class Details
studyBetterControllers.controller('ClassDetailCtrl', ['$scope', 'ClassRepository','$window','$routeParams' ,
	function($scope, ClassRepository, $window, $routeParams) {
	    $scope.currentClass;
	    if($routeParams.ClassId != 0){
		    ClassRepository.getById($routeParams.ClassId).then(function(currentClass){
		        $scope.currentClass = currentClass;
		    });;
		}

	$scope.backApp = function() {
        $window.history.back();
    }

    $scope.delete = function(id){
    	ClassRepository.remove(id);
    	$window.alert("Successful operation");
        var ref = "#/classes/";
	    $window.location.href=ref;
    }

    $scope.update = function(currentClass) {
    	if(currentClass.ClassId == undefined){
			ClassRepository.save(currentClass);    		
    	}
    	else
	    	ClassRepository.update(currentClass);
	    
        $window.alert("Successful operation");
        $window.history.back();
	    
      };
}]);

//Avaliation-----------------------------------
studyBetterControllers.controller('AvaliationsCtrl', ['$scope', 'AvaliationRepository','$window','$routeParams' ,
	function($scope, AvaliationRepository, $window, $routeParams) {
		$scope.avalList = [];
		$scope.achivied = 0;
		$scope.max = 0;
		$scope.orderProp = 'Data';
		$scope.classId = $routeParams.ClassId;
		$scope.stillMissing = 0;
	    AvaliationRepository.all($routeParams.ClassId).then(function(avalList){
	        $scope.avalList = avalList;
	        $scope.avalListGraded = [];
	        $scope.avalListUngraded = [];
	        for(i =0; i < $scope.avalList.length; i++){
	        	if($scope.avalList[i].Data != "Invalid Date"){
	    			var evDate = new Date($scope.avalList[i].Data);
	    			$scope.avalList[i].FormatData = dataFormat(evDate);
	    		}
	    		else
	    			$scope.avalList[i].FormatData = "Not defined";

	    		if($scope.avalList[i].Grade != null){
	    			$scope.max += $scope.avalList[i].Worth;
	    			$scope.achivied += $scope.avalList[i].Grade;
	    			$scope.avalListGraded.push($scope.avalList[i]);
	    		}
	    		else
	    			$scope.avalListUngraded.push($scope.avalList[i]);

	    		

	    	}	
	    	$scope.achivied = ($scope.achivied).toFixed(2);
	    });

	    AvaliationRepository.getMiniumFromClass($routeParams.ClassId).then(function(result){
			$scope.stillMissing = result.MinimumPercentage - $scope.achivied;
		});

		var dataFormat = function(d){
			var curr_date = d.getDate();
			var curr_month = d.getMonth();
			var curr_year = d.getFullYear();
			return (m_names[curr_month] + ", " + curr_date + "-" + curr_year);	
		}

	    $scope.editClass = function(){
	    	var ref = "#/classes/"+$scope.classId;
	    	$window.location.href=ref;
	    }

	    $scope.addAvaliation = function(){
	    	var ref = "#/newAvaliation/"+$scope.classId;
	    	$window.location.href=ref;
	    }
	  $scope.backApp = function() {
        $window.history.back();
    }
}]);

studyBetterControllers.controller('AvaliationDetailCtrl', ['$scope', 'AvaliationRepository','$window','$routeParams' ,
	function($scope, AvaliationRepository, $window, $routeParams) {
	    $scope.aval;
	    $scope.canStudy = false;
	    if($routeParams.AvaliationId != 0){
		    AvaliationRepository.getById($routeParams.AvaliationId).then(function(aval){
		        $scope.aval = aval;
		        $scope.aval.Data = new Date($scope.aval.Data);
		        var dt = new Date(Date.now());
		        if($scope.aval.Data > dt)
		        	$scope.canStudy = true;
		    });;
		}

	$scope.backApp = function() {
        $window.history.back();
    }

    $scope.delete = function(id){
    	AvaliationRepository.remove(id);
    	$window.alert("Successful operation");
        $window.history.back();
    }

    $scope.update = function(aval) {
    	if(aval.Grade == undefined) aval.Grade = null;
    	if(aval.Difficult == undefined) aval.Difficult = null;
	    AvaliationRepository.update(aval);
        $window.alert("Successful operation");
        $window.history.back();
      };

     $scope.study = function(dif){
     	if(dif == "")
     		$window.alert("Please add a difficult");
     	else {
     		var ref = "#/study/"+dif;
		    $window.location.href=ref;
		}
     }
}]);

studyBetterControllers.controller('NewAvaliationCtrl', ['$scope', 'AvaliationRepository','$window','$routeParams' ,
	function($scope, AvaliationRepository, $window, $routeParams) {
	    $scope.aval;
	    

	$scope.backApp = function() {
        $window.history.back();
    }

    $scope.update = function(aval) {
    	if(aval.Difficult == undefined) aval.Difficult = null;
    	if(aval.Grade == undefined) aval.Grade = null;
    	aval.ClassId = $routeParams.ClassId;
    	aval.Data = new Date(aval.Data);
	    AvaliationRepository.save(aval);
        $window.alert("Successful operation");
        $window.history.back();
	    
      };
}]);

//Study -------------------------------------

studyBetterControllers.controller('studyCtrl', ['$scope', '$window','$routeParams',
	function($scope, $window, $routeParams) {
		$scope.timerRunning = false;
 		$scope.countdown = 1000 * parseInt($routeParams.Dif);
            $scope.startTimer = function (){
                $scope.$broadcast('timer-start');
                $scope.timerRunning = true;
            };

            $scope.backApp = function() {
        		$window.history.back();
    		}

    		$scope.addTime = function() {
        		$scope.$broadcast('timer-start');
                $scope.timerRunning = true;
        		$scope.countdown = 600;
    		}
 
            $scope.stopTimer = function (){
                $scope.$broadcast('timer-stop');
                $scope.timerRunning = false;
            };
 
            $scope.$on('timer-tick', function (event, data){
            	if(data.millis == 0){
	                $window.alert("Congradulations, you finished your studies");
           		}
            });
	}]);

//Upcoming -------------------------------------

studyBetterControllers.controller('upcomingCtrl', ['$scope', 'UpcomingRepository','$window',
	function($scope, UpcomingRepository, $window) {
		//TODO - study SQLIte to only bring the upcoming events from database
		UpcomingRepository.all().then(function(allEvents){
			$scope.events = [];
			var dt = new Date(Date.now());
			for(i = 0; i < allEvents.length; i++){
				var evDate = new Date(allEvents[i].Data);
				if(dt < evDate){
					allEvents[i].FormatData = dataFormat(evDate);
					$scope.events.push(allEvents[i]);
				}

			}
		});

		var dataFormat = function(d){
			var curr_date = d.getDate();
			var curr_month = d.getMonth();
			var curr_year = d.getFullYear();
			return (m_names[curr_month] + ", " + curr_date + "-" + curr_year);	
		}

		$scope.backApp = function() {
        	$window.history.back();
    	}
	}]);

var m_names = new Array("January", "February", "March", 
"April", "May", "June", "July", "August", "September", 
"October", "November", "December");









