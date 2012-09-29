
define(['undercover/core/core','undercover/core/random'],function(underscore,iRandom) {
	describe('Testing deck construction', function() {


		deck = underscore.new_shuffled_deck();
		//console.log(underscore.new_shuffled_deck());

		it('should give the same mean each.', function() {
			mean = 0.5;
			
			expect(2).toBeLessThan(3);
		});
	});

	return {};
});


