
define(['undercover/core/card'],function( _deckmod) {
	describe('Testing card retrieval', function() {

		it('Ah value should be 14 and his color heart', function() {
			var card = _deckmod.getCardFromStr('Ah');
			expect(card.value()).toBe( 14 );
			expect( card.color() ).toBe( _deckmod._colorCodes.heart );
		});

		it('Js value should be 11 and his color spade', function() {
			var card = _deckmod.getCardFromStr('Js');
			expect(card.value()).toBe( 11 );
			expect( card.color() ).toBe( _deckmod._colorCodes.spade );
		});

		it('Qc value should be 12 and his color club', function() {
			var card = _deckmod.getCardFromStr('Qc');
			expect(card.value()).toBe( 12 );
			expect( card.color() ).toBe( _deckmod._colorCodes.club );
		});

		it('6d value should be 6 and his color diamond', function() {
			var card = _deckmod.getCardFromStr('6d');
			expect(card.value()).toBe( 6 );
			expect( card.color() ).toBe( _deckmod._colorCodes.diamond );
		});
	});

	return {};
});


