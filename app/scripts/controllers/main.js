'use strict';

/**
 * @ngdoc function
 * @name weatherApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the weatherApp
 */
angular.module('weatherApp')
  .controller('weatherCtrl', ['$scope', 'weatherService', function($scope, weatherService) {
    function fetchWeather(city) {
      weatherService.getWeather(city).then(function(data) {
        $scope.place = data;
      });
    }

    $scope.findWeather = function(city) {
      $scope.place = '';
      fetchWeather(city);
    };
  }]);
