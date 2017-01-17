var bController = angular.module('BluohController', []);
var bService = angular.module('BluohService', []);
var app = angular.module('bluohApp', ['BluohController', 'BluohService', 'ngTagsInput', 'slick', 'ngRoute']);

var config = undefined;

// Bootstrapping   
angular.element(function () {
    $.get("rsc/config/config.json", function (data) {
        config = data;
        angular.bootstrap(document, ['bluohApp']);
    })
        .fail(function () {
            alert("Error loading configuration");
        })
});

window.fbAsyncInit = function () {
    FB.init({
        appId: '881705435187335',
        xfbml: true,
        version: 'v2.7',
        cookie: true,
        status: true,
    });
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

/*
 function statusChangeCallback(response) {
 console.log('statusChangeCallback');
 console.log(response);
 if (response.status === 'connected') {
 testAPI();
 } else if (response.status === 'not_authorized') {
 console.log('Please log into this app.');
 } else {
 console.log('Please log into Facebook.');
 }
 }
 */

var PLACEHOLDER_DECK_ID = "DECK_ID";
// var PLACEHOLDER_CARD_ID =  "CARD_ID" ;
var CAROUSEL_PAGE_SIZE = 5;