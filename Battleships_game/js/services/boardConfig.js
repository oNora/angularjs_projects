battleShips.factory('boardConfig', function gameConfig() {
	return {
	    GUESS_INSTRUCTIONS : "Please enter a letter and a number within the board.",
	    NOT_BOARD : "Please choose something within the board.",
	    NOT_VALID : "Please choose valid values.",
	    YOU_SANK_ONE : "Oh, no!!! You sank my battleship!!!",
	    YOU_SANK : "You sank all my battleships. Number of Guesses: ",
	    ALREADY_HIT : "You already hit that location!!!",
	    HIT : "You hit one of my battleship!!!",
	    YOU_MISSED : "You missed...",
		alphabet : ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
		boardSize : 10,
	};
});