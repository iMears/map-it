var app = angular.module('myApp', [
    'ngRoute',
    'ngCookies'
])
    .run(function($http, $rootScope, $location, $cookieStore) {

        //We create the object that will hold our globals or
        //recover it from our cookie store
        $rootScope.globals = $cookieStore.get('globals') || {};

        //If the current user is set, we set the auth data for our $http
        //requests
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }

        //When Angular emits $locationchangestart event, we check if the
        //user is logged in
        $rootScope.$on('$locationChangeStart', function(event, next, current) {

            // redirect to login page if not logged in
            if (($location.path() !== '/login' && $location.path() !== '/sign-up') && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
    });