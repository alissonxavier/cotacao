(function () {
	'use strict';
	var $app = angular.module('app');

	$app.directive('timeline', function () {

		var controller = ['$scope', function ($scope) {
			console.log("timeline.Directive");
		}];

		return {
			templateUrl: "/Templates/Directives/timeline.html",
			restrict: "E",
			replace: true,
			scope: {
				passo: "@"
			},
			controller: controller
		};
	});

})();