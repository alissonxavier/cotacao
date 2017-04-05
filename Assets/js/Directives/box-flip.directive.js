(function () {
    'use strict';

    var $app = angular.module('app');

    $app.directive('boxFlip', ['$timeout', function ($timeout) {
        console.log('Directive.BoxFlip');
        return {
            templateUrl: "/Templates/Directives/box-flip.html",
            transclude: true,
            restrict: 'EA',
            scope: {
                ngModel: '=',
                ischeckbox: '@',
                type: '@'
            },
            link: function (scope, element, attr, ngModel) {
                $timeout(function () {
                    var elm = element[0];
                    var $button = angular.element(elm.querySelector('.boxflip__button'));
                    var $check = element.find('input');

                    if (attr.ischeckbox) {
                        if (!$check.prop("checked")) {
                            angular.element(elm.querySelector('.boxflip__button')).addClass('boxflip__button--disabled');
                            angular.element(elm.querySelector('.boxflip__button--disabled')).removeClass('boxflip__button');
                        }

                        $button.on('click', function () {
                            if ($check.prop("checked")) {
                                angular.element(elm.querySelector('.boxflip')).toggleClass("boxflip--flipper");
                            } else {
                                return false;
                            }
                        });

                    };
                    if (!attr.ischeckbox) {
                        $button.on('click', function () {
                            angular.element(elm.querySelector('.boxflip')).toggleClass("boxflip--flipper");
                        });
                    };


                    $check.on('click', function () {

                        if (!$check.prop("checked")) {
                            angular.element(elm.querySelector('.boxflip__button')).addClass('boxflip__button--disabled');
                            angular.element(elm.querySelector('.boxflip__button--disabled')).removeClass('boxflip__button');
                        }

                        if ($check.prop("checked")) {
                            angular.element(elm.querySelector('.boxflip__button--disabled')).addClass('boxflip__button');
                            angular.element(elm.querySelector('.boxflip__button')).removeClass('boxflip__button--disabled');
                        }

                    });



                    //console.log(element);

                }, 0);

            }
        };
    }]);

})();