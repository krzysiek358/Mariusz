const net = require('net');
const stream = require('stream');
const fs = require('fs');
const objects = require("./objects.js");
const terminal = require("./output.js");


function matchmaking(player, games)				//przydzielanie graczy
{
	for (var i = 0; i < games.length; i++) 
	{

		if(games[i].Socket1.client == null)
		{
			games[i].Socket1.client = player;
			break;
		}

		else if(games[i].Socket2.client == null)
		{
			games[i].Socket2.client = player;
			break;
		}

		else if(games[i].Socket3.client == null)
		{
			games[i].Socket3.client = player;
			break;
		}

		else if(games[i].Socket4.client == null)
		{
			games[i].Socket4.client = player;
			break;
		}

		terminal.cli( 100, games[i].Socket1.client, games[i].Socket2.client)
	}
}

module.exports = {
	find: matchmaking
}
