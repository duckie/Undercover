/**
* Game module
*
* Work in progress here
*/
define(['underscore','./core','./card', './hand'],function(_, _ucengine_ , _deck_, _hands_ ) {
    var game_prototype = {
        nextHand: function () {
            
        },

        bet: function (player, amount) {

        },

        check: function (player) {

        },

        fold: function (player) {

        },

        changeVariation: function(variation) {

        }
    };

    function create_game(config) {
        var game = _ucengine_.createObject(game_prototype);
        //game.
    };



    return _ucengine_.createUCObject();
});
