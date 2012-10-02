
define(['undercover/core/hand'],function(_handmod_) {
	describe('Testing hand construction', function() {
		var current_hand = "Ah7c8cJcJs";
		var hand = _handmod_.create_hand(current_hand);

		it('Constructs ' + current_hand, function() {
			var str_out = hand.toString();
			expect(str_out).toEqual(current_hand);
		});
	});

	return {};
});


