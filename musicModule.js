
const core = require("./main.js");
const net = require('net');
const stream = require('stream');
const fs = require('fs');

var currentStream;

var server = net.createServer();

var TablicaSluchaczy = [];

server.on("connection", function(socket)
{
	TablicaSluchaczy.push(socket);
});

server.listen(8082, function(){
	console.log("Muzyka, port 8082");
});


function play(a)
{

	for (var i = TablicaSluchaczy - 1; i >= 0; i--) 
	{

		switch(a)
		{
			case 1: currentStream = fs.createReadStream('/home/krzysiek/Muzyka/gra/Paluch Strefa Konfortu Instrumental.mp3'); break;
			case 2: currentStream = fs.createReadStream('/home/krzysiek/Muzyka/gra/Paluch Offline Instrumental.mp3'); break;
			case 3: currentStream = fs.createReadStream('/home/krzysiek/Muzyka/gra/Paluch Nagła Śmierć  Instrumental.mp3'); break;
			case 4: currentStream = fs.createReadStream('/home/krzysiek/Muzyka/gra/Paluch Kontur Instrumental.mp3'); break;
			case 5: currentStream = fs.createReadStream('/home/krzysiek/Muzyka/gra/Paluch - Zimne Ognie Instrumental.mp3'); break;
			case 6: currentStream = fs.createReadStream('/home/krzysiek/Muzyka/gra/Paluch - Impuls prod Grrracz Instrumental.mp3'); break;
			case 7: currentStream = fs.createReadStream('/home/krzysiek/Muzyka/gra/Paluch - Biohazard Instrumental.mp3'); break;
			case 8: currentStream = fs.createReadStream('/home/krzysiek/Muzyka/gra/Gedz - Akrofobia prod Grrracz Instrumental.mp3'); break;
			case 9: currentStream = fs.createReadStream('/home/krzysiek/Muzyka/gra/06 Paluch - Mam ten luksus ft Gedz Kobik - Instrumental.mp3'); break;
			case 10: currentStream = fs.createReadStream('/home/krzysiek/Muzyka/gra/03 Paluch - Głod - Instrumental.mp3'); break;

		}

		currentStream.on("data", function(data)
		{
			TablicaSluchaczy[i].write(data);
		});

		currentStream.on("end", function()
		{
			a++;
			if(a==11) a = 1;
			play(a);
		});
	}

}

module.exports = {

	p: play
}