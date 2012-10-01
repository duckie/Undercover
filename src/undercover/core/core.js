// This module is designed for RequireJS()
define(['underscore'],function(_){

    /**
    * Creates a  new object
    * 
    * There is different methods to implement differential inhderitance in
    * javascript so I use this method to let me test different ways to do it.
    * This could also be ued to optimize depending on the running platform.
    */
    var create_object = function(proto)
    {
        var that = Object.create(proto);
        //that.prototype = proto;
        return that;
    };

    var create_game = function() {
        return {};
    };

    /**
    * Card factory
    *
    * create_card creates a object which represents a given card with
    * a property for the color, the value and the classic two characters
    * string representation (ex: "Ah" for the heart ace).
    * This is to be used internally
    */
    var create_card = function(iValue, iColor, iStrRep)
    {
        const m_value = iValue;
        const m_color = iColor;
        const m_str = iStrRep;

        return {
            value: function()
            {
                return m_value;
            },

            color: function()
            {
                return m_color;
            },

            toString: function()
            {
                return m_str;
            }
        };
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
            
        }
    };

    /**
    * Handset interface
    * 
    * A handset is the combination of the hole cards of
    * a player and the cards on the board. This is the enity
    * used to compute which poker hands the player get, depending
    * on the played variation.
    */
    var hand_set_prototype = { 
        toString:function () {
            var that = this;
            var str_out = "On board: ";
            _.each(that.board, function(){
                str
            });
        }
    };

    /**
    * Creates a full handset
    * 
    * 
    */
    var create_hand_set = function(main_arg)
    {
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

        hand_set_object = create_object(hand_set_prototype);
        hand_set_object.hole_cards = hole_cards;
        hand_set_object.hole_pick = nb_hole_picked;
        hand_set_object.board = common_cards;
        hand_set_object.board_pick = nb_common_picked;
    };

    var basic_deck = (function(){
        var deck = [];

        // Hearts
        deck.push(create_card(2, 0, '2h'));
        deck.push(create_card(3, 0, '3h'));
        deck.push(create_card(4, 0, '4h'));
        deck.push(create_card(5, 0, '5h'));
        deck.push(create_card(6, 0, '6h'));
        deck.push(create_card(7, 0, '7h'));
        deck.push(create_card(8, 0, '8h'));
        deck.push(create_card(9, 0, '9h'));
        deck.push(create_card(10, 0, 'Th'));
        deck.push(create_card(11, 0, 'Jh'));
        deck.push(create_card(12, 0, 'Qh'));
        deck.push(create_card(13, 0, 'Kh'));
        deck.push(create_card(14, 0, 'Ah'));

        // Clubs
        deck.push(create_card(2, 1, '2c'));
        deck.push(create_card(3, 1, '3c'));
        deck.push(create_card(4, 1, '4c'));
        deck.push(create_card(5, 1, '5c'));
        deck.push(create_card(6, 1, '6c'));
        deck.push(create_card(7, 1, '7c'));
        deck.push(create_card(8, 1, '8c'));
        deck.push(create_card(9, 1, '9c'));
        deck.push(create_card(10, 1, 'Tc'));
        deck.push(create_card(11, 1, 'Jc'));
        deck.push(create_card(12, 1, 'Qc'));
        deck.push(create_card(13, 1, 'Kc'));
        deck.push(create_card(14, 1, 'Ac'));

        // Diamonds
        deck.push(create_card(2, 2, '2d'));
        deck.push(create_card(3, 2, '3d'));
        deck.push(create_card(4, 2, '4d'));
        deck.push(create_card(5, 2, '5d'));
        deck.push(create_card(6, 2, '6d'));
        deck.push(create_card(7, 2, '7d'));
        deck.push(create_card(8, 2, '8d'));
        deck.push(create_card(9, 2, '9d'));
        deck.push(create_card(10, 2, 'Td'));
        deck.push(create_card(11, 2, 'Jd'));
        deck.push(create_card(12, 2, 'Qd'));
        deck.push(create_card(13, 2, 'Kd'));
        deck.push(create_card(14, 2, 'Ad'));

        // Spades
        deck.push(create_card(2, 3, '2s'));
        deck.push(create_card(3, 3, '3s'));
        deck.push(create_card(4, 3, '4s'));
        deck.push(create_card(5, 3, '5s'));
        deck.push(create_card(6, 3, '6s'));
        deck.push(create_card(7, 3, '7s'));
        deck.push(create_card(8, 3, '8s'));
        deck.push(create_card(9, 3, '9s'));
        deck.push(create_card(10, 3, 'Ts'));
        deck.push(create_card(11, 3, 'Js'));
        deck.push(create_card(12, 3, 'Qs'));
        deck.push(create_card(13, 3, 'Ks'));
        deck.push(create_card(14, 3, 'As'));

        return deck;
    })();

    var deck_prototype = {
        //cards:[],

        draw:function() {
            if(0 < this.cards.length) {
                return this.cards.pop();
            }
            else {
                return null;
            }
        }
    };

    var create_deck = (function() {
        return function() {
            var permutation = [];
            var index = 0;
            var result_deck = [];
            var deck_object = null;

            for(index = 0; index < 52; index++) {
                permutation[index] = [index,1-Math.random()];
            }

            permutation.sort(function(elem1, elem2){
                if( (elem1[1] - elem2[1]) === 0) {
                    return 0;
                }
                else {
                    if( (elem1[1] - elem2[1]) < 0) {
                        return -1;
                    }
                    else {
                        return 1;
                    }
                }
            });
            
            for(index = 0; index < 52; index++) {
                result_deck[result_deck.length] = basic_deck[permutation[index][0]];
            }

            deck_object = create_object(deck_prototype);
            deck_object.cards = result_deck;

            return deck_object;
        };
    })();

    var uc_engine = {};
    uc_engine.new_shuffled_deck = create_deck;

    
    // Declaring the public interface into the global scope
    return uc_engine;
});
