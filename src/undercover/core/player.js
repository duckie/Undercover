/*
* Core player management module
*
* This module provides the basic player interface
*/

define(['underscore', './core'],function(_, _uc_) {

    var id_generator = 0;

    var player_prototype = {
        rebuy: function (amount) {
            this.stack += amount;
        }
    };

    function create_player (amount) {
        var id = id_generator++;
        
        var player = _uc_.createObject(player_prototype, {
                    id: id,
                    stack: amount
                });

        return player;
    };

    return _uc_.createUCObject({
        createPlayer: create_player
    }); 
});