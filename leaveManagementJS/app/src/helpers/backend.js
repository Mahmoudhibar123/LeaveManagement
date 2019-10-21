(function () {
    'use strict';

    angular
        .module('app')
        .run(setupBackend);

    // setup fake backend for backend-less development
    function setupBackend($httpBackend) {
        var testUser = { username: 'test', password: 'test', firstName: 'Test', lastName: 'User' };

        // fake authenticate api end point
        $httpBackend.whenPOST('/api/authenticate').respond(function (method, url, data) {
            // get parameters from post request
            var params = angular.fromJson(data);

            // check user credentials and return jwt token if valid
            if (params.email === testUser.email && params.password === testUser.password) {
                return [200, { token: `Bearer ${this.auth.getToken()}` }, {}];
            } else {
                return [200, {}, {}];
            }
        });

        // pass through any urls not handled above so static files are served correctly
        $httpBackend.whenGET(/^\w+.*/).passThrough();
    }
})();