bController.controller('AppController', ['$scope', 'CommonService', '$timeout', 'authFact', function ($scope, CommonService, $timeout, authFact) {
    var self = this;
    $scope.username = authFact.getUser().name;

    self.alldecks_url = config.BASE_URL + config.GET_ALL_DECKS_URL;
    self.deck_url = config.BASE_URL + config.GET_DECK_URL;
    self.update_deck_url = config.BASE_URL + config.GET_DECK_URL;
    self.update_card_url = config.BASE_URL + config.UPDATE_CARD_URL;
    self.tag_url = config.BASE_URL + config.GET_ALL_TAGS_URL;
    self.categories_url = config.BASE_URL + config.GET_ALL_CATEGORIES_URL;

    $scope.AllDecks = [];
    $scope.SelectedDeck = new DeckViewModel();
    $scope.cardIndex = 0;
    $scope.deckPageNo = 0;
    $scope.DECK_STATUS = "Published";


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

    $scope.showNextCard = function () {
        $scope.cardIndex++;
    };

    $scope.showPrevCard = function () {
        $scope.cardIndex--;
    };

    $scope.deckStatus = function (status) {
        $scope.DECK_STATUS = status;
        init();
    }

    var init = function () {
        self.getAllDecks();
    }

    $scope.dataLoaded = false;

    self.getAllDecks = function () {
        $scope.AllDecks = [];
        if (self.alldecks_url != null) {
            CommonService.getResponse(self.replacePlaceHolder(self.alldecks_url, "STATUS", $scope.DECK_STATUS) + $scope.deckPageNo).then(function (data) {
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
    }

    self.getDeck = function (deckId) {
        $scope.SelectedDeck = {};
        $scope.cardIndex = 0;
        if (deckId == null) {
            if ($scope.AllDecks && $scope.AllDecks.length > 0) {
                deckId = $scope.AllDecks[0].deckId;
            }
        }
        if (deckId != null) {
            CommonService.getResponse(self.replacePlaceHolder(self.deck_url, PLACEHOLDER_DECK_ID, deckId)).then(
                function (data) {
                    $scope.SelectedDeck = data.data;
                    console.log(JSON.stringify(data.data));
                    $scope.cardIndex = 0;

                }, function (reason) {
                    alert('Failed: ' + reason);
                });
        }
    }

    $scope.$on("GetPrevSetEvent", function (event) {
        $scope.dataLoaded = false;
        if ($scope.deckPageNo > 0) {
            $scope.deckPageNo--;
            self.getAllDecks();
        }
    });

    $scope.$on("GetNextSetEvent", function (event) {
        $scope.dataLoaded = false;
        $scope.deckPageNo++;
        self.getAllDecks();
    });

    $scope.$on("SelectEvent", function (event, deckId) {
        self.getDeck(deckId);
    });

    self.replacePlaceHolder = function (str, placeholder, value) {
        return str.replace("{" + placeholder + "}", value);
    }

    init();

    $scope.loadTags = function ($query) {
        return CommonService.getCachedResponse(self.tag_url).then(function (response) {
            var tags = response.data;
            return tags.filter(function (tag) {
                return tag.name.toLowerCase().indexOf($query.toLowerCase()) != -1;
            });
        }, function (e) {
            return "Error";
        })
    };

    $scope.loadCategories = function ($query) {

        return CommonService.getCachedResponse(self.categories_url).then(function (response) {
            var categories = response.data;
            return categories.filter(function (category) {
                return category.name.toLowerCase().indexOf($query.toLowerCase()) != -1;
            });
        }, function (e) {
            return "Error";
        })
    };

    $scope.removeCard = function () {
        var cardID = $scope.SelectedDeck.cards[$scope.cardIndex].id;
        //alert("Service to be integrated.. Removed card :" + cardID);
        var index = $scope.cardIndex;
        if (index == $scope.SelectedDeck.cards.length - 1) {
            index = 0;
        }
        $scope.SelectedDeck.cards.splice($scope.cardIndex, 1);
        $scope.cardIndex = index;
    };

    $scope.removeDeck = function () {
        $scope.dataLoaded = false;
        var deckID = $scope.SelectedDeck.deckId;

        CommonService.deleteResponse(self.replacePlaceHolder(self.deck_url, PLACEHOLDER_DECK_ID, deckID)).then(
            function (data) {
                console.log("Deleted deckId:" + deckID);
                $scope.cardIndex = 0;
                $scope.dataLoaded = false;
            }, function (reason) {
                alert('Failed: ' + reason.data.message);
                $scope.dataLoaded = true;
            });
        if (!$scope.dataLoaded) {
            self.getAllDecks();
        }
    };

    $scope.updateDeck = function () {
        var deck = objectToStringArray($scope.SelectedDeck);
        var deckId = deck.deckId;
        console.log(deck);
        // return;
        CommonService.putRequest(self.replacePlaceHolder(self.update_deck_url, PLACEHOLDER_DECK_ID, deckId), deck).then(
            function (data) {
                console.log("updated deckId:" + deckId);
                self.getAllDecks();
            }, function (reason) {
                alert('Failed: ' + reason.data.message);
            });
    };

    $scope.updateCard = function () {
        var card = $scope.SelectedDeck.cards[$scope.cardIndex];
        var cardId = card.id;
        CommonService.putRequest(self.replacePlaceHolder(self.update_card_url, PLACEHOLDER_CARD_ID, cardId), card).then(
            function (data) {
                console.log("updated cardId:" + cardId);
                self.getAllDecks();
            }, function (reason) {
                alert('Failed: ' + reason.data.message);
            });
    };

    objectToStringArray = function (deck) {
        delete deck.categories;
        delete deck.tags;
        delete deck.cards;
        return deck;
    };
}]);