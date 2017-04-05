(function () {
    'use strict';

    var $app = angular.module('app');

    $app.controller('pagamentoCtrl', ['$scope', '$location', 'storageService', function ($scope, $location, storageService) {

        if (storageService.restore('rdStorageStep1') && storageService.restore('rdStorageStep3')) {
            $scope.dadosPessoais = JSON.parse(storageService.restore('rdStorageStep1'));
            $scope.dadosComplementares = JSON.parse(storageService.restore('rdStorageStep3'));
        };

/**
 * go
 * @param param - Url de destino
 */
        $scope.go = function (param) {
            $location.path(param);
        }

    }]);


})();