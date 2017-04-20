(function () {
    'use strict';

    var $app = angular.module('app');

    $app.directive('scrollingToSteps', ['$window', function ($window) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var wWindow = $window.innerWidth;
                var wTop = element[0].offsetTop;
                
                if (wWindow <= 768 || wWindow > 768) {
                    $("html,body").stop().animate({ scrollTop: Math.round(wTop - 60) }, 1500);
                }

                if ( wWindow >= 992) {
                    $("html,body").stop().animate({ scrollTop: Math.round(wTop - 20) }, 1500);
                }
            }
        };

    }]);

})();