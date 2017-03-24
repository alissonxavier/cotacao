(function () {
    'use strict';

    var $app = angular.module('app');

    $app.directive('boxFlip', ['$timeout', function ($timeout) {
        console.log('Directive.BoxFlip');
        return {
            templateUrl: "/Templates/Directives/box-flip.html",
            transclude: true,
            restrict: 'E',
            scope : {
                ngModel: '@',
                ischeckbox : '@'
            },
            link: function (scope, element, attr, ngModel) {

                $timeout(function () {
                    var elm = element[0];
                    var $button = angular.element(elm.querySelector('.boxflip__button'));

                    $button.on('click', function () {
                        angular.element(elm.querySelector('.boxflip')).toggleClass("boxflip--flipper");
                    });

                }, 2);

            }
        };
    }]);

})();