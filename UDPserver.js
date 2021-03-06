const objects = require("./objects.js");
const dgram = require('dgram');
const terminal = require("./output.js");
const variables = require('./var.js');

let server = dgram.createSocket("udp4");

function SendBroadcast(IP, Content)
{
	let message = Buffer.from(Content);
	server.send(message, 0, 16, 8083, IP, function(err)
	{
		if(err)
			console.log(err);

		console.log(Content);
		console.log(message);
		console.log(IP);
	});
}

server.on('listening', function()
{
	server.setBroadcast(true);
	server.setSendBufferSize(16);
	server.setTTL(255);
});

server.on('message', function(msg, socket)
{
	let x = null, y = null, rotation = null, sp = 0, last = null;
	let ToParse = msg.toString('utf8');


	for (let i = ToParse.length - 1; i >= 0; i--)
	{

		if(ToParse[i] == " " && sp == 0)
		{
			rotation = ToParse.substring(i + 1);
			sp = 1;
			last = i;
		}

		else if(ToParse[i] == " " && sp == 1)
		{
			y = ToParse.substring(i + 1, last);
			x = ToParse.substring(0, i);
			sp = 0;
			break;
		}
	}

	value = [x, y];

	for (let i = 0; i < variables.TAblicaGier.length; i++)
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
