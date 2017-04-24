(function () {
    'use strict';

    var $app = angular.module('app');

    $app.factory('$propostaService', ['$rootScope','APP_CONFIG','$http', function ($rootScope,APP_CONFIG,$http) {
        
        return {
            realizacaoProposta: realizacaoProposta
        };

        function realizacaoProposta(requestBody) {
            
           var url = APP_CONFIG.SERVICO.WEBSERVICE + "/proposta/residencial";
           
           var headers = {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'x-ibm-client-id': APP_CONFIG.SERVICO.CLIENTID,
                    'x-ibm-client-secret': APP_CONFIG.SERVICO.CLIENTSECRET
                }
            }

            return $http.post(url,requestBody,headers);
        }

        
    }]);

})();