var DeckViewModel = function () {
    var deck = {};
    deck.categories = [];
    deck.tags=[];
    deck.approver=new ApproverViewModel();
    deck.cards=[];
    deck.apiFeedSource = '';
    deck.publisher = '';
    deck.card = new Card();
    
    var approver = new ApproverViewModel();
    var tags = [];
    var categories = [];
};

var Card = function() {
    var title;
    var content;
    var articleWebUrl;
    var articleSourceLogo;
    var articleSourceName;
       
    var media = {};
    media.mediaType = '';
    media.mediaUrl = '';
    media.mediaCredit = '';
    media.template = '';
    media.weight = '';
};

var ApproverViewModel = function () {
    var liveDays;
    var ranking;
    var liveOnDate;
    var comments;
}