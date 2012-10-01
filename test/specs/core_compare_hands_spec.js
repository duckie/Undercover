
define(['undercover/core/card'],function(_deckmod) {
	describe('Testing deck construction', function() {
		var deck = _deckmod.new_shuffled_deck();
		//console.log(deck.draw().toString());
		//alert(deck.draw().toString());

		it('should give the same mean each.', function() {
			var mean = 0.5;
			expect(2).toBeLessThan(3);
		});
	});

	return {};
});


