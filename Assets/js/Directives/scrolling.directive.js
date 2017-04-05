(function () {
    'use strict';
    
    var $app = angular.module('app');

    $app.directive('scrollingToSteps', ['$window', function ($window) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var wTop = element[0].offsetTop;
                $("body,html").stop().animate({ scrollTop: Math.round(wTop + 340) }, 1500);
            }
        };

    }]);

})();