bController.controller('PhoneController', ['$scope', function ($scope) {
    $scope.isDialogVisible = false;

    $scope.editObj = {};


    $scope.constants = {
        "MEDIA_URL": "Picture Link",
        "MEDIA_CREDITS": "Credits",
        "TITLE": "Title",
        "DESCRIPTION": "Descrition",
        "SOURCE_URL": "Source Link",
        "SOURCE_URL_TEXT": "Source Link Text",
        "50_50": "half",
        "70_30": "seven-3",
        "Full": "full"
    };


    $scope.dialogTitle = "Default title";

    $scope.update = function (str, value) {
        $scope.isDialogVisible = true;
        $scope.dialogTitle = str;
        $scope.editObj[str] = value;
    };

    $scope.updateVal = function(str, obj){
        $scope.SelectedDeck.cards[$scope.cardIndex][obj] = $scope.editObj[str];
        $scope.closeDialog();
    };
    $scope.closeDialog = function () {
        $scope.isDialogVisible = false;
    };

    $scope.getTemplateClass = function (string) {
        if (string == undefined) {
            return "full";
        }
        return $scope.constants[string];
    }
}]);