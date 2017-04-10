(function () {
    'use strict';

    var $app = angular.module('app');

    $app.directive('scrollingToError', ['$window', function ($window) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var wWindow = $window.innerWidth;
                var wTop = element[0].offsetTop;
                
                if (wWindow <= 768 || wWindow > 768) {
                    $(".container--gray").stop().animate({ scrollTop: Math.round(wTop - 60) }, 1000);
                }

                if ( wWindow >= 992) {
                    $(".container--gray").stop().animate({ scrollTop: Math.round(wTop + 250) }, 1000);
                }
            }
        };

    }]);

})();