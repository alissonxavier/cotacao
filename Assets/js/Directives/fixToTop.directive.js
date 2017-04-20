(function () {
    'use strict';

    var $app = angular.module('app');
    console.log("fixToTop Directive");
    $app.directive('fixToTop', function ($window) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {

                var elementTop = element[0].offsetTop;

                angular.element($window).on('scroll', function () {
                    if (angular.element(this)[0].pageYOffset > 150) {
                        element.addClass('headerFix');
                    } else {
                        element.removeClass('headerFix');
                    }
                });

                //console.log($window.offsetTop);

                //angular.element();

                //angular.element($window).bind('scroll', function () {
                //    if (this.pageYOfsset >= 100) {
                //        scope.changeClassToFix = true;
                //    } else {
                //        scope.changeClassToFix = false;
                //    }
                //});
            }
        }
    });

})();