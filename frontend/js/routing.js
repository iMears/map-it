var routing = angular.module('myApp.routing', []);

routing.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider

            // The login route
        .when('/login', {
                templateUrl: 'partials/login.html',
                controller: 'LoginCtrl'
        })

            // The Sign up route
        .when('/sign-up', {
                templateUrl: 'partials/sign-up.html',
                controller: 'SignUpCtrl'
        })

            // When we are logged in
        .when('/panel', {
            templateUrl: 'partials/panel.html',
            controller: 'PanelCtrl'
        })

           // Otherwise redirect to the login view
        .otherwise({
            redirectTo: '/login'
        });
    }
]);