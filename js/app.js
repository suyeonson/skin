"use strict";

angular.module("skin", [
	"ngRoute",
	"firebase",
	"duScroll"
])
.controller('SliderCtrl', ["$scope", "$firebaseArray", function($scope, $firebaseArray, $document) {
	var fireObj = new Firebase("https://skin-editorslab.firebaseio.com");

	var sliderBarHeight = 5;
	var sliderHeight = $("#slider").height() - sliderBarHeight;

	$scope.responses = $firebaseArray(fireObj);
	$scope.total = [];

	// init jquery ui draggable to imitate slider
	$("#slider-bar").draggable({ 
		containment: "#slider", 
		scroll: false,
		drag: function(e, ui) {
			var sliderPct = Math.round((sliderHeight-ui.position.top)/sliderHeight * 100);
			$("#slider-pct").text("Your answer is "+sliderPct+"%.");
			$("#slider-pct").css({
				"top": ui.position.top + 2 + "px"
			});
		},
		stop: function(e, ui) {
			$("#slider-answer").fadeIn();

			var sliderPct = Math.round((sliderHeight-ui.position.top)/sliderHeight * 100);
			var score;

			// calculate score based on guessed pct
			if (sliderPct <= 9 || sliderPct >= 46) {
				score = 0*4;
			} else if ((sliderPct >= 10 && sliderPct <= 14) || (sliderPct >= 41 && sliderPct <= 45)) {
				score = 5*4;
			} else if ((sliderPct >= 15 && sliderPct <= 19) || (sliderPct >= 36 && sliderPct <= 40)) {
				score = 10*4;
			} else if ((sliderPct >= 20 && sliderPct <= 24) || (sliderPct >= 31 && sliderPct <= 35)) {
				score = 15*4;
			} else if (sliderPct >= 25 && sliderPct <= 30) {
				score = 20*4;
			}

			var total = 0;
			for (var i=0; i < $scope.responses.length; i++) {
				total += $scope.responses[i].score << 0;
			}

			var avg = total/$scope.responses.length;

			$scope.responses.$add({
				guess:sliderPct,
				score:score,
				avg: avg
			});

			$("#section-1-directions").hide();
			$("#section-1-info").fadeIn();
		}
	});

	// scroll spy / nav tracking
    $scope.toTheTop = function() {
    	$document.scrollTopAnimated(0, 5000).then(function() {
        	console && console.log('You just scrolled to the top!');
    	});
    };
    var section3 = angular.element(document.getElementById('section-3'));
    $scope.toSection3 = function() {
    	$document.scrollToElementAnimated(section3);
    };

    // d3 australia
	var width = 500,
          height = 300;
    
	var projection = d3.geo.conicConformal()
		.rotate([-132, 0])
		.center([0, -27])
		.parallels([-18, -36])
		.scale(Math.min(height * 1.2, width * 0.8))
		.translate([width / 2, height / 2])
		.precision(0.1);

	var path = d3.geo.path()
		.projection(projection);

	var svg = d3.select("#section-1-d3").append("svg")
	  .attr("width", width)
	  .attr("height", height);

	d3.json("australia.json", function(error, australia) {
	if (error) throw error;

	var color = d3.scale.linear().range(["##E3A891","#B91D18"])

	svg.append("g")
	    .attr("class", "states")
	  .selectAll("path")
	    .data(topojson.feature(australia, australia.objects.states).features)
	  .enter().append("path")
	    .attr("d", path)
	    .style("fill", function(d,i) {return color(i)})
	});

	d3.select(self.frameElement).style("height", height + "px");

	
}]);