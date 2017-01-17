bService.service('CommonService', function ($http, $timeout, Base64) {

    var self = this;
    $http.defaults.headers.common["Authorization"] = "Basic " + Base64.encode("rebel.again1@gmail.com:1258824304181317");

    self.getResponse = function (url) {
        return $http.get(url);
    };

    self.getCachedResponse = function (url) {
        return $http.get(url, {cache: true});
    };

    self.deleteResponse = function (url) {
        return $http.delete(url);
    };

});