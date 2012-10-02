
define(['underscore', 'undercover/core/card', 'undercover/core/hand'],function( _, _card_, _handmod_) {
	describe('Testing hand construction', function() {

		function implode(iArg) {
			return _.reduce(iArg, function(str,elem) { return str+elem; }, '');
		};
		
		var hand1 = 'Ah7c8cJcJs';
		var hand2 = 'sh3hJcJcJs';
		var hand3 = 'Ah7c8cJc';

		var hand4 = [ _card_.getCardFromStr('Qh'), _card_.getCardFromStr('Jh'), _card_.getCardFromStr('Td'), _card_.getCardFromStr('8d'), _card_.getCardFromStr('3d')];
		var hand4str  = implode(hand4);

		var hand5 = [ _card_.getCardFromStr('Qh'), _card_.getCardFromStr('Jh'), { dogsays: 'I have no idea what Im doin'}, _card_.getCardFromStr('8d'), _card_.getCardFromStr('3d')];
		var hand5str  = implode(hand5);

		var hand6 = 'AhTh7c8cTh';
		
		it('Constructs ' + hand1, function() {
			var hand = _handmod_.create_hand(hand1);
			var str_out = hand.toString();
			expect(str_out).toEqual(hand1);
		});

		it('Constructs ' + hand2 +', should throw exception', function() {
			expect( function() { _handmod_.create_hand(hand2); } ).toThrow();
		});

		it('Constructs ' + hand3 +', should throw exception', function() {
			expect( function() { _handmod_.create_hand(hand3); } ).toThrow();
		});

		it('Constructs ' + hand4str +'.', function() {
			var hand = _handmod_.create_hand(hand4);
			var str_out = hand.toString();
			expect(str_out).toEqual(hand4str);
		});

		it('Constructs ' + hand5str +', should throw exception', function() {
			expect( function() { _handmod_.create_hand(hand5); } ).toThrow();
		});

		it('Constructs ' + hand6 + ', should throw because of duplicate.', function() {
			expect( function() { _handmod_.create_hand(hand6); } ).toThrow();
		});
	});

	return {};
});
