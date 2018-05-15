var objects = require("./objects.js");
const dgram = require('dgram'); 
var terminal = require("./output.js");
var variables = require('./var.js');

var server = dgram.createSocket("udp4");

function SendBroadcast(IP, Content)
{
	var message = Buffer.from(Content);
	server.send(message, 8083, IP);
}

server.on('listening', function()
{
	server.setBroadcast(true);
});

server.on('message', function(msg, socket)
{
	let x = null, y = null, rotation = null, sp = 0, last = null;
	var ToParse = msg.toString('utf8');

	for (var i = ToParse.length - 1; i >= 0; i--) 
	{
		if(ToParse[i] == " " && sp == 0)
		{
			rotation = ToParse.substring(i + 1);
			sp = 1;
			last = i;
		}
		else if(ToParse[i] == " " && sp == 1)
		{
			y = ToParse.substring(i + 1, last - 1);
			x = ToParse.substring(0, i - 1);
			sp = 0;
		}
	}

	value = [x, y];

	for (var i = 0; i < variables.TAblicaGier.length; i++)
	{
		if(variables.TAblicaGier[i].Socket1.client !== null)
		{
			if (socket.address == variables.TAblicaGier[i].Socket1.client.ip)
			{
				variables.TAblicaGier[i].IsBusy(parseInt(value[0]), parseInt(value[1]), socket.address, parseInt(rotation));
				break;
			}
		}
		if(variables.TAblicaGier[i].Socket2.client !== null)
		{
			if (socket.address == variables.TAblicaGier[i].Socket2.client.ip)
			{
				variables.TAblicaGier[i].IsBusy(parseInt(value[0]), parseInt(value[1]), socket.address, parseInt(rotation));
				break;
			}
		}
		if(variables.TAblicaGier[i].Socket3.client !== null)
		{
			if (socket.address == variables.TAblicaGier[i].Socket3.client.ip)
			{
				variables.TAblicaGier[i].IsBusy(parseInt(value[0]), parseInt(value[1]), socket.address, parseInt(rotation));
				break;
			}
		}
		if(variables.TAblicaGier[i].Socket4.client !== null)
		{
			if (socket.address == variables.TAblicaGier[i].Socket4.client.ip)
			{
				variables.TAblicaGier[i].IsBusy(parseInt(value[0]), parseInt(value[1]), socket.address, parseInt(rotation));
				break;
			}
		}
	}

	terminal.cli(3, value[0], value[1], variables.TAblicaGier);
});


server.bind(8082);


module.exports =
{
	send: SendBroadcast
}


