if ("undefined" === typeof UndercoverEngine || 1 !== UndercoverEngine.version)
{
    throw "UndercoverEngine core not included.";
}

// The card object
var UCP_Card = {

};

UndercoverEngine.card = function(iDeck,iIndexInDeck)
{
    this.deck = iDeck;
    this.index = iIndexInDeck;
};

UndercoverEngine.card.prototype.toString = function()
{
    return "This is a card douch";
}

UndercoverEngine.deck = function(iNbOfCards)
{
}