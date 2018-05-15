var terminal = require("./output.js");
var UDP = require('./UDPserver.js');
var variables = require('./var.js');

function Keep(x, y, plansza)
{
	plansza[x][y] = true;
}

class ClientClass
{

	constructor(socket)
	{
		this.name = "";
		this.client = socket;
		this.ip = socket.remoteAddress;
		if (this.ip.substr(0, 7) == '::ffff:')
			this.ip = this.ip.substr(7);
	}

}

class Room4Class
{

	constructor()
	{
		this.active = false;
		this.Socket1 =
		{
			num: 1,
			MiejsceStartowe: [400, 560],  //x i y wzglendem dolnego lewego rogu
			Kierunek: 0, //w dół
			Redy:false,
			client: null,
			place: [null, null],
			rotation: 0
		};
		this.Socket2 =
		{
			num: 2,
			MiejsceStartowe: [400, 40],
			Kierunek: 180, //w gore
			Redy:false,
			client: null,
			place: [null, null],
			rotation: 180
		};
		this.Socket3 =
		{
			num: 3,
			MiejsceStartowe: [40, 300],
			Kierunek: 270, //w prawo
			Redy:false,
			client: null,
			place: [null, null],
			rotation: 270
		};
		this.Socket4 =
		{
			num: 4,
			MiejsceStartowe: [760, 300],
			Kierunek: 90, //w lewo
			Redy:false,
			client: null,
			place: [null, null],
			rotation: 90
		};
		this.TablicaWyniku = Array(4);
		this.TablicaWynikow = Array(4);
		this.MapSize = [801, 601];
		this.plansza = Array(this.MapSize[0]);
		for (var i = 0; i < this.plansza.length; i++)
		{
			this.plansza[i] = Array(this.MapSize[1]);
		}
		for (var i = 0; i < this.plansza.length; i++) 
		{
			for (var j = 0; j < this.plansza[i].length; j++) 
			{
				this.plansza[i][j] = false;
			}
		}
	}

	which(socket)
	{
		switch(socket)
		{
			case this.Socket1.client.ip:
				return this.Socket1;
			case this.Socket2.client.ip:
				return this.Socket2;
			case this.Socket3.client.ip:
				return this.Socket3;
			case this.Socket4.client.ip:
				return this.Socket4;
		}
	}
	
//	SrednicaOgona = 6; // px
	start(players)
	{
		if (players == 4)
		{
			this.Socket1.client.client.write(Buffer.from(this.MapSize[0].toString() + " " + this.MapSize[1].toString() + " " + this.Socket1.MiejsceStartowe[0].toString() 
			 + " " + this.Socket1.MiejsceStartowe[1].toString() + " " + this.Socket1.Kierunek.toString()+ " " + players.toString() + " " + this.Socket1.num.toString()), 'utf8');

			this.Socket2.client.client.write(Buffer.from(this.MapSize[0].toString() + " " + this.MapSize[1].toString() + " " + this.Socket2.MiejsceStartowe[0].toString() 
			 + " " + this.Socket2.MiejsceStartowe[1].toString() + " " + this.Socket2.Kierunek.toString()+ " " + players.toString() + " " + this.Socket2.num.toString()), 'utf8');

			this.Socket3.client.client.write(Buffer.from(this.MapSize[0].toString() + " " + this.MapSize[1].toString() + " " + this.Socket3.MiejsceStartowe[0].toString()
			 + " " + this.Socket3.MiejsceStartowe[1].toString() + " " + this.Socket3.Kierunek.toString()+ " " + players.toString() + " " + this.Socket3.num.toString()), 'utf8');

			this.Socket4.client.client.write(Buffer.from(this.MapSize[0].toString() + " " + this.MapSize[1].toString() + " " + this.Socket4.MiejsceStartowe[0].toString()
			 + " " + this.Socket4.MiejsceStartowe[1].toString() + " " + this.Socket4.Kierunek.toString()+ " " + players.toString() + " " + this.Socket4.num.toString()), 'utf8');
		}
		else if (players == 3)
		{
			this.Socket1.client.client.write(Buffer.from(this.MapSize[0].toString() + " " + this.MapSize[1].toString() + " " + this.Socket1.MiejsceStartowe[0].toString()
			 + " " + this.Socket1.MiejsceStartowe[1].toString() + " " + this.Socket1.Kierunek.toString()+ " " + players.toString() + " " + this.Socket1.num.toString()), 'utf8');

			this.Socket2.client.client.write(Buffer.from(this.MapSize[0].toString() + " " + this.MapSize[1].toString() + " " + this.Socket2.MiejsceStartowe[0].toString()
			 + " " + this.Socket2.MiejsceStartowe[1].toString() + " " + this.Socket2.Kierunek.toString()+ " " + players.toString() + " " + this.Socket2.num.toString()), 'utf8');

			this.Socket3.client.client.write(Buffer.from(this.MapSize[0].toString() + " " + this.MapSize[1].toString() + " " + this.Socket3.MiejsceStartowe[0].toString()
			 + " " + this.Socket3.MiejsceStartowe[1].toString() + " " + this.Socket3.Kierunek.toString()+ " " + players.toString() + " " + this.Socket3.num.toString()), 'utf8');
		}
		else if (players == 2)
		{
			this.Socket1.client.client.write(Buffer.from(this.MapSize[0].toString() + " " + this.MapSize[1].toString() + " " + this.Socket1.MiejsceStartowe[0].toString()
			 + " " + this.Socket1.MiejsceStartowe[1].toString() + " " + this.Socket1.Kierunek.toString()+ " " + players.toString() + " " + this.Socket1.num.toString()), 'utf8');

			this.Socket2.client.client.write(Buffer.from(this.MapSize[0].toString() + " " + this.MapSize[1].toString() + " " + this.Socket2.MiejsceStartowe[0].toString()
			 + " " + this.Socket2.MiejsceStartowe[1].toString() + " " + this.Socket2.Kierunek.toString()+ " " + players.toString() + " " + this.Socket2.num.toString()), 'utf8');
		}

	}

	redy(socket)
	{

		if(this.Socket1.Redy == true && this.Socket2.Redy == true &&
		 this.Socket3.Redy == true && this.Socket4.Redy == true)
		{
			console.log("4");
			this.start(4);
		}
		else if (this.Socket1.Redy == true && this.Socket2.Redy == true &&
		 this.Socket3.Redy == true && this.Socket4.client == null) 
		{
			console.log("3");
			this.start(3);
		}
		else if (this.Socket1.Redy == true && this.Socket2.Redy == true &&
		 this.Socket3.client == null && this.Socket4.client == null) 
		{
			console.log("2");
			this.start(2);
		}

	}
	end()
	{

	}

	PositionFree(x, y, socket, rotation)
	{
		var p = this.plansza;
		setTimeout( function ()
		{
			Keep(x, y, p)
		}, 600);
		
		var roomSocket = this.which(socket);
		roomSocket.place = [x, y];
		roomSocket.rotation = rotation;
		var position = `${roomSocket.num} ${x} ${y} ${roomSocket.rotation} 1 `;

		if(this.Socket1.Redy == true && this.Socket2.Redy == true &&
		 this.Socket3.Redy == true && this.Socket4.Redy == true)
		{
			UDP.send(this.Socket1.client.ip, position);
			UDP.send(this.Socket2.client.ip, position);
			UDP.send(this.Socket3.client.ip, position);
			UDP.send(this.Socket4.client.ip, position);
		}
		else if (this.Socket1.Redy == true && this.Socket2.Redy == true &&
		 this.Socket3.Redy == true && this.Socket4.client == null) 
		{
			UDP.send(this.Socket1.client.ip, position);
			UDP.send(this.Socket2.client.ip, position);
			UDP.send(this.Socket3.client.ip, position);
		}
		else if (this.Socket1.Redy == true && this.Socket2.Redy == true &&
		 this.Socket3.client == null && this.Socket4.client == null) 
		{
			UDP.send(this.Socket1.client.ip, position);
			UDP.send(this.Socket2.client.ip, position);
		}
	}

	PositionBusy(x, y, socket, rotation)
	{
		var roomSocket = this.which(socket);
		roomSocket.place = [x, y];
		roomSocket.rotation = rotation;
		var position = `${roomSocket.num} ${x} ${y} ${roomSocket.rotation} 0 `;

		if(this.Socket1.Redy == true && this.Socket2.Redy == true &&
		 this.Socket3.Redy == true && this.Socket4.Redy == true)
		{
			UDP.send(this.Socket1.client.ip, position);
			UDP.send(this.Socket2.client.ip, position);
			UDP.send(this.Socket3.client.ip, position);
			UDP.send(this.Socket4.client.ip, position);
		}
		else if (this.Socket1.Redy == true && this.Socket2.Redy == true &&
		 this.Socket3.Redy == true && this.Socket4.client == null) 
		{
			UDP.send(this.Socket1.client.ip, position);
			UDP.send(this.Socket2.client.ip, position);
			UDP.send(this.Socket3.client.ip, position);
		}
		else if (this.Socket1.Redy == true && this.Socket2.Redy == true &&
		 this.Socket3.client == null && this.Socket4.client == null) 
		{
			UDP.send(this.Socket1.client.ip, position);
			UDP.send(this.Socket2.client.ip, position);
		}
	}

	IsBusy(x, y, socket, rotation)
	{
		console.log(x);
		console.log(y);
		if(this.plansza[x][y] == true)
		{
			if (this.Socket1.client.ip == socket)
				this.lost(x, y, this.Socket1, socket, rotation);
			else if (this.Socket2.client.ip == socket)
				this.lost(x, y, this.Socket2, socket, rotation);
			else if (this.Socket3.client.ip == socket)
				this.lost(x, y, this.Socket3, socket, rotation);
			else
				this.lost(x, y, this.Socket4, socket, rotation);
		}
		else
		{
			this.PositionFree(x, y, socket, rotation);
		}
	}

	lost(x, y, lost, socket, rotation)
	{
		this.TablicaWyniku.push(lost);
		this.PositionBusy(x, y, socket, rotation);
	}
}



module.exports =
{
	client: ClientClass,
	room4: Room4Class,
}
