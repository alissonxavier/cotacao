(function () {
    'use strict';
    var $app = angular.module('app');

    $app.directive('timeline', function () {

        var controller = ['$scope', '$location', function ($scope, $location) {
            /**
             * @param {string} fluxo - Nome do fluxo
             * @param {int} step - Número do passo atual
             * @param {goStep} - Número do próximo passo
             * @param {string} - Página de destino
             */
            $scope.goStep = function (fluxo, step, goStep, page) {
                if (goStep < step) {
                    $location.path(fluxo + "/" + page);
                }
                return false;

            };
        }];

        return {
            templateUrl: "Templates/Directives/timeline.html",
            restrict: "E",
            replace: true,
            scope: {
                passo: "="
            },
            controller: controller
        };
    });

})();