"use strict";

angular.module("skin", [
	"ngRoute",
	"bookrx.signin",
	"bookrx.signup",
	"bookrx.home"
])
// .
// config(["$routeProvider", function($routeProvider) {
// 	// set default view of app to sign in page
// 	$routeProvider.otherwise({
// 		redirectTo: "home"
// 	});

// 	// default view to home page w/ the calculator. to save content, log in.
// }]);	