// This module is designed for RequireJS
define( function(){
    var _create_game = function() {
        return {};
    }

    var _create_deck = (function() {
        var _basic_deck = [];

        // Hearts
        _basic_deck.push({value:2, color:0, str:'2h'});
        _basic_deck.push({value:3, color:0, str:'3h'});
        _basic_deck.push({value:4, color:0, str:'4h'});
        _basic_deck.push({value:5, color:0, str:'5h'});
        _basic_deck.push({value:6, color:0, str:'6h'});
        _basic_deck.push({value:7, color:0, str:'7h'});
        _basic_deck.push({value:8, color:0, str:'8h'});
        _basic_deck.push({value:9, color:0, str:'9h'});
        _basic_deck.push({value:10, color:0, str:'Th'});
        _basic_deck.push({value:11, color:0, str:'Jh'});
        _basic_deck.push({value:12, color:0, str:'Qh'});
        _basic_deck.push({value:13, color:0, str:'Kh'});
        _basic_deck.push({value:14, color:0, str:'Ah'});

        // Clubs
        _basic_deck.push({value:2, color:1, str:'2c'});
        _basic_deck.push({value:3, color:1, str:'3c'});
        _basic_deck.push({value:4, color:1, str:'4c'});
        _basic_deck.push({value:5, color:1, str:'5c'});
        _basic_deck.push({value:6, color:1, str:'6c'});
        _basic_deck.push({value:7, color:1, str:'7c'});
        _basic_deck.push({value:8, color:1, str:'8c'});
        _basic_deck.push({value:9, color:1, str:'9c'});
        _basic_deck.push({value:10, color:1, str:'Tc'});
        _basic_deck.push({value:11, color:1, str:'Jc'});
        _basic_deck.push({value:12, color:1, str:'Qc'});
        _basic_deck.push({value:13, color:1, str:'Kc'});
        _basic_deck.push({value:14, color:1, str:'Ac'});

        // Diamonds
        _basic_deck.push({value:2, color:2, str:'2d'});
        _basic_deck.push({value:3, color:2, str:'3d'});
        _basic_deck.push({value:4, color:2, str:'4d'});
        _basic_deck.push({value:5, color:2, str:'5d'});
        _basic_deck.push({value:6, color:2, str:'6d'});
        _basic_deck.push({value:7, color:2, str:'7d'});
        _basic_deck.push({value:8, color:2, str:'8d'});
        _basic_deck.push({value:9, color:2, str:'9d'});
        _basic_deck.push({value:10, color:2, str:'Td'});
        _basic_deck.push({value:11, color:2, str:'Jd'});
        _basic_deck.push({value:12, color:2, str:'Qd'});
        _basic_deck.push({value:13, color:2, str:'Kd'});
        _basic_deck.push({value:14, color:2, str:'Ad'});

        // Spades
        _basic_deck.push({value:2, color:3, str:'2s'});
        _basic_deck.push({value:3, color:3, str:'3s'});
        _basic_deck.push({value:4, color:3, str:'4s'});
        _basic_deck.push({value:5, color:3, str:'5s'});
        _basic_deck.push({value:6, color:3, str:'6s'});
        _basic_deck.push({value:7, color:3, str:'7s'});
        _basic_deck.push({value:8, color:3, str:'8s'});
        _basic_deck.push({value:9, color:3, str:'9s'});
        _basic_deck.push({value:10, color:3, str:'Ts'});
        _basic_deck.push({value:11, color:3, str:'Js'});
        _basic_deck.push({value:12, color:3, str:'Qs'});
        _basic_deck.push({value:13, color:3, str:'Ks'});
        _basic_deck.push({value:14, color:3, str:'As'});

        return function() {
            var permutation = [];
            var index = 0;
            for(index = 0; index < 52; index++) {
                permutation[index] = [index,1-Math.random()];
            }
            permutation.sort(function(elem1, elem2){
                elem1[1] - elem2[1];
            });
            var result_deck = [];
            for(index = 0; index < 52; index++) {
                result_deck[result_deck.length] = _basic_deck[permutation[index][0]];
            }

            return result_deck;
        };
    })();

    var uc_engine = {};
    uc_engine.new_shuffled_deck = _create_deck;
    
    // Declaring the public interface into the global scope
    return uc_engine;
});
