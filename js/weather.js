"use strict";

angular.module("weather-app", [])
  .factory("locationFactory", locationFactory)
  .factory("weatherFactory", weatherFactory)
  .controller("weatherCtrl", weatherCtrl)
  .directive("jbWeatherIcon", jbWeatherIcon);

locationFactory.$inject = ["$q", "$http"];

function locationFactory($q, $http) {
  return {
    getCurrentLocation: function() {
      var deferred = $q.defer();

      //default location points at london
      var londonLocation = {
        latitude: 51.5074,
        longitude: 0.1278
      };

      $http.get('http://ipinfo.io')
        .then(function successCallBack(response) {
            deferred.resolve({
              latitude: response.data.loc.split(',')[0],
              longitude: response.data.loc.split(',')[1]
            });
          },
          function errorCallBack() {
            alert("Sorry, no position available.");
            deferred.reject(londonLocation);
          });

      return deferred.promise;
    }
  };
}

weatherFactory.$inject = ["$q", "$http"];

function weatherFactory($q, $http) {
  return {
    apiKey: "c591486a67cf758d64182858c0a62750",
    createWeatherUrlWithLocationAndApiKey: function(location, apiKey) {

      return "http://api.openweathermap.org/data/2.5/weather?lat=" +
        location.latitude +
        "&lon=" + location.longitude +
        "&APPID=" + apiKey;
    },
    getWeatherDataFromUrl: function(url) {
      var deferred = $q.defer();
      $http.get(url)
        .then(function successCallBack(response) {
          deferred.resolve(response.data);
        }, function errorCallBack(reason) {
          deferred.reject(reason);
        });
      return deferred.promise;
    },
    convertKelvinToCelsius: function(temp) {
      return Math.round(temp - 273.15);
    },
    convertKelvinToFahrenheit: function(temp) {
      return Math.round((temp * (9 / 5)) - 459.67);
    }
  };
}

weatherCtrl.$inject = ["$scope", "locationFactory", "weatherFactory"];

function weatherCtrl($scope, locationFactory, weatherFactory) {
  var metric = 0;
  var jbWeatherIconDict = {
    '01d': '<div class="icon sunny"><div class="sun"><div class="rays"></div></div></div>', //clear sky
    '02d': '<div class="icon sun-cloudy"><div class="cloud"></div><div class="sun"><div class="rays"></div></div></div>', //few clouds
    '03d': '<div class="icon cloudy"><div class="cloud"></div><div class="cloud"></div></div>', //scattered clouds
    '04d': '<div class="icon cloudy"><div class="cloud"></div><div class="cloud"></div></div>', //broken clouds
    '09d': '<div class="icon rainy"><div class="cloud"></div><div class="rain"></div></div>', //shower rain
    '10d': '<div class="icon sun-shower"><div class="cloud"></div><div class="sun"><div class="rays"></div></div><div class="rain"></div></div>', //rain
    '11d': '<div class="icon thunder-storm"><div class="cloud"></div><div class="lightning"><div class="bolt"></div><div class="bolt"></div></div></div>', //thunderstorm
    '13d': '<div class="icon flurries"><div class="cloud"></div><div class="snow"><div class="flake"></div><div class="flake"></div></div></div>', //snow
    '50d': '<div class="icon cloudy"><div class="cloud"></div><div class="cloud"></div></div>' //mist
  };

  $scope.init = function() {
    locationFactory.getCurrentLocation()
      .then(function successCallBack(currentLocation) {
          //location succeeded to fetch
          setupWeatherCtrlWithUrl(
            weatherFactory.createWeatherUrlWithLocationAndApiKey(currentLocation,
              weatherFactory.apiKey));
        },
        function errorCallBack(defaultLocation) {
          //location failed to fetch
          setupWeatherCtrlWithUrl(
            weatherFactory.createWeatherUrlWithLocationAndApiKey(defaultLocation,
              weatherFactory.apiKey));
        });
  }

  function setupWeatherCtrlWithUrl(url) {
    weatherFactory.getWeatherDataFromUrl(url)
      .then(function successCallBack(response) {
        var weatherIcon = response.weather[0].icon.replace('n', 'd');
        $('jb-weather-icon').html(jbWeatherIconDict[weatherIcon]);

        $scope.location = response.name + ", " + response.sys.country;
        $scope.weatherCondition = response.weather[0].main;
        $scope.weatherConditionDescription = response.weather[0].description;
        $scope.celsius = weatherFactory.convertKelvinToCelsius(response.main.temp) + "\u00B0C";
        $scope.fahrenheit = weatherFactory.convertKelvinToFahrenheit(response.main.temp) + "\u00B0F";

        $scope.temperature = $scope.celsius;
      }, function errorCallBack(reason) {
        console.log(reason);
      });
  }

  $scope.convertTemp = function() {
    if (metric) {
      $scope.temperature = $scope.celsius;
    } else {
      $scope.temperature = $scope.fahrenheit;
    }
    metric = !metric;
  }

}

function jbWeatherIcon() {
  return {
    restrict: 'E',
    template: "<div></div>"
  };

}
