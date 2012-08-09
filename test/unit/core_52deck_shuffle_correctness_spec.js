define(['src/core/core','src/core/random'],function(mod_core,mod_random){
	underscore = mod_core;
	Random = mod_random;

	describe('Shuffle for a lot of times', function() {
				
		var rand = Random(Math.round((new Date()).getTime()));
		var i = 0;
		var sum = 0;
		var mean = 0;
		var iter = 1e7;

		it('should give the same mean each.', function() {
			for(i = 0; i < iter; i++) {
				sum = sum + rand();
			}
			mean = sum/iter;
			
			expect(Math.abs(mean-0.5)).toBeLessThan(1e-4);
		});
	});

	return {};
});
