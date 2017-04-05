(function () {
    'use strict';

    var $app = angular.module('app');

    $app.factory('$cepService', ['$rootScope','APP_CONFIG','$http', function ($rootScope,APP_CONFIG,$http) {
        
        return {
            consultaCEP: consultaCEP
        };

        function consultaCEP(cep) {
            console.log(cep);
            console.log(APP_CONFIG.SERVICO.WEBSERVICE);

            var url = APP_CONFIG.SERVICO.WEBSERVICE + '/Corporativo.svc/Servico_ConsultaCep';

            var requestBody = {
                numCep : cep
            }

            return $http.post(url, requestBody);
        }

        
    }]);

})();