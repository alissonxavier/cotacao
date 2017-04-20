(function () {
    'use strict';

    var $app = angular.module('app');

    $app.controller('mainCtrl', ['$scope', '$location', 'storageService', 'parallaxHelper','$coberturasService','lodash','toastr', function ($scope, $location, storageService, parallaxHelper,$coberturasService,lodash,toastr) {
        
        if (storageService.restore('rdStorageStep1') || storageService.restore('rdStorageStep2') || storageService.restore('rdStorageStep3')) {
            storageService.remove();
        };

        $scope.escolherPlano = function(param){
            
            if(storageService.restore('oferta')){
                 storageService.remove();
            }

            $scope.filteredData = lodash.filter($scope.ofertas, function(o) { return o.sequencialOferta == param; });
                
            storageService.save('oferta',$scope.filteredData);
        }

        /** Buscando as coberturas */
        $coberturasService.getCoberturas().
        then(function (result){
                $scope.ofertas = result.data.ofertas;
            },
            function (error) {
               toastr.error('Ocorreu um erro ao buscar as informações das coberturas e assistências', 'Error');
            }
        );

        $scope.go = function (param) {
            $location.path(param);
        }

    }]);

})();