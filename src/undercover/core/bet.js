/*
* Bet management module
*
* This module provides the bet logic of a poker game and is responsible
* for the consistency of money exchange between the players.
*/

define(['underscore','./core'],function(_, _uc_) {

    var round_prototype = {
        currentPlayer: function () {
            return this.players[this.current_player];
        },

        fold: function () {
            var player = this.currentPlayer();
            var nb_players = this.players.length;
            var nb_players_left = 0;
            var index = 0;
            var next_player_pos = this.current_player;
            var first_next_pos = 0;
            var next_player = null;
            var candidate = null;

            // Input contract
            _uc_.assert(!this.finished,'bet_round_finished');

            player.folded = true;

            // Find next player
            index = 0;
            while(index++ < nb_players - 1) {
                next_player_pos = (next_player_pos+1)%nb_players;
                candidate = this.players[next_player_pos];
                if(true === candidate.allin || true === candidate.folded) {
                    ++nb_players_left;
                    if(null === next_player) {
                        first_next_pos = next_player_pos;
                        next_player = candidate;
                    }
                }
            }

            if(nb_players_left < 2) {
                this.finished = true;
            }
            else {
                this.current_player = first_next_pos;
            }
        },

        bet: function (amount) {
            var player = this.currentPlayer();
            var nb_players = this.players.length;
            var raise_value = 0;
            var index = 0;
            var next_player_pos = this.current_player;
            var next_player = null;
            var candidate = null;

            // Input contract
            // Not finished
            _uc_.assert(!this.finished,'bet_round_finished');
            // Player has enough money
            _uc_.assert(amount <= player.core_player.stack);
            // Checking that the bet is legit : must be a call (check if == 0 and player current bets == current max bets) or a sufficient raise, or all-in
            _uc_.assert( (player.bets + player.core_player.stack) <= this.max_bet || this.max_bet === (player.bets + amount) || (this.max_bet + this.min_raise(this.last_raise)) <= player.bets + amount || player.core_player.stack === amount, 'bet_bet_amount_forbiden');

            // Bets
            raise_value = player.bets + amount - this.max_bet;
            if(raise_value < 0) {
                raise_value = 0;
            }
        
            // Modifying the model
            player.bets += amount;
            player.core_player.stack -= amount;
            this.pot += amount;
            if(this.max_bet < player.bets) {
                this.max_bet = player.bets;
            }
            if(0 === player.core_player.stack) {
                player.allin = true;
            }
            if(0 < raise_value) {
                this.last_raise = raise_value;    
                this.last_raiser_pos = this.current_player;
            }

            // Find next player
            index = 0;
            while(index++ < nb_players - 1 && null === next_player && false === this.finished) {
                next_player_pos = (next_player_pos+1)%nb_players;
                candidate = this.players[next_player_pos];
                if(true === candidate.allin || true === candidate.folded) {
                    continue;
                }
                // WTF man ??? if(0 === raise_value && (2 === nb_players ? true : (next_player_pos === this.last_raiser_pos || false === this.players[this.last_raiser_pos].folded) ) ) {
                if(0 === raise_value && next_player_pos === this.last_raiser_pos) {
                    this.finished = true;
                    break;
                }
                next_player = candidate;
                this.current_player = next_player_pos;
                break;
            }

            if(null === next_player) {
                this.finished = true;
            }

            // Return info about what happened
            return {};
        },

        check: function() {
            this.bet(0);
        }
    };

    /**
    * Initialize a new bet round
    *
    * @param players : Array, mandatory
    *   The players, each player needs an id and a stack (see player.js but your own players can be used)
    * @param button_index : Integer, mandatory
    *   Which player is the button
    * @param small_blind : Integer, mandatory
    *   The small blind amount
    * @param big_blind : Integer, optional
    *   The big blind amount, default : 2*small_blind
    * @param min_raise : Function, optional
    *   A function to compute the min raise for a given player
    */
    function create_betting_round (params)
    {
        _uc_.assert(_.has(params,'players') && _.has(params,'small_blind') && _.has(params,'button_index'), 'bet_create_round_param_incomplete');

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
        
        // Particular case of the heads-up
        if(2 == nb_players) {
            big_blind_pos = small_blind_pos;
            current_player = params.button_index;
            small_blind_pos = params.button_index;
        }

        _uc_.assert(0 < params.button_index && params.button_index < nb_players, 'bet_create_round_param_not_consistent');

        for(index = 0; index < nb_players; ++index) {
            current = {
                core_player: players[index],
                bets:0,
                allin:false,
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
            current_player: current_player,
            min_raise: function(raise){ return 0;},
            last_raiser_pos:-1,
            pot:0,
            max_bet:0,
            last_raise:0,
            finished:false
        });

        //Blinds
        round.bet(params.small_blind);
        round.min_raise = function(raise){ return params.small_blind;};
        round.bet(_.has(params,'big_blind') ? params.big_blind : 2*params.small_blind);
        round.min_raise = min_raise;
        round.last_raiser_pos = (round.bb+1)%nb_players;

        return round;
    };

    return _uc_.createUCObject({
        createRound: create_betting_round
    }); 
});