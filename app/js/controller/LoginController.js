app.controller('LoginController', ['$window', '$scope', '$location', 'authFact', '$cookieStore', function ($window, $scope, $location, authFact, $cookieStore) {

    $scope.fbLogin = function () {
        FB.login(function (response) {
            if (response.authResponse) {
                console.log('Welcome!  Fetching your information.... ');
                FB.api('/me', function (response) {
                    console.log('Successful login for: ' + response.name);
                    console.log(response);
                    $cookieStore.put('user', response);
                    var accessToken = FB.getAuthResponse().accessToken;
                    console.log(accessToken);
                    authFact.setAccessToken(accessToken);

                    window.location.href = '#!/home';
                    console.log("Home Location called");
                    $scope.$apply();
                });
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        });
    };

    // function statusChangeCallback(response) {
    //     console.log('statusChangeCallback');
    //     console.log(response);
    //     if (response.status === 'connected') {
    //         testAPI();
    //     } else if (response.status === 'not_authorized') {
    //         console.log('Please log into this app.');
    //     } else {
    //         console.log('Please log into Facebook.');
    //     }
    // }
}]);