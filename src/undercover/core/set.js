// This module is designed for RequireJS()
define(['underscore','./core'], function(_, _uc_){

	/**
	* Find every combination of k elements extracted from the array 'elements'
	*
	* The algorithm is stable, which means it keeps the original order of the elements
	* in the given array.
	*/
	function find_combinations(elements, k) {
		_uc_.assert(0 < k && k <= elements.length);

		var result = null;
		var index =  0;
		var work_elements = null;
		var trashed_out = null;

		if(elements.length === k) {
			result = [ _.clone(elements) ];
		}
		else if (1 === k) {
			return _.map(elements, function(element){ return [element]; });
		}
		else {
			result = [];
			work_elements = _.clone(elements); 
			trashed_out = work_elements.shift();

			_.each(find_combinations(work_elements, k-1), function(solution) {
				solution.unshift(trashed_out);
				result.push(solution);
			});

			_.each(find_combinations(work_elements,k), function(solution){
				result.push(solution);
			});
		}

		return result;
	};

	return {
		findCombinations: find_combinations
	}
});