(function () {
    'use strict';

    var $app = angular.module('app');

    $app.factory('$coberturasService', ['$rootScope','APP_CONFIG','$http', function ($rootScope,APP_CONFIG,$http) {
        
        return {
            getCoberturas: getCoberturas
        };

        function getCoberturas() {
            console.log(APP_CONFIG.SERVICO.WEBSERVICE);

            var url = '';

            var requestBody = {
                
            }

            return $http.post(url, requestBody);
        }

        
    }]);

})();