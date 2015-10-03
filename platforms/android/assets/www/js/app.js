var db = null;

var app = angular.module('vmares', ['ionic', 'ngRoute', 'vMaresControllers']);

//Providing routes for the whole applicarion so far
//I am not using Express at this point.
app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/allRoutes', {
        templateUrl: 'Views/allRoutes.html',
        controller: 'allRoutesCtrl'
      }).
      when('/routeDays/:item', {
        templateUrl: 'Views/routeDays.html',
        controller: 'routeDaysListCtrl'
      }).
      when('/route', {
        templateUrl: 'Views/routeHours.html',
        controller: 'routeHoursCtrl'
      }).
      when('/search/', {
        templateUrl: 'Views/search.html',
        controller: 'searchCtrl'
      }).
      when('/itinerary/:nameLine', {
        templateUrl: 'Views/itinerary.html',
        controller: 'itinerarieCtrl'
      }).
      when('/study/:Dif', {
        templateUrl: 'Views/study.html',
        controller: 'studyCtrl'
      }).
      when('/upcoming/', {
        templateUrl: 'Views/Upcoming.html',
        controller: 'upcomingCtrl'
      }).
      otherwise({
        redirectTo: '/allRoutes'
      });
  }]);









