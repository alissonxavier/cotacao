(function () {
    'use strict';

    var $app = angular.module('app');

    $app.factory('storageService', ['$rootScope', '$window', '$logService', function ($rootScope, $window, $logService) {
        $logService.message('storageService');

        var step = [];

        function save(id, content) {
            $logService.message(content);
            sessionStorage[id] = angular.toJson(content);
        };

        function restore(id) {
            return sessionStorage[id];
        };

        function remove() {
            sessionStorage.clear();
        };

        return {
            save: save,
            restore: restore,
            remove: remove
        };

    }]);

})();