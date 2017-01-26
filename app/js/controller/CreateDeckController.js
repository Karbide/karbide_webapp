bController.controller('CreateDeckController', ['$scope', 'CommonService', '$timeout',
    function ($scope, CommonService, $timeout) {
        var self = this;

        self.create_deck_url = config.BASE_URL + config.CREATE_DECK_URL;
        $scope.createdDeck = new DeckViewModel();
        $scope.cardIndex = 0;

        $scope.showNextCard = function () {
            $scope.cardIndex++;
        };

        $scope.showPrevCard = function () {
            $scope.cardIndex--;
        };

        $scope.setDefaults = function () {
            $scope.createdDeck.status = 'Draft';
            $scope.createdDeck.authorHandle = '@Admin';
            // $scope.createdDeck.apiFeedSource = '@Admin';
            // $scope.createdDeck.authorHandle = '@Admin';
        };

        $scope.create = function () {
            $scope.setDefaults();
            console.log("Hello: " + JSON.stringify($scope.createdDeck));
        };

        self.createDecks = function () {

            $scope.AllDecks = [];
            CommonService.postRequest(self.create_deck_url, createdDeck).then(function (data) {
                $scope.AllDecks = data.data["content"];
                if (data.data["last"] == true) {
                    $scope.deckPageNo = 0;
                }
                console.log($scope.AllDecks);
                self.getDeck(null);

                $timeout(function () {
                    $scope.dataLoaded = true;
                }, 100);

            }, function (reason) {
                alert('Failed: ' + reason);
            });
        }
    }]);