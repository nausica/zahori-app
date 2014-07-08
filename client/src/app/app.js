/* global angular */

(function () {

	'use strict';

	angular.module('app', [
		'ngRoute',
		'geolocation']);


	angular.module('app').config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
		$locationProvider.html5Mode(true);
		//$routeProvider.otherwise({redirectTo:'/fountains'});
	}]);


	angular.module('app')
		.controller('ZahoriCtrl', ['$scope', '$location', '$route', 'geolocation',
			function ($scope, $location, $route, geolocation) {	
				console.log('ctrl');
				geolocation.getLocation().then(function(data){
					$scope.coords = { lat: data.coords.latitude, long: data.coords.longitude};
			    });
			}
		]);

}());

angular.module('myApp',['geolocation'])
  .controller('mainCtrl', function ($scope,geolocation) {
    $scope.coords = geolocation.getLocation().then(function(data){
      return {lat:data.coords.latitude, long:data.coords.longitude};
    });
});
