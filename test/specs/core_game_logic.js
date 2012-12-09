
/// <reference path="../../src/undercover/core/set.js" />

define(['undercover/core/core', 'undercover/core/bet', 'undercover/core/player'],function( _ucengine_, _bet_, _player_) {

	describe('Simple betting rounds', function() {
		var players = [_player_.createPlayer(5000), _player_.createPlayer(5000)];
		var round = _bet_.createRound({players:players, small_blind:25, button_index:1});
		
		it('Heads-up rounds', function() {
            var players = [_player_.createPlayer(5000), _player_.createPlayer(5000)];
            var round = _bet_.createRound({players:players, small_blind:25, button_index:1});
			expect(function() { round.bet(26); }).toThrow();
            round = _bet_.createRound({players:players, small_blind:25, button_index:1});
            expect(function() { round.bet(74); }).toThrow();
		});

	});

	return {};
});
