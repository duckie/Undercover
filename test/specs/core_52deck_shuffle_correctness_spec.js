
define(['undercover/core/card','undercover/core/random'],function(_deckmod_,Random) {
	describe('Shuffle for a lot of times', function() {
				
		var rand = Random(Math.round((new Date()).getTime()));
		var i = 0;
		var sum = 0;
		var mean = 0;
		var iter = 1e7;
		var epsilon = 1e-3;

		deck = _deckmod_.newShuffledDeck();
		//console.log(_deckmod_.newShuffledDeck());

		it('should give the same mean each.', function() {
			for(i = 0; i < iter; i++) {
				sum = sum + rand();
			}
			mean = sum/iter;
			
			
			expect(Math.abs(mean-0.5)).toBeLessThan(epsilon);
		});
	});

	return {};
});

