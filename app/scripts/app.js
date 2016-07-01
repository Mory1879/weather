'use strict';

/**
 * @ngdoc overview
 * @name weatherApp
 * @description
 * # weatherApp
 *
 * Main module of the application.
 */
angular
  .module('weatherApp', [
    'ngResource',
    'ngRoute',
    'ngSanitize'
  ])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'weatherCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .factory('weatherService', ['$http', '$q', function($http, $q) {
    function getWeather(city) {
      var deferred = $q.defer();
      $http.get('http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22' + city + '%22)&format=json&diagnostics=true&callback=')
        .success(function(data) {
          deferred.resolve(data.query.results.channel);
        })
        .error(function(err) {
          console.log('Error retrieving markets');
          deferred.reject(err);
        });
      return deferred.promise;
    }

    return {
      getWeather: getWeather
    };
  }]);
