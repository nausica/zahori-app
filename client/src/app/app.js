/* global angular */

(function () {

	'use strict';

	angular.module('app', [
		'ngRoute',
		'google-maps',
		'geolocation']);


	angular.module('app').config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
		$locationProvider.html5Mode(true);
		//$routeProvider.otherwise({redirectTo:'/fountains'});
	}]);


	angular.module('app')
		.controller('ZahoriCtrl', ['$scope', '$location', '$route', 'geolocation',
			function ($scope, $location, $route, geolocation) {	

				// Enable the new Google Maps visuals until it gets enabled by default.
				// See http://googlegeodevelopers.blogspot.ca/2013/05/a-fresh-new-look-for-maps-api-for-all.html
				google.maps.visualRefresh = true;

				var onMarkerClicked = function (marker) {
				    marker.showWindow = true;
				    $scope.$apply();
				    //window.alert("Marker: lat: " + marker.latitude + ", lon: " + marker.longitude + " clicked!!")
				};

				var addFountain = function() {
					// add new marker to the scope
					$scope.map.markers.push({
						isNew: true,
						showWindow: false,
		    			//draggable: true,
						// coords:{
					    latitude: $scope.coords.lat,
					    longitude: $scope.coords.long,
					    icon: 'static/img/blue_marker.png',
					    options: {
					    	draggable: true
					    },
					    events: {
					    	dragend: function (marker, eventName, args) {
					        	console.log('marker dragend');
					        	$log.log(marker.getPosition().lat());
					        	$log.log(marker.getPosition().lng());
					    	}
					    }
					});
				};

				angular.extend($scope, {
			    	map: {
				      	control: {},
				    	center: {
				        	latitude: 42,
				        	longitude: -71
				    	},
						options: {
		        			streetViewControl: false,
		        			panControl: false,
		        			maxZoom: 20,
		        			minZoom: 3
	      				},
		      			zoom: 16,
		      			draggable: true,
		      			bounds: {},

		    			markers: [{
		    				showWindow: false,
		    				draggable: true,
						    division: "US",
					        type: "US",
					        // coords:{
					        latitude: 42.3632672,
					        longitude: -71.0821456,
					        driverCode: "GRIP",
					        trailer: "  5555",
					        status: "D",
					        orderNumber: "9999999",
					        destinationCityCode: "MT",
					        destinationStateCode: "PA",
					        contactCityCode: "PICK",
					        contactStateCode: "ON",
					        icon: undefined,
					        id: "7"
					    }]
					}
				});

				$scope.onMarkerClicked = onMarkerClicked;
				$scope.addFountain = addFountain;

				geolocation.getLocation().then(function(data){
					$scope.coords = { lat: data.coords.latitude, long: data.coords.longitude};

					$scope.map.center = {
						latitude: data.coords.latitude,
						longitude: data.coords.longitude
					}
			    });
			}
		]);

}());
