
define(['underscore','undercover/core/card'],function(_, _deckmod) {
	describe('Testing card retrieval', function() {
		
		var deck = _deckmod.new_shuffled_deck();		

		it('Ah value should be 14 and his color heart', function() {
			var card = _deckmod.get_card_from_str('Ah');
			expect(card.value()).toBe( 14 );
			//expect( card.color() ).toBeEqualTo( _deckmod.color_codes.heart );
		});
	});

	return {};
});


