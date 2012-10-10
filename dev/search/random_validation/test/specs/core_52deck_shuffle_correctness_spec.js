
define(['undercover/core/card','undercover/core/random'],function(_deckmod_,Random) {
    describe('Shuffle for a lot of times', function() {
	
	var rand = Random(Math.round((new Date()).getTime()));
	var i = 0;
	var j = 0;
	var sum = 0;
	var mean = 0;
	var iter = 1e7;
	var epsilon = 1e-3;
	
	deck = _deckmod_.newShuffledDeck();
	//console.log(underscore.newShuffledDeck());
	
	var tabl = [];
	for (i = 0; i < 52; i++)
	{
	    tabl[i] = [];
	    for (j = 0; j < 52; j++)
		tabl[i][j] = 0;
	}

	function printres(t)
	{
	    var i;
	    var j;
	    var s = "";
	    console.log("");
	    for (i = 0; i < 52; i++)
	    {
		s = "[";
		for (j = 0; j < 51; j++)
		    s += t[i][j] + ", ";
		s += t[i][51] + "],";
		console.log(s);
	    }
	}

	it('should give the same mean each.', function() {
	    for(i = 0; i < iter; i++) {
		deck = _deckmod_.newShuffledDeck();
		for (j = 0; j < 52; j++)
		{
		    c = deck.cards[j];
		    idx = c._value - 2 + c._color * 13;
		    tabl[j][idx] += 1;
		}
		if (i % 100000 == 0)
		    printres(tabl)
	    }
	    
	});
    });
    return {};
});

