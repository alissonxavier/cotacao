(function () {
    'use strict';

    var $app = angular.module('app');

    $app.factory('$cotacaoService', ['$rootScope','APP_CONFIG','$http', function ($rootScope,APP_CONFIG,$http) {
        
        return {
            realizacaoCotacao: realizacaoCotacao
        };

        function realizacaoCotacao() {
            console.log(APP_CONFIG.SERVICO.WEBSERVICE);

            var url = '';

            var requestBody = {
                
            }

            return $http.post(url, requestBody);
        }

        
    }]);

})();