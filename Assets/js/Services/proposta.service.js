(function () {
    'use strict';

    var $app = angular.module('app');

    $app.factory('$propostaService', ['$rootScope','APP_CONFIG','$http', function ($rootScope,APP_CONFIG,$http) {
        
        return {
            realizacaoProposta: realizacaoProposta
        };

        function realizacaoProposta() {
            console.log(APP_CONFIG.SERVICO.WEBSERVICE);

            var url = '';

            var requestBody = {
                
            }

            return $http.post(url, requestBody);
        }

        
    }]);

})();