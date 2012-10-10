
define(['underscore', 'undercover/core/card', 'undercover/core/hand'],function( _, _card_, _handmod_) {
    describe('Testing hand construction', function() {
        
        var hand1 = 'JcJsAh8c7c';
        var hand2 = 'sh3hJcJcJs';
        var hand3 = 'Ah7c8cJc';

        var hand4 = [ _card_.getCardFromStr('Qh'), _card_.getCardFromStr('Jh'), _card_.getCardFromStr('Td'), _card_.getCardFromStr('8d'), _card_.getCardFromStr('3d')];
        var hand4str  = hand4.join('');

        var hand5 = [ _card_.getCardFromStr('Qh'), _card_.getCardFromStr('Jh'), { dogsays:true, toString: function() { return ' I have no idea what Im doin ';} }, _card_.getCardFromStr('8d'), _card_.getCardFromStr('3d')];
        var hand5str  = hand5.join('');

        var hand6 = 'AhTh7c8cTh';
        
        it('Constructs ' + hand1, function() {
            var hand = _handmod_.createHand(hand1);
            var str_out = hand.toString();
            expect(str_out).toEqual(hand1);
        });

        it('Constructs ' + hand2 +', should throw exception', function() {
            expect( function() { _handmod_.createHand(hand2); } ).toThrow();
        });

        it('Constructs ' + hand3 +', should throw exception', function() {
            expect( function() { _handmod_.createHand(hand3); } ).toThrow();
        });

        it('Constructs ' + hand4str +'.', function() {
            var hand = _handmod_.createHand(hand4);
            var str_out = hand.toString();
            expect(str_out).toEqual(hand4str);
        });

        it('Constructs ' + hand5str +', should throw exception because an element is not a card', function() {
            expect( function() { _handmod_.createHand(hand5); } ).toThrow();
        });

        it('Constructs ' + hand6 + ', should throw because of duplicate.', function() {
            expect( function() { _handmod_.createHand(hand6); } ).toThrow();
        });
    });

    describe('Testing hand value computation', function() {
        var hand1 = 'QhJhTh9h8h';
        var hand2 = '3h3s3d3c2c';
        var hand3 = '5h5d5c9c9h';
        var hand4 = 'KhJh5h2h7h';
        var hand5 = '5h6d7d8c9s';
        var hand6 = 'Js8hJhJd7c';
        var hand7 = 'Js8h8cJd2c';
        var hand8 = '5s8h8cJd2c';
        var hand9 = '5sAh8cJd2c';

        it('\'' + hand1 + ' should be a straigth flush', function() {
            var hand = _handmod_.createHand(hand1);
            expect(hand._handNature).toBe(_handmod_._handTypes.straightflush);
        });

        it('\'' + hand2 + ' should be a four of a kind', function() {
            var hand = _handmod_.createHand(hand2);
            expect(hand._handNature).toBe(_handmod_._handTypes.square);
        });

        it('\'' + hand3 + ' should be a full house', function() {
            var hand = _handmod_.createHand(hand3);
            expect(hand._handNature).toBe(_handmod_._handTypes.full);
        });
        
        it('\'' + hand4 + ' should be a flush', function() {
            var hand = _handmod_.createHand(hand4);
            expect(hand._handNature).toBe(_handmod_._handTypes.flush);
        });

        it('\'' + hand5 + ' should be a straight', function() {
            var hand = _handmod_.createHand(hand5);
            expect(hand._handNature).toBe(_handmod_._handTypes.straight);
        });

        it('\'' + hand6 + ' should be three of a kind', function() {
            var hand = _handmod_.createHand(hand6);
            expect(hand._handNature).toBe(_handmod_._handTypes.trips);
        });

        it('\'' + hand7 + ' should be two pairs', function() {
            var hand = _handmod_.createHand(hand7);
            expect(hand._handNature).toBe(_handmod_._handTypes.twopairs);
        });

        it('\'' + hand8 + ' should be one pair', function() {
            var hand = _handmod_.createHand(hand8);
            expect(hand._handNature).toBe(_handmod_._handTypes.pair);
        });

        it('\'' + hand9 + ' should be a high card', function() {
            var hand = _handmod_.createHand(hand9);
            expect(hand._handNature).toBe(_handmod_._handTypes.highcard);
        });
    });

    describe('Testing hand comparison', function() {
        var compare_case1 = { hand1: 'QhJhTh9h8h', hand2: '3h3s3d3c2c', expected: 1};

        function execute_test_case(testcase) {
            var hand1 = _handmod_.createHand(testcase.hand1);
            var hand2 = _handmod_.createHand(testcase.hand2);
            expect(hand1.compare(hand2)).toEqual(testcase.expected);
        }

        it("Set of hand comparison", function() {

            var compare_cases = [
            {hand1: 'QhJhTh9h8h', hand2: '3h3s3d3c2c', expected: 1},
            {hand1: '3h3s3d3c2c', hand2: 'QhJhTh9h8h', expected: -1},
            {hand1: '3h3s3d3c2c', hand2: '5h5d5c9c9h', expected: 1},
            {hand1: '5h5d5c9c9h', hand2: '3h3s3d3c2c', expected: -1},
            {hand1: '5h5d5c9c9h', hand2: 'KhJh5h2h7h', expected: 1},
            {hand1: 'KhJh5h2h7h', hand2: '5h5d5c9c9h', expected: -1},
            {hand1: 'KhJh5h2h7h', hand2: '5h6d7d8c9s', expected: 1},
            {hand1: '5h6d7d8c9s', hand2: 'KhJh5h2h7h', expected: -1},
            {hand1: '5h6d7d8c9s', hand2: 'Js8hJhJd7c', expected: 1},
            {hand1: 'Js8hJhJd7c', hand2: '5h6d7d8c9s', expected: -1},
            {hand1: 'Js8hJhJd7c', hand2: 'Js8h8cJd2c', expected: 1},
            {hand1: 'Js8h8cJd2c', hand2: 'Js8hJhJd7c', expected: -1},
            {hand1: 'Js8h8cJd2c', hand2: '5s8h8cJd2c', expected: 1},
            {hand1: '5s8h8cJd2c', hand2: 'Js8h8cJd2c', expected: -1},
            {hand1: '5s8h8cJd2c', hand2: '5sAh8cJd2c', expected: 1},
            {hand1: '5sAh8cJd2c', hand2: '5s8h8cJd2c', expected: -1},
            {hand1: 'KhQhJhTh9h', hand2: 'QhJhTh9h8h', expected: 1},
            {hand1: '3h3s3d3c2c', hand2: '4h4s4d6c4c', expected: -1},
            {hand1: '5h5d5c9c9h', hand2: '5h5d5c6c6h', expected: 1},
            {hand1: '5h5d5c9c9h', hand2: '5h5d5cTcTh', expected: -1},
            {hand1: '5h5d5cAcAh', hand2: '8h8d8c9c9h', expected: -1},
            {hand1: 'JhJd8cAc8h', hand2: 'JhJd9cAc9h', expected: -1}
            ];

            _.each(compare_cases, function(compare_case){
                execute_test_case(compare_case);
            });
        });
    });

    describe('Testing handsets', function() {
        it("Set of hold'em hands", function() {
            var handset = _handmod_.createHandSet({pick_min:0, pick_max:2, hole_cards:'As7h', common_cards:'Ks7sQd9sJs'});
            var hand = handset.computeHighest();
            expect(hand.toString()).toBe('AsKsJs9s7s');

            handset = _handmod_.createHandSet({pick_min:0, pick_max:2, hole_cards:'QhQs', common_cards:'Th9h5cAh6h'});
            hand = handset.computeHighest();
            expect(hand.toString()).toBe('AhQhTh9h6h');

			handset = _handmod_.createHandSet({pick_min:0, pick_max:2, hole_cards:'9cJs', common_cards:'As8hThAd7h'});
            hand = handset.computeHighest();
            expect(hand.toString()).toBe('JsTh9c8h7h');

            handset = _handmod_.createHandSet({pick_min:0, pick_max:2, hole_cards:'Ah2c', common_cards:'As8hThAd7h'});
            hand = handset.computeHighest();
            expect(hand.toString()).toBe('AhAsAdTh8h');

            handset = _handmod_.createHandSet({pick_min:0, pick_max:2, hole_cards:'3hQh', common_cards:'As8hThAd7h'});
            hand = handset.computeHighest();
            expect(hand.toString()).toBe('QhTh8h7h3h');

            handset = _handmod_.createHandSet({pick_min:0, pick_max:2, hole_cards:'7cTc', common_cards:'As8hThAd7h'});
            hand = handset.computeHighest();
            expect(hand.toString()).toBe('AsAdTcTh8h');

            handset = _handmod_.createHandSet({pick_min:0, pick_max:2, hole_cards:'5d6d', common_cards:'As8hThAd7h'});
            hand = handset.computeHighest();
            expect(hand.toString()).toBe('AsAdTh8h7h');
            //console.log(hand);
        });

        it("Set of omaha hands", function() {
            var handset = _handmod_.createHandSet({pick_min:2, pick_max:2, hole_cards:'QhQs4d8d', common_cards:'Th9h5cAh6h'});
            var hand = handset.computeHighest();
            expect(hand.toString()).toBe('QhQsAhTh9h');

            handset = _handmod_.createHandSet({pick_min:2, pick_max:2, hole_cards:'7hQs4d8d', common_cards:'Th9h5cAh6h'});
            hand = handset.computeHighest();
            expect(hand.toString()).toBe('Th9h8d7h6h');

            handset = _handmod_.createHandSet({pick_min:2, pick_max:2, hole_cards:'7hQh4d8d', common_cards:'Th9h5cAh6h'});
            hand = handset.computeHighest();
            expect(hand.toString()).toBe('AhQhTh9h7h');

            handset = _handmod_.createHandSet({pick_min:2, pick_max:2, hole_cards:'7hQh4d8d', common_cards:'KhKsKdKc9h'});
            hand = handset.computeHighest();
            expect(hand.toString()).toBe('KhKsKdQh8d');

            handset = _handmod_.createHandSet({pick_min:2, pick_max:2, hole_cards:'7hQh4d4c', common_cards:'KhKsKdKc9h'});
            hand = handset.computeHighest();
            expect(hand.toString()).toBe('KhKsKd4d4c');


            //console.log(hand);
        });
    });

    return {};
});

