
/// <reference path="../../src/undercover/core/set.js" />

define(['undercover/core/core','undercover/core/set'],function( _ucengine_, _set_) {

	describe('Set maths', function() {
		it('Searching combinations', function() {
			// Fail cases
			expect(function(){ return _set_.findCombinations([1,2,3], 4); }).toThrow();
			expect(function(){ return _set_.findCombinations([1,2,3], 0); }).toThrow();

			expect(_set_.findCombinations([1,2,3], 1)).toEqual( [[1], [2], [3]] );
			expect(_set_.findCombinations([1,2,3], 2)).toEqual( [[1, 2], [1, 3], [2, 3]] );
			expect(_set_.findCombinations([1,2,3], 3)).toEqual( [[1, 2, 3]] );
			expect(_set_.findCombinations([1,2,3,4,5], 2)).toEqual( [[1, 2], [1, 3], [1, 4], [1, 5], [2, 3], [2, 4], [2, 5], [3, 4], [3, 5], [4, 5]] );
			expect(_set_.findCombinations([1,2,3,4,5], 3)).toEqual( [[1, 2, 3], [1, 2, 4], [1, 2, 5], [1, 3, 4], [1, 3, 5], [1, 4, 5], [2, 3, 4], [2, 3, 5], [2, 4, 5], [3, 4, 5]] );
			expect(_set_.findCombinations([1,2,3,4,5], 4)).toEqual( [[1, 2, 3, 4], [1, 2, 3, 5], [1, 2, 4, 5], [1, 3, 4, 5], [2, 3, 4, 5]] );
		});

	});

	return {};
});
