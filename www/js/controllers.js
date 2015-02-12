
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
		$scope.classId = $routeParams.ClassId;
	    AvaliationRepository.all($routeParams.ClassId).then(function(avalList){
	        $scope.avalList = avalList;
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
		        debugger;
		        if($scope.aval.Grade == "undefined"){
	    			$scope.aval.Grade = "";	
	    		}
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
    	if(aval.AvaliationId == undefined){
	    	AvaliationRepository.save(aval);    	
	    }
	    else{
	    	AvaliationRepository.update(aval);
	    }
        $window.alert("Successful operation");
        $window.history.back();
	    
      };
}]);

studyBetterControllers.controller('NewAvaliationCtrl', ['$scope', 'AvaliationRepository','$window','$routeParams' ,
	function($scope, AvaliationRepository, $window, $routeParams) {
	    $scope.aval;
	    

	$scope.backApp = function() {
        $window.history.back();
    }

    $scope.update = function(aval) {
    	aval.ClassId = $routeParams.ClassId;
	    AvaliationRepository.save(aval);
        $window.alert("Successful operation");
        $window.history.back();
	    
      };
}]);





