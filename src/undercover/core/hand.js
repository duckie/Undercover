// This module is designed for RequireJS()
define(['underscore','./core','./card'],function(_, _ucengine_ , _deckmod_ ) {

    /**
    * Hand types enum
    *
    * Working with enum of objects is good in javascript
    */
    const hand_types = {
        straightflush: {value:7},
        full: {value:6},
        flush: {value:5},
        straight: {value:4},
        trips: {value:3},
        twopairs: {value:2},
        pair: {value:1},
        highcard: {value:0}
    };

    /**
    * Hand interface
    *
    * A hand is a set of 5 cards. This object helps you
    * to create the set in an easy way and computes the
    * value of the hand.
    */
    var hand_prototype = {
        compute_value:function(){

        },

        toString:function() {
            return this.cards.join('');
        }
    };

    function create_hand(iArg)
    {
        var cards = null;
        var exception = null;
        var index = 0;
        var current_card = 0;
        var hand_object = null;
        var cardId = null;
        var elements_are_cards = false;

        if(_.isString(iArg))
        {
            if(10 !== iArg.length) {
                throw {
                    name:'parse error',
                    message:'The string ' + iArg + ' is ill-formed for hand construction, it must be 10 characters long.'
                };
            }

            cards = [];
            for(index = 0; index < 5; ++index)
            {
                cardId = iArg.slice( 2*index , 2*(index+1) );
                current_card = _deckmod_.getCardFromStr(cardId);
                if(current_card === null) {
                    throw {
                        name:'parse error',
                        message:'The string ' + iArg + ' is ill-formed for hand construction, the hand "' + cardId + '" does not exist.'
                    };
                }
                cards.push(current_card);
            }
        }

        if(_.isArray(iArg)) {
            if(5 !== iArg.length) {
                throw {
                    name:'argument error',
                    message:'The array for hand construction must have exactly 5 elements.'
                };
            }

            // Checking that everybody is a card
            elements_are_cards = _.reduce(iArg, function(current_state, elem) { return (current_state && _deckmod_.isCard(elem)); }, true);
            if(true !== elements_are_cards)
            {
                throw {
                    name:'argument error',
                    message:'The array must only contains "card" objects.'
                };
            }

            cards = iArg;
        }

        // Sort the cards by compute_value
        cards.sort(function(card1, card2){
            return (card1.value() === card2.value()) ? 0 : ((card1.value() < card2.value()) ? 1 : -1);
        });

        cards = _.uniq(cards, true);
        
        if(5 !== cards.length) {
            throw {
                name:'argument error',
                message:'A hand must not contain duplicates.'
            };
        }

        hand_object = _ucengine_.createProtectedObject(hand_prototype, {cards: cards});

        return hand_object;
    };

    /**
    * Handset interface
    * 
    * A handset is the combination of the hole cards of
    * a player and the cards on the board. This is the entity
    * used to compute which poker hands the player get, depending
    * on the played variation.
    */
    var hand_set_prototype = { 
       toString:function () {
            var that = this;
            var str_out = "On board: ";
        }
    };

    /**
    * Creates a full handset
    * 
    * 
    */
    var create_hand_set = function(main_arg) {
       // The default is the texas holdem config
        var hole_cards = [];
        var nb_hole_picked = 2;
        var common_cards = [];
        var nb_common_picked = 5;
        var hand_set_object = null;

        if(_.isString(main_arg))
        {
            // Parses the string to transform
        }
        
        if(_.isObject(main_arg))
        {
            hole_cards = main_arg.hole_cards || [];
            nb_hole_picked = main_arg.nb_hole_cards_to_pick || 2;
            common_cards = main_arg.common_cards || [];
            nb_common_picked = main_arg.nb_board_cards_to_pick || 5;
        }

        hand_set_object = _ucengine_.createObject(hand_set_prototype);
        hand_set_object.hole_cards = hole_cards;
        hand_set_object.hole_pick = nb_hole_picked;
        hand_set_object.board = common_cards;
        hand_set_object.board_pick = nb_common_picked;
    };

    return _ucengine_.createUCObject({
        createHand: create_hand
    });
});
