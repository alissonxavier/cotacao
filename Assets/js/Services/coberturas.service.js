(function () {
    'use strict';

    var $app = angular.module('app');

    $app.factory('$coberturasService', ['$rootScope','APP_CONFIG','$http', function ($rootScope,APP_CONFIG,$http) {
        
        return {
            getCoberturas: getCoberturas
        };

        function getCoberturas() {
            
            var url = APP_CONFIG.SERVICO.WEBSERVICE + "/produto/1/canal/1";

            var headers = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-ibm-client-id': APP_CONFIG.SERVICO.CLIENTID,
                    'x-ibm-client-secret': APP_CONFIG.SERVICO.CLIENTSECRET
                }
            }

            return $http.get(url,headers);
        }

        
    }]);

})();