(function () {
    'use strict';
/**
 * @ngdoc overview
 * @name fakeLunchHubApp
 * @description
 * # fakeLunchHubApp
 *
 * Main module of the application.
 */
    angular
        .module('app', 
        [
            'ngRoute', 
            'ngCookies', 
            'ngAnimate',
            'ngCookies',
            'ngResource',
            'ngRoute',
            'ngSanitize',
            'ngTouch',
            'ng-token-auth'
        ]).config(function($authProvider) {
            $authProvider.configure({
              apiUrl:                  '/api',
              tokenValidationPath:     '/auth/validate_token',
              signOutUrl:              '/auth/sign_out',
              emailRegistrationPath:   '/auth',
              accountUpdatePath:       '/auth',
              accountDeletePath:       '/auth',
              confirmationSuccessUrl:  window.location.href,
              passwordResetPath:       '/auth/password',
              passwordUpdatePath:      '/auth/password',
              passwordResetSuccessUrl: window.location.href,
              emailSignInPath:         '/auth/sign_in',
              storage:                 'cookies',
              forceValidateToken:      false,
              validateOnPageLoad:      true,
              proxyIf:                 function() { return false; },
              proxyUrl:                '/proxy',
              omniauthWindowType:      'sameWindow',
              authProviderPaths: {
                github:   '/auth/github',
                facebook: '/auth/facebook',
                google:   '/auth/google'
              },
              tokenFormat: {
                "access-token": "{{ token }}",
                "token-type":   "Bearer",
                "client":       "{{ clientId }}",
                "expiry":       "{{ expiry }}",
                "uid":          "{{ uid }}"
              },
              cookieOps: {
                path: "/",
                expires: 9999,
                expirationUnit: 'days',
                secure: false,
                domain: 'domain.com'
              },
              createPopup: function(url) {
                return window.open(url, '_blank', 'closebuttoncaption=Cancel');
              },
              parseExpiry: function(headers) {
                // convert from UTC ruby (seconds) to UTC js (milliseconds)
                return (parseInt(headers['expiry']) * 1000) || null;
              },
              handleLoginResponse: function(response) {
                return response.data;
              },
              handleAccountUpdateResponse: function(response) {
                return response.data;
              },
              handleTokenValidationResponse: function(response) {
                return response.data;
              }
            });
          });
        //.config(config)
        // .config(function($authProvider) {
        //     $authProvider.configure({
        //         apiUrl: 'http://api.example.com'
        //     });
        // });
        .run(run);

    // config.$inject = ['$routeProvider', '$locationProvider'];
    //routes
    // function config($routeProvider) {
    //     $routeProvider
    //         .when('/', {
    //             controller: 'HomeController',
    //             templateUrl: 'home/home.html',
    //             controllerAs: 'vm'
    //         })

    //         .when('/login', {
    //             controller: 'LoginController',
    //             templateUrl: 'login/login.html',
    //             controllerAs: 'vm'
    //         })

    //         .when('/register', {
    //             controller: 'RegisterController',
    //             templateUrl: 'register/register.html',
    //             controllerAs: 'vm'
    //         })

    //         .otherwise({ redirectTo: '/login' });
    // }

    run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
    function run($rootScope, $location, $cookies, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }

})();