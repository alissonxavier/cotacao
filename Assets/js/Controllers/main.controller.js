(function () {
    'use strict';

    var $app = angular.module('app');

    $app.controller('mainCtrl', ['$scope', '$location', 'storageService', 'parallaxHelper', function ($scope, $location, storageService, parallaxHelper) {
        
        if (storageService.restore('rdStorageStep1') || storageService.restore('rdStorageStep2') || storageService.restore('rdStorageStep3')) {
            storageService.remove();
        };

        $scope.header = parallaxHelper.createAnimator(-0.5, 150, -150);
        $scope.grafismoLeft = parallaxHelper.createAnimator(-0.4, 0, -180, 40);
        $scope.grafismoRight = parallaxHelper.createAnimator(-0.4, 0, -180, 40);


        $scope.escolherPlano = function (param) {
            $scope.plano = param;
        }

        $scope.go = function (param) {
            storageService.save('plano',$scope.plano)
            $location.path(param);
        }

    }]);




})();