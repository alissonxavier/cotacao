(function () {
    'use strict';

    var $app = angular.module('app');

    $app.controller('mainCtrl', ['$scope', '$location', 'storageService', 'parallaxHelper', function ($scope, $location, storageService, parallaxHelper) {
        
        if (storageService.restore('rdStorageStep1') || storageService.restore('rdStorageStep2') || storageService.restore('rdStorageStep3')) {
            storageService.remove();
        };

        $scope.go = function (param) {
            $location.path(param);
        }

    }]);

})();