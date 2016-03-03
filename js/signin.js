'use strict';

angular.module('bookrx.signin', ['ngRoute','firebase'])
 
// Declared route 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/signin', {
        templateUrl: 'signin.html',
        controller: 'SigninCtrl'
    });
}])
 
// Home controller
.controller('SigninCtrl', ["$scope", "$location", "$firebaseAuth", function($scope, $location, $firebaseAuth) {
	var firebaseObj = new Firebase("https://fiery-heat-2253.firebaseio.com");
	var loginObj = $firebaseAuth(firebaseObj);

	$scope.SignIn = function(event) {
		event.preventDefault();
		var username = $scope.user.email;
		var password = $scope.user.password;

		if (!$scope.signinForm.$invalid) {
			loginObj.$authWithPassword({
				email: username,
				password: password
			})
			.then(function(user) {
				$location.path('/home');
			}, function(error) {
				$scope.signinError = true;
				$scope.signinErrorMessage = error.code;
			});
		}
	}
}]);
