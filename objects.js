const terminal = require("./output.js");

class ClientClass
{

	constructor(socket)
	{
		this.name = "";
		this.client = socket;
		this.ip = socket.remoteAddress;
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
			place: [null, null]
		};
		this.Socket2 =
		{
			num: 2,
			MiejsceStartowe: [400, 40],
			Kierunek: 180, //w gore
			Redy:false,
			client: null,
			place: [null, null]
		};
		this.Socket3 =
		{
			num: 3,
			MiejsceStartowe: [40, 300],
			Kierunek: 270, //w prawo
			Redy:false,
			client: null,
			place: [null, null]
		};
		this.Socket4 =
		{
			num: 4,
			MiejsceStartowe: [760, 300],
			Kierunek: 90, //w lewo
			Redy:false,
			client: null,
			place: [null, null]
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
			case this.Socket1.client.client:
				return this.Socket1;
			case this.Socket2.client.client:
				return this.Socket2;
			case this.Socket3.client.client:
				return this.Socket3;
			case this.Socket4.client.client:
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
		// else if (this.Socket1.Redy == true && this.Socket2.client == null &&
		//  this.Socket3.client == null && this.Socket4.client == null) 
		// {
		// 	this.Socket1.client.client.write(Buffer.from(this.MapSize[0].toString() + " " + this.MapSize[1].toString()+ " " + this.Socket1.MiejsceStartowe[0].toString()
		// 	 + " " + this.Socket1.MiejsceStartowe[1].toString() + " " + this.Socket1.Kierunek.toString()+ " " + "1" + " " + "1"), 'utf8');
		// 	//pierwsze dwa plansza, następne dwa pozycja startowa, kierunek, liczba graczy, numer gracza
		// }
	}
	end()
	{

	}
	PositionBusy(x, y, socket)
	{

		this.plansza[x][y] = true;
		var roomSocket = this.which(socket);
		roomSocket.place = [x, y];
		var position = `${roomSocket.num} ${x} ${y} `;


		if(this.Socket1.Redy == true && this.Socket2.Redy == true &&
		 this.Socket3.Redy == true && this.Socket4.Redy == true)
		{
			this.Socket1.client.client.write(position);
			this.Socket2.client.client.write(position);
			this.Socket3.client.client.write(position);
			this.Socket4.client.client.write(position);
		}
		else if (this.Socket1.Redy == true && this.Socket2.Redy == true &&
		 this.Socket3.Redy == true && this.Socket4.client == null) 
		{
			this.Socket1.client.client.write(position);
			this.Socket2.client.client.write(position);
			this.Socket3.client.client.write(position);
		}
		else if (this.Socket1.Redy == true && this.Socket2.Redy == true &&
		 this.Socket3.client == null && this.Socket4.client == null) 
		{
			this.Socket1.client.client.write(position);
			this.Socket2.client.client.write(position);
		}
		// else
		// 	this.Socket1.client.client.write(position);

	}

	IsBusy(x, y, socket)
	{
		//terminal.cli( 100, this.plansza[x][y]);

		// if(this.plansza[x][y]==true)
		// {
		// 	// if (this.Socket1.client.ip.address == socket.address().address)
		// 	// 	this.lost(this.Socket1);
		// 	// else if (this.Socket2.client.ip.address == socket.address().address)
		// 	// 	this.lost(this.Socket2);
		// 	// else if (this.Socket3.client.ip.address == socket.address().address)
		// 	// 	this.lost(this.Socket3);
		// 	// else
		// 	// 	this.lost(this.Socket4);
		// }
		// else
		// {
			this.PositionBusy(x, y, socket);
		// }
	}

	lost(client)
	{
		this.TablicaWyniku.push(client);
	}
}

module.exports =
{
	client: ClientClass,
	room4: Room4Class,
}
