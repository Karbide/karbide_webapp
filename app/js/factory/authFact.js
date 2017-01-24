app.factory('authFact', ['$cookieStore', function ($cookieStore) {
    var authFact = {};

    authFact.setAccessToken = function (accessToken) {
        $cookieStore.put('accessToken', accessToken);
    };

    authFact.getAccessToken = function () {
        authFact.authToken = $cookieStore.get('accessToken');
        return authFact.authToken;
    };

    authFact.getUser = function () {
        var user = $cookieStore.get('user');

        if (user)
            return user;
        else
            console.log("user not found");
    };

    authFact.logoutOut = function () {
        $cookieStore.remove('user');
        $cookieStore.remove('accessToken');
    };
    return authFact;
}]);
