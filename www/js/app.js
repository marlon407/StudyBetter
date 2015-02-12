var db = null;

var app = angular.module('studyBetter', ['ionic','ngCordova','ngRoute',  'services', 'studyBetterControllers']).
run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
    db = window.openDatabase("myapp.db", "1.0", "My app", -1);
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS Classes (ClassId integer primary key AUTOINCREMENT, Name text)");
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS Avaliations (AvaliationId integer primary key AUTOINCREMENT, Description text, Worth real, Grade real)");
  });
});


//Providing routes for the whole applicarion so far
//I am not using Express at this point.
app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/classes', {
        templateUrl: 'Views/ClassesList.html',
        controller: 'ClassesListCtrl'
      }).
      when('/classes/:ClassId', {
        templateUrl: 'Views/ClassDetail.html',
        controller: 'ClassDetailCtrl'
      }).
      otherwise({
        redirectTo: '/classes'
      });
  }]);








