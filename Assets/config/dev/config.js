/*jslint
 devel:true, maxerr: 10
 */

/*global
 angular
 */


(function () {

    'use strict';

    /*
     *  App Config
     *  @namespace app.config
     */

    angular
    .module('app.config', [])
    .constant('APP_CONFIG', {
        'SERVICO': {
            'WEBSERVICE': 'https://apidev.caixaseguros.intranet/caixaseguradora-dev/dev',
            'CLIENTID' : '0e001c54-9186-4c99-9c8e-aac448016729',
            'CLIENTSECRET' : 'O0dI3nA3hC6mX4jA3pN8lS6iO1xU4bM2eC5hA8wQ3pB8gC5yB5'
        }
    });

}());
