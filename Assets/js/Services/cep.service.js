(function () {
    'use strict';

    var $app = angular.module('app');

    $app.factory('$cepService', ['$rootScope','APP_CONFIG','$http', function ($rootScope,APP_CONFIG,$http) {
        
        return {
            consultaCEP: consultaCEP
        };

        function consultaCEP(cep) {
            
            var url = APP_CONFIG.SERVICO.WEBSERVICE + '/api-consultarcep/consultaCEP';

            var requestBody = {
                cep : cep,
                codSistema : 'NS'
            }

            var headers = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-ibm-client-id': APP_CONFIG.SERVICO.CLIENTID,
                    'x-ibm-client-secret': APP_CONFIG.SERVICO.CLIENTSECRET
                }
            }

            return $http.post(url, requestBody,headers);
        }

        
    }]);

})();