
var studyBetterControllers = angular.module('studyBetterControllers', ['services']);

//Controller for Patientlist
studyBetterControllers.controller('ClassesListCtrl', ['$scope', 'MyApp', function($scope, MyApp){
    $scope.classesList = [];
    db = window.openDatabase("myapp.db", "1.0", "My app", -1);
    MyApp.all().then(function(classes){
        $scope.classesList = classes;
    });

  }]);

studyBetterControllers.controller('ClassDetailCtrl', ['$scope', 'MyApp','$window','$routeParams' ,
	function($scope, MyApp, $window, $routeParams) {
	    $scope.currentClass;
	    if($routeParams.ClassId != 0){
		    MyApp.getById($routeParams.ClassId).then(function(currentClass){
		        $scope.currentClass = currentClass;
		    });;
		}

	$scope.backApp = function() {
        $window.history.back();
    }

    $scope.update = function(currentClass) {
    	if(currentClass.ClassId == undefined){
	    	MyApp.save(currentClass);    	
	    }
	    else{
	    	MyApp.update(currentClass);
	    }
        $window.alert("Successful operation");
        $window.history.back();
	    
      };
}]);