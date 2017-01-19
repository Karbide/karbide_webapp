app.config(['$routeProvider','$locationProvider', function ($routeProvider,$locationProvider) {

    $routeProvider.when("/",
        {
            templateUrl: 'login.html',
            controller: 'LoginController',
        }).when("/home",
        {
            templateUrl: 'card.html',
            // authenticated: true
        }).otherwise("/i",
        {
            templateUrl: 'index.html',
            controller: 'LoginController',
        });
}]);

app.run(["$rootScope", "$location", "authFact", function ($rootScope, $location, authFact) {
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        console.log("Redirection Starts " + $location.path());
        if (next.$$route != undefined && next.$$route.authenticated) {
            var userAuth = authFact.getAccessToken();
            if (!userAuth) {
                console.log("Redirecting to Login Page")
                $location.path('/');
            }
        }
    });
}])
