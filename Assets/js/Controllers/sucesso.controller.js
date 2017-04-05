(function () {
    'use strict';

    var $app = angular.module('app');

    $app.controller('sucessoCtrl', ['$scope', '$location', 'storageService', function ($scope, $location, storageService) {

        if (storageService.restore('rdStorageStep1')) {
            $scope.dadosPessoais = JSON.parse(storageService.restore('rdStorageStep1'));
        }

        /**
         * go
         * @param param - Url de destino
         */

        $scope.go = function (param) {
            $location.path(param);
        }

    }]);


})();