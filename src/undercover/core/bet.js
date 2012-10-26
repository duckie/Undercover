/*
* Bet management module
*
* This module provides the bet logic of a poker game and is responsible
* for the consistency of money exchange between the players.
*/

define(['underscore','./core'],function(_, _uc_) {

    var round_prototype = {
        currentPlayer: function () {
            return this.local_players[this.current_player];
        },

        bet: function (amount) {
            var player = this.currentPlayer();

            _uc_.assert(!this.finished);
            // Checking that the bet is legit : must be a call (check if == 0 and player current bets == current max bets) or a sufficient raise
            _uc_.assert(this.max_bet == (player.bets + amount) || (this.max_bet + this.min_raise(this.last_raise)) <= player.bets + amount);
        }
    };

    /**
    * Initialize a new bet roun
    *
    * @param players : Array, mandatory
    *   The players, each player needs an id and a stack (seelayer.js but your own players can be used)
    * @param button_index : Integer, mandatory
    *   Which player is the button
    * @param small_blind : Integer, mandatory
    *   The small blind amount
    * @param big_blind : Interger, optional
    *   The big blind amount, default : 2*small_blind
    * @param min_raise : Function, optional
    *   A function to compute the min raise for a given player
    */
    function create_betting_round (params)
    {
        var players = params.players;
        var nb_players = players.length;
        var local_players = [];
        var dic = {};
        var small_blind_pos = (params.button_index+1)%nb_players;
        var big_blind_pos = (small_blind_pos + 1)%nb_players;
        var current_player = (big_blind_pos + 1)%nb_players;
        var index = 0;
        var current = null;
        var min_raise = _.isUndefined(params.min_raise) ? function (amount) { return 2*amount; } : params.min_raise;
        
        for(index = 0; index < nb_players; ++index) {
            current = {
                core_player: players[index],
                bets:0,
                folded:false
            };
            local_players.push(current);
            dic[current.core_player.id] = current;
        }
        
        var round = _uc_.createObject(round_prototype, {
            players: local_players,
            button: params.button_index,
            sb: small_blind_pos,
            bb: big_blind_pos,
            current_player: small_blind_pos,
            min_raise: min_raise,
            max_bet:0,
            last_raise:0,
            finished:false
        });

        //Blinds

    };

    return _uc_.createUCObject(); 
});