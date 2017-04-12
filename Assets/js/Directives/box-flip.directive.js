(function () {
    'use strict';

    var $app = angular.module('app');

    $app.directive('boxFlip', ['$timeout', function ($timeout) {
        console.log('Directive.BoxFlip');
        return {
            templateUrl: "Templates/Directives/box-flip.html",
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
                            angular.element(elm).addClass('boxflip--disabled');
                            angular.element(elm).find('image').addClass('boxflip__icon__img--disabled');

                            if (attr.type != 'min') {
                                angular.element(elm.querySelector('.boxflip__button')).addClass('boxflip__button--disabled');
                                angular.element(elm.querySelector('.boxflip__button--disabled')).removeClass('boxflip__button');
                            }

                            angular.element(elm.querySelector('.boxflip__info--actived')).toggleClass('hidden');
                            angular.element(elm.querySelector('.boxflip__info--desactived')).toggleClass('show');
                            angular.element(elm.querySelector('.boxflip__info--desactived')).removeClass('hidden');
                        }
                    };


                    $button.on('click', function () {
                        if ($check.prop("checked")) {
                            angular.element(elm).removeClass('boxflip--disabled');
                            angular.element(elm).find('image').removeClass('boxflip__icon__img--disabled');
                            angular.element(this).toggleClass('boxflip__button--back');
                            angular.element(elm.querySelector('.boxflip-flip')).toggleClass("boxflip--flipper");
                            if (attr.type != 'min') {
                                angular.element(elm.querySelector('.boxflip__info--actived')).removeClass('hidden');
                                angular.element(elm.querySelector('.boxflip__info--actived')).addClass('show');
                            }
                            //angular.element(elm.querySelector('.boxflip__info--desactived')).addClass('hidden');
                        } else {
                            if (attr.type == 'min' || !attr.ischeckbox) {
                                angular.element(elm.querySelector('.boxflip-flip')).toggleClass("boxflip--flipper");
                                angular.element(this).toggleClass('boxflip__button--back');
                            }
                        }
                    });

                    if (attr.type == 'min') {
                        angular.element(elm.querySelector('.boxflip__button--disabled')).addClass('boxflip__button');
                        angular.element(elm.querySelector('.boxflip__button--disabled')).removeClass('boxflip__button--disabled');
                    }


                    $check.on('click', function () {

                        if (!$check.prop("checked")) {
                            angular.element(elm).addClass('boxflip--disabled');
                            angular.element(elm).find('image').addClass('boxflip__icon__img--disabled');
                            if (attr.type != 'min') {
                                angular.element(elm.querySelector('.boxflip__button')).addClass('boxflip__button--disabled');
                                angular.element(elm.querySelector('.boxflip__button--disabled')).removeClass('boxflip__button');
                            }
                            //boxflip__info--visible
                            angular.element(elm.querySelector('.boxflip__info--actived')).addClass('hidden');
                            angular.element(elm.querySelector('.boxflip__info--desactived')).addClass('show');
                            angular.element(elm.querySelector('.boxflip__info--desactived')).removeClass('hidden');
                        }

                        if ($check.prop("checked")) {
                            angular.element(elm).removeClass('boxflip--disabled');
                            angular.element(elm).find('image').removeClass('boxflip__icon__img--disabled');

                            if (attr.type != 'min') {
                                angular.element(elm.querySelector('.boxflip__button--disabled')).addClass('boxflip__button');
                                angular.element(elm.querySelector('.boxflip__button')).removeClass('boxflip__button--disabled');
                            }

                            angular.element(elm.querySelector('.boxflip__info--actived')).addClass('show');
                            angular.element(elm.querySelector('.boxflip__info--actived')).removeClass('hidden');
                            angular.element(elm.querySelector('.boxflip__info--desactived')).addClass('hidden');
                        }

                    });



                    //console.log(element);

                }, 0);

            }
        };
    }]);

})();