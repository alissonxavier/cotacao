﻿(function () {
    'use strict';

    var $app = angular.module('app');

    $app.directive('inputNome', [function () {
        console.log('inputNome');
        return {
            templateUrl: 'Templates/Directives/input-nome.html',
            require: ['ngModel'],
            scope: {
                placeholder: '@',
                type: '@',
                name: '@',
                ngModel: '=',
                maxlength: '@',
                valid: '=',
                message: '@',
                isDisabled: '=',
                size: '@'
            },
            restrict: 'EA',
            link: function (scope, element, attr, ngModel) {
                let $form = angular.element(element).parent().parent().parent().parent();
                let $element = angular.element(element[0]);

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

                $form.on('submit', function () {
                    if (attr.message.length > 1) {
                        console.log(attr.message);
                    }
                });

                $element.find('input').on('input', function () {
                    attr.$set('message', '');
                });

            }
        }
    }]);

})();