// This module is designed for RequireJS()
define(['underscore','./core','./random'],function(_, _ucengine_) {
	
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

    return {
    	// Noting yet
    };
};
