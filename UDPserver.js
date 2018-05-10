var main = require('main.js');
const dgram = require('dgram'); 
var server = dgram.createSocket("udp4");

server.bind(8082);
server.setBroadcast(true);

function SendBroadcast(IP, Content)
{
	server.send(Content, 8083, IP);
}

server.on('message', function(msg, socket)
{
	var TAblicaGier = main.TAblicaGier;

	let x = null, y = null, last = null, sp = 0;
	ToParse = msg.toString('utf8', 2);

	for (var i = ToParse.length; i >= 0; i--) 
	{

		if(ToParse[i] == " ")
		{
			if (y == null) 
			{
				last = i;
				y = ToParse.substring(i + 1);
			}
			else
				x = ToParse.substring(i + 1, last);
			
		}

	}

	value = [x, y];

	for (var i = 0; i < TAblicaGier.length; i++)
	{
		if(TAblicaGier[i].Socket1.client !== null)
		{
			if (socket == TAblicaGier[i].Socket1.client.client)
			{
				TAblicaGier[i].IsBusy(parseInt(value[0]), parseInt(value[1]), socket);
				break;
			}
		}
		if(TAblicaGier[i].Socket2.client !== null)
		{
			if (socket == TAblicaGier[i].Socket2.client.client)
			{
				TAblicaGier[i].IsBusy(parseInt(value[0]), parseInt(value[1]), socket);
				break;
			}
		}
		if(TAblicaGier[i].Socket3.client !== null)
		{
			if (socket == TAblicaGier[i].Socket3.client.client)
			{
				TAblicaGier[i].IsBusy(parseInt(value[0]), parseInt(value[1]), socket);
				break;
			}
		}
		if(TAblicaGier[i].Socket4.client !== null)
		{
			if (socket == TAblicaGier[i].Socket4.client.client)
			{
				TAblicaGier[i].IsBusy(parseInt(value[0]), parseInt(value[1]), socket);
				break;
			}
		}
	}
});

module.exports
{
	send: SendBroadcast()
}


