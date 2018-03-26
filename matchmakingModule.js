const net = require('net');
const stream = require('stream');
const fs = require('fs');
const objects = require("./objects.js");

//TablicaNieAktywnych = Array();


function matchmaking(player, games)				//przydzielanie graczy
{
	for (var i = 0; i < games.length; i++) 
	{

		if(games[i].Socket1.client == null)
			games[i].Socket1.client = player;

		else if(games[i].Socket2.client == null)
			games[i].Socket2.client = player;

		else if(games[i].Socket3.client == null)
			games[i].Socket3.client = player;

		else if(games[i].Socket4.client == null)
			games[i].Socket4.client = player;
	}
}

module.exports = {
	find: matchmaking
}
