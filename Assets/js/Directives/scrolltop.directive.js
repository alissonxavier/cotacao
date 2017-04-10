﻿(function () {
    'use strict';

    var $app = angular.module('app');

    $app.directive('scrollingToTop', ['$window', function ($window) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var wTop = element[0].offsetTop;
                $("body,html").stop().animate({ scrollTop: 0 }, 600);
            }
        };

    }]);

})();