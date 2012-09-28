
define(['undercover/core/core','undercover/core/random'],function(underscore,iRandom) {
	describe('Testing deck construction', function() {
				
		var rand = iRandom(Math.round((new Date()).getTime()));
		var i = 0;
		var sum = 0;
		var mean = 0;
		var iter = 1e7;
		var epsilon = 1e-3;

		deck = underscore.new_shuffled_deck();
		//console.log(underscore.new_shuffled_deck());

		it('should give the same mean each.', function() {
			mean = 0.5;
			console.log(deck.draw().toString());
			console.log(deck.draw().toString());
			console.log(deck.draw().toString());
			
			expect(Math.abs(mean-0.5)).toBeLessThan(epsilon);
		});
	});

	return {};
});


