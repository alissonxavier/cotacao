(function () {
    'use strict';

    var $app = angular.module('app');

    $app.directive('inputLocation', [function () {
        console.log('inputLocation');
        return {
            templateUrl: '/Templates/Directives/input-location.html',
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
            restrict: 'EA',
            link: function (scope, element, attr, ngModel) {

                element.find('input').on('blur', function () {
                    var $this = angular.element(this).val();
                    if (!$this) {
                        element.find('label').removeClass("inputPlace__label--actived");
                        scope.valid = "";
                    }
                });

                element.find('button').on('click', function () {
                    element.find('label').addClass("inputPlace__label--actived");
                    scope.$apply(getGeolocation);
                });

                function getGeolocation() {
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(function (position) {
                            ngModel[0].$setViewValue(position.coords.longitude + ' , ' + position.coords.latitude);
                            ngModel[0].$render();
                        });
                    }
                }
            }
        }
    }]);

})();