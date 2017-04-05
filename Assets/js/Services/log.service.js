(function () {
    'use strict';

    var $app = angular.module('app');

    $app.factory('$logService', ['$rootScope', function ($rootScope) {
        function message(message) {
            console.log(message);
        };

        return {
            message: message
        }
    }]);

})();