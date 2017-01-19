app.controller('LoginController', ['$window','$scope', '$location', 'authFact', function ($window, $scope, $location, authFact) {
    $scope.name = 'Login Please';
    $scope.fbLogin = function () {
        FB.login(function (response) {
            console.log(response);
            if (response.authResponse) {
                console.log('Welcome!  Fetching your information.... ');
                FB.api('/me', function (response) {
                    console.log('Successful login for: ' + response.name);
                    console.log(response);

                    var accessToken = FB.getAuthResponse().accessToken;
                    console.log(accessToken);
                    authFact.setAccessToken(accessToken);

                    // $location.path("/home");
                    window.location.href = '#!/home';
                    console.log("Home Location called");
                    // $location.path('/i');
                    $scope.$apply();
                });
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        });
    }
}]);