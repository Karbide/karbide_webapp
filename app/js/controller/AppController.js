bController.controller('AppController', ['$scope', 'authFact', '$rootScope', '$cookieStore',
    function ($scope, authFact, $rootScope, $cookieStore) {
        var self = this;
        $scope.username = authFact.getUser().name;

        // console.log("What is " + what);
        $scope.fbLogout = function () {
            FB.getLoginStatus(function (response) {
                if (response && response.status === 'connected') {
                    FB.logout(function (response) {
                        console.log("Logging Out");
                    });
                } else {
                    console.log("Already Logged Out");
                }
            });
            authFact.logoutOut();
            document.location.reload();
        };

        $scope.setDeckStatus = function (status) {
            $cookieStore.put('deck_status', status);
            $rootScope.$emit("CallParentMethod", {});
        };

        $scope.getDeckStatus = function () {
            var status = $cookieStore.get('deck_status');
            if (status == undefined) {
                return 'Published';
            }
            return status;
        };
    }]);