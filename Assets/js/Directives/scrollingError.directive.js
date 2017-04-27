(function () {
    'use strict';

    var $app = angular.module('app');

    $app.directive('scrollingToError', ['$window', function ($window) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                let $form = angular.element(element).parent().parent().parent().parent();
                let wWindow = $window.innerWidth;
                let wTop = $(element[0]).offset().top;

                $form.on('submit', function () {
                    if (attrs.message.length > 1) {
                        if (wWindow <= 768 || wWindow > 768) {
                            $("html,body").stop().animate({ scrollTop: Math.round(wTop - 120) }, 1000);
                        }

                        if (wWindow >= 992) {
                            $("html,body").stop().animate({ scrollTop: Math.round(wTop - 60) }, 1000);
                        }
                    }
                });
            }
        };

    }]);

})();