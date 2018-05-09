const net = require('net');
const matchmaking = require("./matchmakingModule.js");
const objects = require("./objects.js");
const terminal = require("./output.js");
const util = require('util');

const server = net.createServer();
var TablicaGraczy = [];
var DoWylosowania = [];
var TAblicaGier = [5];
for (var i = 0; i < TAblicaGier.length; i++)
	TAblicaGier[i] = new objects.room4;


var NotPlaying;


server.on("connection", function(socket)
{

	TablicaGraczy.push(new objects.client(socket));

	terminal.cli(0, null, null, TAblicaGier);



	socket.on("data", function(data)
	{
		var code = data.toString('utf8', 0, 2);
		var value;

		socket.setKeepAlive(true);
		terminal.FirstRoom(TAblicaGier);

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
				for (var i = 0; i < TAblicaGier.length; i++)
				{
					if(TAblicaGier[i].Socket1.client !== null)
					{
						console.log(util.inspect(TAblicaGier[i].Socket1.client.ip, false, null));
						if (socket.remoteAddress === TAblicaGier[i].Socket1.client.ip)
						{
							TAblicaGier[i].Socket1.Redy = true;
							terminal.cli(2, 1, null, TAblicaGier);
							TAblicaGier[i].redy();
							break;
						}
					}
					if(TAblicaGier[i].Socket2.client !== null)
					{
						if (socket.remoteAddress === TAblicaGier[i].Socket2.client.ip)
						{
							TAblicaGier[i].Socket2.Redy = true;
							terminal.cli(2, 2, null, TAblicaGier);
							TAblicaGier[i].redy();
							break;
						}
					}
					if(TAblicaGier[i].Socket3.client !== null)
					{
						if (socket.remoteAddress === TAblicaGier[i].Socket3.client.ip)
						{
							TAblicaGier[i].Socket3.Redy = true;
							terminal.cli(2, 3, null, TAblicaGier);
							TAblicaGier[i].redy();
							break;
						}
					}
					if(TAblicaGier[i].Socket4.client !== null)
					{
						if (socket.remoteAddress === TAblicaGier[i].Socket4.client.ip)
						{
							TAblicaGier[i].Socket4.Redy = true;
							terminal.cli(2, 4, null, TAblicaGier);
							TAblicaGier[i].redy();
							break;
						}
					}
				}
				
				break;

			case "03":
				let x = null, y = null, last = null, sp = 0;
				ToParse = data.toString('utf8', 2);

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

				terminal.cli(3, value[0], value[1], TAblicaGier);

				break;

		}

	});






});

server.listen(8081, function(){
	console.log("port: 8081, nasluch ");

});




