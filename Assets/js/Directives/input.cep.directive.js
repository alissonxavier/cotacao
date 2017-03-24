﻿(function () {
    'use strict';

    var $app = angular.module('app');

    $app.directive('inputCep', [function () {
        console.log('inputCep');
        return {
            templateUrl: '/Templates/Directives/input-cep.html',
            require: ['ngModel'],
            scope: {
                placeholder: '@',
                type: '@',
                name: '@',
                ngModel: '=',
                maxlength: '@',
                valid: '=',
                message: '@'
            },
            restrict: 'E',
            link: function (scope, element, attr, ngModel, form) {

                element.find('input').on('blur', function () {
                    var $this = angular.element(this).val();
                    if (!$this) {
                        element.find('label').removeClass("inputPlace__label--actived");
                        scope.valid = "";
                    }
                });

                element.find('input').on('focus', function () {
                    element.find('label').addClass("inputPlace__label--actived");
                });

                element.find('label').on('click', function () {
                    element.find('label').addClass("inputPlace__label--actived");
                });


            }
        }
    }]);

})();