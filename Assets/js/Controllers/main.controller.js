(function () {
    'use strict';

    var $app = angular.module('app');

    $app.controller('mainController', ['$scope', '$location', function ($scope, $location) {
        
        $scope.go = function (param) {
            $location.path(param);
        }

    }]);




})();