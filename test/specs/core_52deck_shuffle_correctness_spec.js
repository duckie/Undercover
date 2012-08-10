
define(['undercover/core/core','undercover/core/random'],function(underscore,Random) {
	describe('Shuffle for a lot of times', function() {
				
		var rand = Random(Math.round((new Date()).getTime()));
		var i = 0;
		var sum = 0;
		var mean = 0;
		var iter = 1e7;
		var epsilon = 1e-3;

		deck = underscore.new_shuffled_deck();
		//console.log(underscore.new_shuffled_deck);

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

