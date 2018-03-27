const net = require('net');
const matchmaking = require("./matchmakingModule.js");
const objects = require("./objects.js");
const terminal = require("./output.js");
const util = require('util')

var server = net.createServer();
var TablicaGraczy = [];
var DoWylosowania = [];
var TAblicaGier = [5];
for (var i = TAblicaGier.length - 1; i >= 0; i--)
	TAblicaGier[i] = new objects.room4;


var NotPlaying;


terminal.cli();


server.on("connection", function(socket)
{

	TablicaGraczy.push(new objects.client(socket));

	console.log("polonczono");



	socket.on("data", function(data)
	{
		var code = data.toString('utf8', 0, 2);
		var value;

		console.log(code);

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

				console.log("dodano");
				break;

			case "02":
				for (var i = 0; i < TAblicaGier.length; i++)
				{
					if(TAblicaGier[i].Socket1.client !== null)
					{
						if (socket.address().address === TAblicaGier[i].Socket1.client.ip.address)
						{
							TAblicaGier[i].Socket1.Redy = true;
							console.log("1 Gotowosc zgloszona");
							TAblicaGier[i].redy();
							break;
						}
					}
					if(TAblicaGier[i].Socket2.client !== null)
					{
						if (socket.address().address === TAblicaGier[i].Socket2.client.ip.address)
						{
							TAblicaGier[i].Socket2.Redy = true;
							console.log("2 Gotowosc zgloszona");
							TAblicaGier[i].redy();
							break;
						}
					}
					if(TAblicaGier[i].Socket3.client !== null)
					{
						if (socket.address().address === TAblicaGier[i].Socket3.client.ip.address)
						{
							TAblicaGier[i].Socket3.Redy = true;
							console.log("3 Gotowosc zgloszona");
							TAblicaGier[i].redy();
							break;
						}
					}
					if(TAblicaGier[i].Socket4.client !== null)
					{
						if (socket.address().address === TAblicaGier[i].Socket4.client.ip.address)
						{
							TAblicaGier[i].Socket4.Redy = true;
							console.log("4 Gotowosc zgloszona");
							TAblicaGier[i].redy();
							break;
						}
					}
				}
				
				break;

			case "03":
				value = [data.toString('utf8', 2, 5), data.toString('utf8', 5)];

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

				console.log("koordynaty");
				break;

		}

	});






});

server.listen(8081, function(){
	console.log("port: 8081, nasluch ");

});




module.exports = {
	Tab: TAblicaGier,
}

