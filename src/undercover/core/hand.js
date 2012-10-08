// This module is designed for RequireJS()
define(['underscore','./core','./card'],function(_, _ucengine_ , _deckmod_ ) {

    /**
    * Hand types enum
    *
    * Working with enum of objects is good in javascript
    */
    const hand_types = _ucengine_.createUCObject({
        straightflush: {value:8},
        square: {value:7},
        full: {value:6},
        flush: {value:5},
        straight: {value:4},
        trips: {value:3},
        twopairs: {value:2},
        pair: {value:1},
        highcard: {value:0}
    });


    /**
    * Takes any string like "AhKs9h..." and returns the matching array of cards
    *
    * 
    */
    function parse_hands(hands_str)
    {
        var cards = [];
        var index=0;
        var size = Math.floor(hands_str.length / 2);
        for(index = 0; index < size; ++index)
        {
            cardId = hands_str.slice( 2*index , 2*(index+1) );
            current_card = _deckmod_.getCardFromStr(cardId);
            if(current_card === null) {
                throw {
                    name:'parse error',
                    message:'The string ' + hands_str + ' is ill-formed for hand construction, the card "' + cardId + '" does not exist.'
                };
            }
            cards.push(current_card);
        }

        return cards;
    }

    /**
    * Hand interface
    *
    * A hand is a set of 5 cards. This object helps you
    * to create the set in an easy way and computes the
    * value of the hand.
    */
    var hand_prototype = _ucengine_.createUCObject({
        /**
        * Computes the nature of the hand and all the needed charasteristics to compare the hand with another one
        *
        * The property _handNature will be generated containing what the hand is
        * The property _compareValues is to be used internally to compare different hands
        */
        compute_value:function(){
            var flat_values = _.pluck(this.cards,'_value');
            var occurences = {};
            var hand_occurence_pattern = null;

            // Is color
            var first_card_color = this.cards[0]._color;
            var is_flush = _.all(this.cards, function(card) { return first_card_color === card._color; });

            // Is a straight
            var top_value = this.cards[0]._value + 1;
            var is_straight = _.reduce(this.cards, function(ok, card){
                ok = ok && (1 === (top_value - card._value));
                top_value = card._value;
                return ok;
            }, true);

            if(is_flush || is_straight) {
                this._compareValues = flat_values;
                if(is_flush && is_straight) {
                    this._handNature = hand_types.straightflush;
                }
                else if(is_flush) {
                    this._handNature = hand_types.flush;   
                }
                else {
                    this._handNature = hand_types.straight;
                }
            }
            else {
                // Counting occurences of each value
                _.each(this.cards, function(card) {
                    var value = card._value;
                    //occurences[value] = occurences[value] ? 1 : occurences[value] + 1;
                    if(_.has(occurences,value)) {
                        ++(occurences[value].count);
                    }
                    else {
                        occurences[value] = {val:value, count:1};
                    }
                });

                // Get rid of the keys and sorts
                occurences = _.values(occurences);
                occurences.sort(function(elem1,elem2){ 
                    var on_count = -_ucengine_.compareInt(elem1.count, elem2.count);
                    return (0 === on_count) ? -_ucengine_.compareInt(elem1.val, elem2.val) : on_count;
                });

                this._compareValues = _.pluck(occurences,'val');

                hand_occurence_pattern = _.pluck(occurences,'count');
                if(_.isEqual([4,1], hand_occurence_pattern)) {
                    this._handNature = hand_types.square;
                }
                else if(_.isEqual([3,2], hand_occurence_pattern)) {
                    this._handNature = hand_types.full;
                }
                else if(_.isEqual([3,1,1], hand_occurence_pattern)) {
                    this._handNature = hand_types.trips;
                }
                else if(_.isEqual([2,2,1], hand_occurence_pattern)) {
                    this._handNature = hand_types.twopairs;
                }
                else if(_.isEqual([2,1,1,1], hand_occurence_pattern)) {
                    this._handNature = hand_types.pair;
                }
                else {
                    this._handNature = hand_types.highcard;
                }
            }

            //  For any hand
            this._compareValues.unshift(this._handNature.value);
        },

        compare: function(hand){
            var result = 0;
            var index = 0;

            if(_.isUndefined(this._compareValues)) {
                this.compute_value();
            }
            if(_.isUndefined(hand._compareValues)) {
                hand.compute_value();
            }

            while(0 === result && index < this._compareValues.length) {
                result = _ucengine_.compareInt(this._compareValues[index], hand._compareValues[index]);
                ++index;
            }

            return result;
        },

        toString:function() {
            return this.cards.join('');
        }
    });

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

            cards = parse_hands(iArg);
        }

        if(_.isArray(iArg)) {
            if(5 !== iArg.length) {
                throw {
                    name:'argument error',
                    message:'The array for hand construction must have exactly 5 elements.'
                };
            }

            // Checking that everybody is a card
            elements_are_cards = _.all(iArg, _deckmod_.isCard);
            if(true !== elements_are_cards)
            {
                throw {
                    name:'argument error',
                    message:'The array must only contains "card" objects.'
                };
            }

            cards = iArg;
        }

        cards.sort(function(card1, card2){
            return -(card1.compare(card2));
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
    var hand_set_prototype = _ucengine_.createUCObject({
       toString:function () {
            return "On board: " + this.board.join('') + ', in the hand: ' + this.hole_cards.join('');
        },

        /**
        * Finds the best hand and the worst
        */
        computeHighLo: function() {
            var nb_hole_to_pick = 0;
            for(nb_hole_to_pick = this.nb_hole_picked_min; nb_hole_to_pick <= this.nb_hole_picked_max; ++nb_hole_to_pick)
            {

            }
        }

    });

    /**
    * Creates a full handset
    * 
    * 
    */
    function create_hand_set(main_arg) {
       // The default is the texas holdem config
        var hole_cards = [];
        var nb_hole_picked_min = 2;
        var nb_hole_picked_max = 2;
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
            nb_hole_picked_min = main_arg.nb_hole_cards_to_pick_min || 2;
            nb_hole_picked_max =  main_arg.nb_hole_cards_to_pick_max || 2;
            common_cards = main_arg.common_cards || [];
            nb_common_picked = main_arg.nb_board_cards_to_pick || 5;

            if(_.isString(hole_cards)) {
                hole_cards = parse_hands(hole_cards);
            }

            if(_.isString(common_cards)) {
                common_cards = parse_hands(common_cards);
            }
        }

        hand_set_object = _ucengine_.createProtectedObject(hand_set_prototype, {
            hole_cards: hole_cards,
            hole_pick_min: nb_hole_picked_min,
            hole_pick_max: nb_hole_picked_max,
            board: common_cards,
            board_pick: nb_common_picked
        });

    };

    return _ucengine_.createUCObject({
        _handTypes: hand_types,
        createHand: create_hand
    });
});
