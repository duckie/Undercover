
define(['undercover/core/card'],function( _deckmod) {
	describe('Testing card retrieval', function() {

		it('Ah value should be 14 and his color heart', function() {
			var card = _deckmod.get_card_from_str('Ah');
			expect(card.value()).toBe( 14 );
			expect( card.color() ).toBe( _deckmod.color_codes.heart );
		});

		it('Js value should be 11 and his color spade', function() {
			var card = _deckmod.get_card_from_str('Js');
			expect(card.value()).toBe( 11 );
			expect( card.color() ).toBe( _deckmod.color_codes.spade );
		});

		it('Qc value should be 12 and his color club', function() {
			var card = _deckmod.get_card_from_str('Qc');
			expect(card.value()).toBe( 12 );
			expect( card.color() ).toBe( _deckmod.color_codes.club );
		});

		it('6d value should be 6 and his color diamond', function() {
			var card = _deckmod.get_card_from_str('6d');
			expect(card.value()).toBe( 6 );
			expect( card.color() ).toBe( _deckmod.color_codes.diamond );
		});
	});

	return {};
});


