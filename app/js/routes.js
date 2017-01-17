app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when("/",
        {
            templateUrl: 'login.html',
            controller: 'LoginController'
        }).when("/home",
        {
            templateUrl: 'card.html',
            controller: 'AppController',
            authenticated: true
        }).otherwise("/",
        {
            templateUrl: 'index.html',
            controller: 'LoginController'
        });
}]);


app.run(["$rootScope", "$location", "authFact", function ($rootScope, $location, authFact) {
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        if (next.$$route != undefined && next.$$route.authenticated) {
            var userAuth = authFact.getAccessToken();
            if (!userAuth) {
                $location.path('/');
            }
        }
    });
}])