(function () {
    'use strict';

    var $app = angular.module('app');

    $app.filter('realCurrency', function () {
        return function (valor) {
            if (isNaN(valor)) {
                debugger;
                return 0;

            } else {

                var tmp = valor + '';

                tmp = tmp.replace(/([0-9]{2})$/g, ",$1");

                if (tmp.length > 6) {
                    tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
                };

                return tmp;

            };
        };
    });

})();