class ClientClass
{

	constructor(socket)
	{
		this.name = "";
		this.client = socket;
		this.ip = socket.address();
	}

}

class Room4Class
{

	constructor()
	{
		this.active = false;
		this.Socket1 =
		{
			MiejsceStartowe: [400, 560],  //x i y wzglendem dolnego lewego rogu
			Kierunek: 0, //w dół
			Redy:false,
			client: null
		};
		this.Socket2 =
		{
			MiejsceStartowe: [400, 40],
			Kierunek: 180, //w gore
			Redy:false,
			client: null
		};
		this.Socket3 =
		{
			MiejsceStartowe: [40, 300],
			Kierunek: 270, //w prawo
			Redy:false,
			client: null
		};
		this.Socket4 =
		{
			MiejsceStartowe: [760, 300],
			Kierunek: 90, //w lewo
			Redy:false,
			client: null
		},
		this.TablicaWyniku = Array(4);
		this.TablicaWynikow = Array(4);
		this.plansza = Array(800);
		for (var i = 0; i < this.plansza.length; i++)
		{
			this.plansza[i] = Array(600);
		}
	}
	
//	SrednicaOgona = 6; // px
	start(players)
	{
		if (players == 4)
		{
			this.Socket1.client.client.write("800?600?6?400?560?000");//pierwsze dwa plansza, średnica, następne dwa pozycja startowa, kierunek
			this.Socket2.client.client.write("800?600?6?400?040?180");
			this.Socket3.client.client.write("800?600?6?040?300?270");
			this.Socket4.client.client.write("800?600?6?760?300?090");
		}
		else if (players == 3)
		{
			this.Socket1.client.client.write("800?600?6?400?560?000");//pierwsze dwa plansza, średnica, następne dwa pozycja startowa, kierunek
			this.Socket2.client.client.write("800?600?6?400?040?180");
			this.Socket3.client.client.write("800?600?6?040?300?270");
		}
		else if (players == 2)
		{
			this.Socket1.client.client.write("800?600?6?400?560?000");//pierwsze dwa plansza, średnica, następne dwa pozycja startowa, kierunek
			this.Socket2.client.client.write("800?600?6?400?040?180");
		}

	}
	redy(socket)
	{

		if(this.Socket1.Redy == true && this.Socket2.Redy == true &&
		 this.Socket3.Redy == true && this.Socket4.Redy == true)
		{
			this.Socket1.client.client.write("start");
			this.Socket2.client.client.write("start");
			this.Socket3.client.client.write("start");
			this.Socket4.client.client.write("start");
			this.start(4);
		}
		else if (this.Socket1.Redy == true && this.Socket2.Redy == true &&
		 this.Socket3.Redy == true && this.Socket4 == null) 
		{
			this.Socket1.client.client.write("start");
			this.Socket2.client.client.write("start");
			this.Socket3.client.client.write("start");
			this.start(3);
		}
		else if (this.Socket1.Redy == true && this.Socket2.Redy == true &&
		 this.Socket3 == null && this.Socket4 == null) 
		{
			this.Socket1.client.client.write("start");
			this.Socket2.client.client.write("start");
			this.start(2);
		}
	}
	end()
	{

	}
	PositionBusy(x, y, socket)
	{

		this.plansza[x][y] = true;
		if (this.socket1.client.client == socket)
		{
			var position = x.toString() + "?" + y.toString() + "?" + this.socket1.client.name;
			this.socket2.client.client.write(position);
			this.socket3.client.client.write(position);
			this.socket4.client.client.write(position);
		}
		else if (this.socket2.client == socket)
		{
			var position = x.toString() + "?" + y.toString() + "?" + this.socket2.client.name;
			this.socket1.client.client.write(position);
			this.socket3.client.client.write(position);
			this.socket4.client.client.write(position);
		}
		else if (this.socket3.client == socket)
		{
			var position = x.toString() + "?" + y.toString() + "?" + this.socket3.client.name;
			this.socket1.client.client.write(position);
			this.socket2.client.client.write(position);
			this.socket4.client.client.write(position);
		}
		else
		{
			var position = x.toString() + "?" + y.toString() + "?" + this.socket4.client.name;
			this.socket1.client.client.write(position);
			this.socket2.client.client.write(position);
			this.socket3.client.client.write(position);
		}
	}

	IsBusy(x, y, socket)
	{
		if(this.plansza[x][y]==true)
		{
			if (this.socket1.client.client == socket)
				this.lost(this.socket1);
			else if (this.socket2.client.client == socket)
				this.lost(this.socket2);
			else if (this.socket3.client.client == socket)
				this.lost(this.socket3);
			else
				this.lost(this.socket4);
		}
		else
		{
			this.PositionBusy(x, y, socket);
		}
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
