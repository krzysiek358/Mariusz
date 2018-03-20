const net = require('net');
const matchmaking = require("./matchmakingModule.js");
const objects = require("./objects.js");
const terminal = require("./window.js");

var server = net.createServer();
var TablicaGraczy = [];
var DoWylosowania = [];
var TAblicaGier = [Pokoje2os = [new objects.room2], Pokoje3os = Array(), Pokoje4os = Array()];
var NotPlaying;

//setInterval(function () {
//     server.getConnections(function (err, num) {
//         console.log("Lczba graczy: " + num);
//     })
// }, 5000);

terminal.cli();


server.on("connection", function(socket)
{

	TablicaGraczy.push(new objects.client(socket));

	console.log("polonczono");



	socket.on("data", function(data)
	{
		var code = data.toString('utf8', 0, 2);
		var value;
		var border = 0;
		switch(code)
		{
			case "01": //conected
				value = data.toString('utf8', 2);
				for (var i = TablicaGraczy.length - 1; i >= 0; i--)
					if(TablicaGraczy[i].client == socket)
						TablicaGraczy[i].name = value;
				if (border > 3)
				{
					matchmaking.find(TablicaGraczy);
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
		}

	});


	socket.on("error", function() //Usuwanie gracza gdy przestanie grać
	{

		// for (var i = TablicaGraczy.length - 1; i >= 0; i--)
		// {
		// 	if(TablicaGraczy[i] === socket) TablicaGraczy.splice(i, 1);
		// }

		// for (var i = TAblicaGier.length - 1; i >= 0; i--)
		// {
		// 	for (var j = 3; j >= 0; j--)
		// 	{
		// 		if(TAblicaGier[i][j] === socket) TAblicaGier[i][j] = 0;
		// 	}
		// }
	});



});

server.listen(8081, function(){
	console.log("port: 8081, nasluch ");

});




module.exports = {
	Tab: TAblicaGier
}