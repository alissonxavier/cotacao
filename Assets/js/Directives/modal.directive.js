(function () {
    'use strict';

    var $app = angular.module('app');

    $app.directive('modal', function () {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: '/Templates/Directives/modal.html',
            scope : {
                display : "@"
            },
            link: function (scope, element, attr) {
                
            }
        }
    });

})();