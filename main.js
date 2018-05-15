var objects = require("./objects.js");
const net = require('net');
var matchmaking = require("./matchmakingModule.js");
var terminal = require("./output.js");
const util = require('util');
var variables = require('./var.js');

const server = net.createServer();
var TablicaGraczy = variables.TablicaGraczy;
var DoWylosowania = variables.DoWylosowania;
var TAblicaGier = variables.TAblicaGier;
var NotPlaying;

for (var i = 0; i < TAblicaGier.length; i++)
	TAblicaGier[i] = new objects.room4;

server.on("connection", function(socket)
{

	TablicaGraczy.push(new objects.client(socket));

	terminal.cli(0, null, null, TAblicaGier);

	socket.on("data", function(data)
	{
		var code = data.toString('utf8', 0, 2);
		var value;

		socket.setKeepAlive(true);

		switch(code)
		{
			case "01": //conected
				value = data.toString('utf8', 2);

				for (var i = TablicaGraczy.length - 1; i >= 0; i--)
				{
					if(TablicaGraczy[i].client == socket)
					{
						TablicaGraczy[i].name = value;
						matchmaking.find(TablicaGraczy[i], TAblicaGier);
					}

				}

				terminal.cli(1, value, null, TAblicaGier);

				break;

			case "02":
				var ip;
				if (socket.remoteAddress.substr(0, 7) == '::ffff:')
					ip = socket.remoteAddress.substr(7);
					
				for (var i = 0; i < TAblicaGier.length; i++)
				{
					if(TAblicaGier[i].Socket1.client !== null)
					{
						if (ip === TAblicaGier[i].Socket1.client.ip)
						{
							TAblicaGier[i].Socket1.Redy = true;
							terminal.cli(2, 1, null, TAblicaGier);
							TAblicaGier[i].redy();
							break;
						}
					}
					if(TAblicaGier[i].Socket2.client !== null)
					{
						if (ip === TAblicaGier[i].Socket2.client.ip)
						{
							TAblicaGier[i].Socket2.Redy = true;
							terminal.cli(2, 2, null, TAblicaGier);
							TAblicaGier[i].redy();
							break;
						}
					}
					if(TAblicaGier[i].Socket3.client !== null)
					{
						if (ip === TAblicaGier[i].Socket3.client.ip)
						{
							TAblicaGier[i].Socket3.Redy = true;
							terminal.cli(2, 3, null, TAblicaGier);
							TAblicaGier[i].redy();
							break;
						}
					}
					if(TAblicaGier[i].Socket4.client !== null)
					{
						if (ip === TAblicaGier[i].Socket4.client.ip)
						{
							TAblicaGier[i].Socket4.Redy = true;
							terminal.cli(2, 4, null, TAblicaGier);
							TAblicaGier[i].redy();
							break;
						}
					}
				}
				
				break;
		}
	});
});

server.listen(8081, function(){
	console.log("port: 8081, nasluch ");

});





