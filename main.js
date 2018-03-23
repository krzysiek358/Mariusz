const net = require('net');
const matchmaking = require("./matchmakingModule.js");
const objects = require("./objects.js");
const terminal = require("./output.js");

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
		console.log(datatoString('utf8'));

		switch(code)
		{
			case "01": //conected
				value = data.toString('utf8', 2);

				for (var i = TablicaGraczy.length - 1; i >= 0; i--)
				{
					if(TablicaGraczy[i].client == socket)
						TablicaGraczy[i].name = value;
					matchmaking.find(TablicaGraczy[i], TAblicaGier);
				}

				console.log("dodano");
				break;

			case "02":
				for (var i = TablicaGraczy.length - 1; i >= 0; i--)
				{
					if (socket == TablicaGraczy[i].client)
					{
						TAblicaGier[TablicaGraczy[i].room[0]][TablicaGraczy[i].room[1]].redy(socket);
					}
				}
				console.log("Gotowosc zgloszona");
				break;

			case "03":
				value = [data.toString('utf8', 2, 5), data.toString('utf8', 5)];
				for (var i = TablicaGraczy.length - 1; i >= 0; i--)
				{
					if (socket == TablicaGraczy[i].client)
					{
						TAblicaGier[TablicaGraczy[i].room[0]][TablicaGraczy[i].room[1]].IsBusy(parseInt(value[0]), parseInt(value[1]), socket);
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