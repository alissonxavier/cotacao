﻿(function () {
    'use strict';

    var $app = angular.module('app');

    $app.directive('inputTelefone', [function () {
        console.log('inputTelefone');
        return {
            templateUrl: 'Templates/Directives/input-telefone.html',
            require: ['ngModel'],
            scope: {
                placeholder: '@',
                name: '@',
                ngModel: '=',
                valid: '=',
                message: '@',
                maxlength: '@'
            },
            restrict: 'AE',
            link: function (scope, element, attr, ngModel) {

                element.find('input').on('blur', function () {
                    var $this = angular.element(this).val();
                    if (!$this) {
                        element.find('label').removeClass("inputPlace__label--actived");
                        scope.valid = "";
                    }
                });

                setTimeout(function () {
                    var value = element.find('input').val();
                    if (value) {
                        element.find('label').addClass("inputPlace__label--actived");
                    }
                }, 0);

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