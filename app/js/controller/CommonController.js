bController.controller('AppController', ['$scope', 'CommonService', '$timeout',function ($scope, CommonService, $timeout) {
    var self = this;

    self.alldecks_url = config.BASE_URL + config.GET_ALL_DECKS_URL;
    self.deck_url = config.BASE_URL + config.GET_DECK_URL;
    self.tag_url = config.BASE_URL + config.GET_ALL_TAGS_URL;
    self.categories_url = config.BASE_URL + config.GET_ALL_CATEGORIES_URL;

    $scope.AllDecks = [];
    $scope.SelectedDeck = new DeckViewModel();
    $scope.cardIndex = 0;
    $scope.deckPageNo = 0;


    $scope.showNextCard = function () {
        $scope.cardIndex++;
    };

    $scope.showPrevCard = function () {
        $scope.cardIndex--;
    };

    var init = function () {
        self.getAllDecks();
    }
	
	$scope.dataLoaded = false;
    self.getAllDecks = function () {
		$scope.AllDecks = [];
        if (self.alldecks_url != null) {
            CommonService.getResponse(self.alldecks_url + $scope.deckPageNo).then(function (data) {
                $scope.AllDecks = data.data["content"];
                if (data.data["last"] == true) {
                    $scope.deckPageNo = 0;
                }
                console.log($scope.AllDecks);
                self.getDeck(null);
                
                $timeout(function(){
        			$scope.dataLoaded = true;
      			},100);
                
            }, function (reason) {
                alert('Failed: ' + reason);
            });
        }
    }

    self.getDeck = function(deckId) {
        $scope.SelectedDeck = {};
         $scope.cardIndex = 0;
        if (deckId == null) {
            if ($scope.AllDecks && $scope.AllDecks.length > 0) {
                deckId = $scope.AllDecks[0].deckId;
            }
        }
        if (deckId != null) {
            CommonService.getResponse(self.replacePlaceHolder(this.deck_url, PLACEHOLDER_DECK_ID, deckId)).then(
                function (data) {
                    $scope.SelectedDeck = data.data;
                    console.log(JSON.stringify(data.data));
                    $scope.cardIndex = 0;
                    
                }, function (reason) {
                    alert('Failed: ' + reason);
                });
        }
    }

    $scope.$on("GetPrevSetEvent",function(event) {
        $scope.dataLoaded = false;
        if ($scope.deckPageNo > 0) {
            $scope.deckPageNo--;
            self.getAllDecks();
        }
    });
     
     $scope.$on("GetNextSetEvent",function(event) {
         $scope.dataLoaded = false;
         $scope.deckPageNo++;
         self.getAllDecks();
    });
     
     $scope.$on("SelectEvent",function(event,deckId) {
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
                alert('Failed: ' + reason);
            });
        if (!$scope.dataLoaded) {
            self.getAllDecks();
        }
    };
}]);