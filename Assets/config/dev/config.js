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
            'CLIENTID' : 'ee63033d-6c89-4c6c-8c27-ecab1a869ebf',
            'CLIENTSECRET' : 'W6rJ0cO3xQ8gC5jN5nV2lP1kT6jO4dE6yF5cS0wV7uL4yM8gL1'
        }
    });

}());
