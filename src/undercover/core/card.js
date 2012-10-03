// This module is designed for RequireJS()
define(['underscore','./core','./random'],function(_, _ucengine_, _random_) {

    var dictionary = {};
    var card_prototype = null;
    var basic_deck = null;
    var deck_prototype = null;

    const card_color = _ucengine_.createUCObject({
        heart:0,
        club:1,
        diamond:2,
        spade:3
    });

    /**
    * The card prototype
    *
    * It does have any method but can let us check if we manipulate
    * card objects having the same prototype.
    */
    card_prototype = _ucengine_.createUCObject({
        compare: function(card){
            return (this.value() === card.value()) ? 0 : ((this.value() < card.value()) ? -1 : 1);
        }
    });

    /**
    * Card factory
    *
    * create_card creates a object which represents a given card with
    * a property for the color, the value and the classic two characters
    * string representation (ex: "Ah" for the heart ace).
    * This is to be used internally
    */
    function create_card(iValue, iColor, iStrRep)
    {
        const m_value = iValue;
        const m_color = iColor;
        const m_str = iStrRep;

        var card = _ucengine_.createProtectedObject(card_prototype, {
           value: function() { return m_value; },
           color: function() { return m_color; },
           toString: function() { return m_str; },
        });

        dictionary[iStrRep] = card;

        return card;
    };

    function is_a_card(iObj)
    {
        return card_prototype.isPrototypeOf(iObj);
    }

    var get_in_dictionary = function(iStringRep)
    {
        if(_.isString(iStringRep) && _.has(dictionary,iStringRep)) {
            return dictionary[iStringRep];
        }
        return null;
    }

    basic_deck = (function(){
        var deck = [];

        // Hearts
        deck.push(create_card(2, card_color.heart, '2h'));
        deck.push(create_card(3, card_color.heart, '3h'));
        deck.push(create_card(4, card_color.heart, '4h'));
        deck.push(create_card(5, card_color.heart, '5h'));
        deck.push(create_card(6, card_color.heart, '6h'));
        deck.push(create_card(7, card_color.heart, '7h'));
        deck.push(create_card(8, card_color.heart, '8h'));
        deck.push(create_card(9, card_color.heart, '9h'));
        deck.push(create_card(10, card_color.heart, 'Th'));
        deck.push(create_card(11, card_color.heart, 'Jh'));
        deck.push(create_card(12, card_color.heart, 'Qh'));
        deck.push(create_card(13, card_color.heart, 'Kh'));
        deck.push(create_card(14, card_color.heart, 'Ah'));

        // Clubs
        deck.push(create_card(2, card_color.club, '2c'));
        deck.push(create_card(3, card_color.club, '3c'));
        deck.push(create_card(4, card_color.club, '4c'));
        deck.push(create_card(5, card_color.club, '5c'));
        deck.push(create_card(6, card_color.club, '6c'));
        deck.push(create_card(7, card_color.club, '7c'));
        deck.push(create_card(8, card_color.club, '8c'));
        deck.push(create_card(9, card_color.club, '9c'));
        deck.push(create_card(10, card_color.club, 'Tc'));
        deck.push(create_card(11, card_color.club, 'Jc'));
        deck.push(create_card(12, card_color.club, 'Qc'));
        deck.push(create_card(13, card_color.club, 'Kc'));
        deck.push(create_card(14, card_color.club, 'Ac'));

        // Diamonds
        deck.push(create_card(2, card_color.diamond, '2d'));
        deck.push(create_card(3, card_color.diamond, '3d'));
        deck.push(create_card(4, card_color.diamond, '4d'));
        deck.push(create_card(5, card_color.diamond, '5d'));
        deck.push(create_card(6, card_color.diamond, '6d'));
        deck.push(create_card(7, card_color.diamond, '7d'));
        deck.push(create_card(8, card_color.diamond, '8d'));
        deck.push(create_card(9, card_color.diamond, '9d'));
        deck.push(create_card(10, card_color.diamond, 'Td'));
        deck.push(create_card(11, card_color.diamond, 'Jd'));
        deck.push(create_card(12, card_color.diamond, 'Qd'));
        deck.push(create_card(13, card_color.diamond, 'Kd'));
        deck.push(create_card(14, card_color.diamond, 'Ad'));

        // Spades
        deck.push(create_card(2, card_color.spade, '2s'));
        deck.push(create_card(3, card_color.spade, '3s'));
        deck.push(create_card(4, card_color.spade, '4s'));
        deck.push(create_card(5, card_color.spade, '5s'));
        deck.push(create_card(6, card_color.spade, '6s'));
        deck.push(create_card(7, card_color.spade, '7s'));
        deck.push(create_card(8, card_color.spade, '8s'));
        deck.push(create_card(9, card_color.spade, '9s'));
        deck.push(create_card(10, card_color.spade, 'Ts'));
        deck.push(create_card(11, card_color.spade, 'Js'));
        deck.push(create_card(12, card_color.spade, 'Qs'));
        deck.push(create_card(13, card_color.spade, 'Ks'));
        deck.push(create_card(14, card_color.spade, 'As'));

        return deck;
    })();

    deck_prototype = {
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

    function create_deck() {
        var permutation = [];
        var index = 0;
        var result_deck = [];
        var deck_object = null;
        var generator = _random_();

        for(index = 0; index < 52; index++) {
            permutation[index] = [index,generator()];
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

        deck_object = _ucengine_.createObject(deck_prototype);
        deck_object.cards = result_deck;

        return deck_object;
    };

    // Declaring the public interface
    return _ucengine_.createUCObject({
        _colorCodes: card_color,
        newShuffledDeck: create_deck,
        getCardFromStr: get_in_dictionary,
        isCard: is_a_card
    });
});
