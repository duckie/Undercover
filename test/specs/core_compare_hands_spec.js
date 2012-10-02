
define(['undercover/core/hand'],function(_handmod_) {
	describe('Testing hand construction', function() {
		
		var hand1 = 'Ah7c8cJcJs';
		var hand2 = 'sh3hJcJcJs';
		
		it('Constructs ' + hand1, function() {
			var hand = _handmod_.create_hand(hand1);
			var str_out = hand.toString();
			expect(str_out).toEqual(hand1);
		});

		it('Constructs ' + hand2, function() {
			var hand = _handmod_.create_hand(hand2);
			var str_out = hand.toString();
			expect(str_out).toEqual(hand2);
		});
	});

	return {};
});


