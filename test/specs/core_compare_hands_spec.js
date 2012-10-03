
define(['underscore', 'undercover/core/card', 'undercover/core/hand'],function( _, _card_, _handmod_) {
	describe('Testing hand construction', function() {
		
		var hand1 = 'AhJcJs8c7c';
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
		var hand1 = _handmod_.createHand('QhJhTh9h8h');
		var hand2 = _handmod_.createHand('3h3s3d3c2c');
		var hand3 = _handmod_.createHand('5h5d5c9c9h');
		var hand4 = _handmod_.createHand('KhJh5h2h7h');
		var hand5 = _handmod_.createHand('5h6d7d8c9s');
		var hand6 = _handmod_.createHand('Js8hJhJd7c');
		var hand7 = _handmod_.createHand('Js8h8cJd2c');
		var hand8 = _handmod_.createHand('5s8h8cJd2c');
		var hand9 = _handmod_.createHand('5sAh8cJd2c');

		it('\'' + hand1 + ' should be a straigth flush', function() {
			hand1.compute_value();
			expect(hand1._handNature).toBe(_handmod_._handTypes.straightflush);
		});

		// Falsy to be debugged
		/*it('\'' + hand2 + ' should be a square', function() {
			hand2.compute_value();
			expect(hand2._handNature).toBe(_handmod_._handTypes.square);
		});*/
	});

	return {};
});
