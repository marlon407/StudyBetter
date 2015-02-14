
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

    $scope.update = function(currentClass) {

    	if(currentClass.ClassId == undefined){
	    	ClassRepository.save(currentClass);    	
	    }
	    else{
	    	ClassRepository.update(currentClass);
	    }
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
		$scope.classId = $routeParams.ClassId;
		$scope.stillMissing = 0;
	    AvaliationRepository.all($routeParams.ClassId).then(function(avalList){
	        $scope.avalList = avalList;
	        for(i =0; i < $scope.avalList.length; i++){
	    		if($scope.avalList[i].Grade != null){
	    			$scope.max += $scope.avalList[i].Worth;
	    			$scope.achivied += $scope.avalList[i].Grade;
	    		}
	    	}
	    });

	    AvaliationRepository.getMiniumFromClass($routeParams.ClassId).then(function(result){
			$scope.stillMissing = result.MinimumPercentage - $scope.achivied;
		});

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
	    if($routeParams.AvaliationId != 0){
		    AvaliationRepository.getById($routeParams.AvaliationId).then(function(aval){
		        $scope.aval = aval;
		        $scope.aval.Data = new Date($scope.aval.Data);
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
     	var ref = "#/study/"+dif;
	    $window.location.href=ref;
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
	    AvaliationRepository.save(aval);
        $window.alert("Successful operation");
        $window.history.back();
	    
      };
}]);

//Study -------------------------------------

studyBetterControllers.controller('studyCtrl', ['$scope', 'AvaliationRepository','$window','$routeParams' ,
	function($scope, AvaliationRepository, $window, $routeParams) {
		
	}]);










