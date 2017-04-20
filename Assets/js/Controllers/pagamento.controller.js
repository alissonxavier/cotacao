(function () {
    'use strict';

    var $app = angular.module('app');

    $app.controller('pagamentoCtrl', ['$scope', '$location', 'storageService', function ($scope, $location, storageService) {

        if (storageService.restore('rdStorageStep1') && storageService.restore('rdStorageStep3') 
        && storageService.restore('coberturas') && storageService.restore('assistencias') 
        && storageService.restore('cotacao')) {
            $scope.dadosPessoais = JSON.parse(storageService.restore('rdStorageStep1'));
            $scope.dadosComplementares = JSON.parse(storageService.restore('rdStorageStep3'));
            $scope.coberturas = JSON.parse(storageService.restore('coberturas'));
            $scope.assistencias = JSON.parse(storageService.restore('assistencias'));
            $scope.cotacao = JSON.parse(storageService.restore('cotacao'));
        };

        $scope.passo = 4;

/**
 * go
 * @param param - Url de destino
 */
        $scope.go = function (param) {
            $location.path(param);
        }

    }]);


})();