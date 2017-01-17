bController.controller('CarouselController', ['$scope', function ($scope) {

    
    $scope.previousItems=function() {
        $scope.$emit('GetPrevSetEvent'); 
    }

    $scope.nextItems=function() {
        $scope.$emit('GetNextSetEvent'); 
    }

    $scope.onSelectEvent = function(deckId) {
       $scope.$emit('SelectEvent', deckId); 
    }

   $scope.getMediaUrl = function(item) {
        return item.cards[0].media.url;
    }
    
}]);