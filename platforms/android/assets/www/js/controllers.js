var vMaresControllers = angular.module('vMaresControllers', []);
var timesData = [];

vMaresControllers.controller('allRoutesCtrl',['$scope','$http',  function($scope, $http) {
  $http.get('config/times.json').success(function(data){
    $scope.routes = data;
    timesData = data;
  });
}]);

vMaresControllers.controller('routeDaysListCtrl', function($scope, $routeParams, $window) {
  var showFrom = 0;
  var inverse = 1;
  var loadScope = function(){
    $scope.saturdayLine = $scope.line.saturday.departure[showFrom];
    $scope.sundayLine = $scope.line.sunday.departure[showFrom];
    $scope.workingDayLine = $scope.line.workingDays.departure[showFrom];
    $scope.lineFrom = $scope.line.workingDays.departure[showFrom].city;
    $scope.inverseLine = $scope.line.workingDays.departure[inverse].city;
  }

  for (var i = 0; i < timesData.length; i++) {
    if ($routeParams.item == timesData[i].nameLine){
      $scope.line = timesData[i];
      loadScope();
    }
  };

  $scope.changeFrom = function(){
    if (showFrom == 0){showFrom=1;inverse =0} else{showFrom=0;inverse=1}
    loadScope();
  }
  $scope.backApp = function() {
    $window.history.back();
  }
});

vMaresControllers.controller('searchCtrl', function($scope, $routeParams, $window) {
  $scope.routes = timesData;
  $scope.backApp = function() {
    $window.history.back();
  }
});

vMaresControllers.controller('itinerarieCtrl', function($scope, $routeParams, $window) {
  var showFrom = 0;
  var inverse = 1;
  var loadScope = function(){
    $scope.route = $scope.line[showFrom].route;
    $scope.city = $scope.line[showFrom].city;
    $scope.inverseCity = $scope.line[inverse].city;
  }

  for (var i = 0; i < timesData.length; i++) {
    if ($routeParams.nameLine == timesData[i].nameLine){
      $scope.line = timesData[i].itineraries;
      loadScope();
      break;
    }
  }

  $scope.changeFrom = function(){
    if (showFrom == 0){showFrom=1;inverse =0;} else{showFrom=0;inverse=1}
    loadScope();
  }

  $scope.backApp = function() {
    $window.history.back();
  }
});


