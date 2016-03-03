"use strict";

angular.module("skin", [
	"ngRoute",
	"firebase"
])
.controller('SliderCtrl', ["$scope", "$firebaseArray", function($scope, $firebaseArray) {
	var fireObj = new Firebase("https://skin-editorslab.firebaseio.com");

	var sliderBarHeight = 5;
	var sliderHeight = $("#slider").height() - sliderBarHeight;

	$scope.responses = $firebaseArray(fireObj);;

	// init jquery ui draggable to imitate slider
	$("#slider-bar").draggable({ 
		containment: "#slider", 
		scroll: false,
		drag: function(e, ui) {
			var sliderPct = Math.round((sliderHeight-ui.position.top)/sliderHeight * 100);
			$("#slider-pct").text(sliderPct+"%");
			$("#slider-pct").css({
				"top": ui.position.top - 7.5 + "px"
			});
		},
		stop: function(e, ui) {
			$("#slider-answer").fadeIn();

			var sliderPct = Math.round((sliderHeight-ui.position.top)/sliderHeight * 100);
			$scope.responses.$add(sliderPct);
		}
	});
}]);