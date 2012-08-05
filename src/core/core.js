(function(root_object){
    var _root = root_object;

    var _create_game = function() {
        return {};
    }

    var _create_deck = (function() {
        var _basic_deck = [];

        // Spades
        _basic_deck[_basic_deck.size] = {value:2, color:0, str:'2s'};
        _basic_deck[_basic_deck.size] = {value:3, color:0, str:'3s'};
        _basic_deck[_basic_deck.size] = {value:4, color:0, str:'4s'};
        _basic_deck[_basic_deck.size] = {value:5, color:0, str:'5s'};
        _basic_deck[_basic_deck.size] = {value:6, color:0, str:'6s'};
        _basic_deck[_basic_deck.size] = {value:7, color:0, str:'7s'};
        _basic_deck[_basic_deck.size] = {value:8, color:0, str:'8s'};
        _basic_deck[_basic_deck.size] = {value:9, color:0, str:'9s'};
        _basic_deck[_basic_deck.size] = {value:10, color:0, str:'Ts'};
        _basic_deck[_basic_deck.size] = {value:11, color:0, str:'Js'};
        _basic_deck[_basic_deck.size] = {value:12, color:0, str:'Qs'};
        _basic_deck[_basic_deck.size] = {value:13, color:0, str:'Ks'};
        _basic_deck[_basic_deck.size] = {value:14, color:0, str:'As'};

        // Hearts
        _basic_deck[_basic_deck.size] = {value:2, color:1, str:'2h'};
        _basic_deck[_basic_deck.size] = {value:3, color:1, str:'3h'};
        _basic_deck[_basic_deck.size] = {value:4, color:1, str:'4h'};
        _basic_deck[_basic_deck.size] = {value:5, color:1, str:'5h'};
        _basic_deck[_basic_deck.size] = {value:6, color:1, str:'6h'};
        _basic_deck[_basic_deck.size] = {value:7, color:1, str:'7h'};
        _basic_deck[_basic_deck.size] = {value:8, color:1, str:'8h'};
        _basic_deck[_basic_deck.size] = {value:9, color:1, str:'9h'};
        _basic_deck[_basic_deck.size] = {value:10, color:1, str:'Th'};
        _basic_deck[_basic_deck.size] = {value:11, color:1, str:'Jh'};
        _basic_deck[_basic_deck.size] = {value:12, color:1, str:'Qh'};
        _basic_deck[_basic_deck.size] = {value:13, color:1, str:'Kh'};
        _basic_deck[_basic_deck.size] = {value:14, color:1, str:'Ah'};

        // Clubs
        _basic_deck[_basic_deck.size] = {value:2, color:2, str:'2c'};
        _basic_deck[_basic_deck.size] = {value:3, color:2, str:'3c'};
        _basic_deck[_basic_deck.size] = {value:4, color:2, str:'4c'};
        _basic_deck[_basic_deck.size] = {value:5, color:2, str:'5c'};
        _basic_deck[_basic_deck.size] = {value:6, color:2, str:'6c'};
        _basic_deck[_basic_deck.size] = {value:7, color:2, str:'7c'};
        _basic_deck[_basic_deck.size] = {value:8, color:2, str:'8c'};
        _basic_deck[_basic_deck.size] = {value:9, color:2, str:'9c'};
        _basic_deck[_basic_deck.size] = {value:10, color:2, str:'Tc'};
        _basic_deck[_basic_deck.size] = {value:11, color:2, str:'Jc'};
        _basic_deck[_basic_deck.size] = {value:12, color:2, str:'Qc'};
        _basic_deck[_basic_deck.size] = {value:13, color:2, str:'Kc'};
        _basic_deck[_basic_deck.size] = {value:14, color:2, str:'Ac'};

        // Diamonds
        _basic_deck[_basic_deck.size] = {value:2, color:3, str:'2d'};
        _basic_deck[_basic_deck.size] = {value:3, color:3, str:'3d'};
        _basic_deck[_basic_deck.size] = {value:4, color:3, str:'4d'};
        _basic_deck[_basic_deck.size] = {value:5, color:3, str:'5d'};
        _basic_deck[_basic_deck.size] = {value:6, color:3, str:'6d'};
        _basic_deck[_basic_deck.size] = {value:7, color:3, str:'7d'};
        _basic_deck[_basic_deck.size] = {value:8, color:3, str:'8d'};
        _basic_deck[_basic_deck.size] = {value:9, color:3, str:'9d'};
        _basic_deck[_basic_deck.size] = {value:10, color:3, str:'Td'};
        _basic_deck[_basic_deck.size] = {value:11, color:3, str:'Jd'};
        _basic_deck[_basic_deck.size] = {value:12, color:3, str:'Qd'};
        _basic_deck[_basic_deck.size] = {value:13, color:3, str:'Kd'};
        _basic_deck[_basic_deck.size] = {value:14, color:3, str:'Ad'};

        return function() {
            var permutation = [];
            var index = 0;
            for(index = 0; index < 52; index++) {
                permutation[index] = [index,Math.random()];
            }
            permutation.sort(function(elem1, elem2){
                elem1[1] < elem2[1];
            });
        };
    })();

    // Declaring the plic interface into the global scope
    _root.roger = "marcel";

})(this);
