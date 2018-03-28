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
		};
		this.TablicaWyniku = Array(4);
		this.TablicaWynikow = Array(4);
		this.MapSize = [800, 600];
		this.plansza = Array(this.MapSize[0]);
		for (var i = 0; i < this.plansza.length; i++)
		{
			this.plansza[i] = Array(this.MapSize[1]);
		}
	}
	
//	SrednicaOgona = 6; // px
	start(players)
	{
		if (players == 4)
		{
			this.Socket1.client.client.write(Buffer.from(this.MapSize)); //wysyłanie wielkości planszy
			this.Socket2.client.client.write(Buffer.from(this.MapSize));
			this.Socket3.client.client.write(Buffer.from(this.MapSize));
			this.Socket4.client.client.write(Buffer.from(this.MapSize));
		}
		else if (players == 3)
		{
			this.Socket1.client.client.write(Buffer.from(this.MapSize)); //wysyłanie wielkości planszy
			this.Socket2.client.client.write(Buffer.from(this.MapSize));
			this.Socket3.client.client.write(Buffer.from(this.MapSize));
		}
		else if (players == 2)
		{
			this.Socket1.client.client.write(Buffer.from(this.MapSize)); //wysyłanie wielkości planszy
			this.Socket2.client.client.write(Buffer.from(this.MapSize));
		}

	}
	redy(socket)
	{
		
		console.log(this.Socket1.Redy);
		console.log(this.Socket2.Redy);


		if(this.Socket1.Redy == true && this.Socket2.Redy == true &&
		 this.Socket3.Redy == true && this.Socket4.Redy == true)
		{
			this.start(4);
		}
		else if (this.Socket1.Redy == true && this.Socket2.Redy == true &&
		 this.Socket3.Redy == true && this.Socket4.client == null) 
		{
			this.start(3);
		}
		else if (this.Socket1.Redy == true && this.Socket2.Redy == true &&
		 this.Socket3.client == null && this.Socket4.client == null) 
		{
			this.start(2);
		}
	}
	end()
	{

	}
	PositionBusy(x, y, socket)
	{

		this.plansza[x][y] = true;
		if (this.Socket1.client.client == socket)
		{
			var position = x.toString() + "?" + y.toString() + "?" + this.Socket1.client.name;
			this.Socket2.client.client.write(position);
			this.Socket3.client.client.write(position);
			this.Socket4.client.client.write(position);
		}
		else if (this.Socket2.client == socket)
		{
			var position = x.toString() + "?" + y.toString() + "?" + this.Socket2.client.name;
			this.Socket1.client.client.write(position);
			this.Socket3.client.client.write(position);
			this.Socket4.client.client.write(position);
		}
		else if (this.Socket3.client == socket)
		{
			var position = x.toString() + "?" + y.toString() + "?" + this.Socket3.client.name;
			this.Socket1.client.client.write(position);
			this.Socket2.client.client.write(position);
			this.Socket4.client.client.write(position);
		}
		else
		{
			var position = x.toString() + "?" + y.toString() + "?" + this.Socket4.client.name;
			this.Socket1.client.client.write(position);
			this.Socket2.client.client.write(position);
			this.Socket3.client.client.write(position);
		}
	}

	IsBusy(x, y, socket)
	{
		if(this.plansza[x][y]==true)
		{
			if (this.Socket1.client.ip.address == socket.address().address)
				this.lost(this.Socket1);
			else if (this.Socket2.client.ip.address == socket.address().address)
				this.lost(this.Socket2);
			else if (this.Socket3.client.ip.address == socket.address().address)
				this.lost(this.Socket3);
			else
				this.lost(this.Socket4);
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
