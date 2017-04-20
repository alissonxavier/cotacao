(function () {
    'use strict';

    var $app = angular.module('app');

    $app.factory('$cotacaoService', ['$rootScope','APP_CONFIG','$http', function ($rootScope,APP_CONFIG,$http) {
        
        return {
            realizacaoCotacao: realizacaoCotacao
        };

        function realizacaoCotacao(requestBody) {
            
            var url = APP_CONFIG.SERVICO.WEBSERVICE + "/cotacao/residencial";
           
            var headers = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-ibm-client-id': APP_CONFIG.SERVICO.CLIENTID,
                    'x-ibm-client-secret': APP_CONFIG.SERVICO.CLIENTSECRET
                }
            }

            return $http.post(url,requestBody,headers);
        }

        
    }]);

})();