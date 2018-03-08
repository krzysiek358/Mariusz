const net = require('net');
const stream = require('stream');
const fs = require('fs');
const objects = require("./objects.js");

//TablicaNieAktywnych = Array();


function matchmaking(TablicaGraczy = Array(), TAblicaGier = [3], DoWylosowania = Array())								//przydzielanie graczy
{
	for (var i = TablicaGraczy.length - 1; i >= 0; i--) //ilu jest do wylosowania
	{
		if(TablicaGraczy[i].play == false)
			DoWylosowania.push(TablicaGraczy[i]);
	}

	if(DoWylosowania.length%4==2 && TAblicaGier[1])
	{

	}
	else if(DoWylosowania.length%4==2)
	{
		var index = TAblicaGier[0].push(new objects.room2(DoWylosowania[0], DoWylosowania[1]));//push zwraca index :)
		TAblicaGier[0][index].start();
		for (var i = TablicaGraczy.length - 1; i >= 0; i--)
		{
			if(TablicaGraczy[i] == DoWylosowania[0])
			{
				TablicaGraczy[i].play = true;	//ten gra to go nie losujmy xD
				TablicaGraczy[i].room = [0, index];
			}

			else if(TablicaGraczy[i] == DoWylosowania[1])
			{
				TablicaGraczy[i].play = true;
				TablicaGraczy[i].room = [0, index];
			}

		}
		DoWylosowania.splice(0, 2);	//wylosowany spieprzaj z kolejki
	}
	else if(DoWylosowania.length%4==3)
	{
		var index = TAblicaGier[1].push(new objects.room3(DoWylosowania[0], DoWylosowania[1], DoWylosowania[2]));
		TAblicaGier[1][index].start();
		for (var i = TablicaGraczy.length - 1; i >= 0; i--)
		{
			if(TablicaGraczy[i] == DoWylosowania[0])
			{
				TablicaGraczy[i].play = true;
				TablicaGraczy[i].room = [1, index];
			}

			else if(TablicaGraczy[i] == DoWylosowania[1])
			{
				TablicaGraczy[i].play = true;
				TablicaGraczy[i].room = [1, index];
			}
			else if(TablicaGraczy[i] == DoWylosowania[2])
			{
				TablicaGraczy[i].play = true;
				TablicaGraczy[i].room = [1, index];
			}
		}
		DoWylosowania.splice(0, 3);
	}
	else if(DoWylosowania.length%4 == 0 && DoWylosowania.length > 4)
	{
		var index = TAblicaGier[2].push(new objects.room4(DoWylosowania[0], DoWylosowania[1], DoWylosowania[2], DoWylosowania[3]));
		TAblicaGier[2][index].start();
		for (var i = TablicaGraczy.length - 1; i >= 0; i--)
		{
			if(TablicaGraczy[i] == DoWylosowania[0])
			{
				TablicaGraczy[i].play = true;
				TablicaGraczy[i].room = [2, index];
			}
			else if(TablicaGraczy[i] == DoWylosowania[1])
			{
				TablicaGraczy[i].play = true;
				TablicaGraczy[i].room = [2, index];
			}
			else if(TablicaGraczy[i] == DoWylosowania[2])
			{
				TablicaGraczy[i].play = true;
				TablicaGraczy[i].room = [2, index];
			}
			else if(TablicaGraczy[i] == DoWylosowania[3])
			{
				TablicaGraczy[i].play = true;
				TablicaGraczy[i].room = [2, index];
			}
		}
		DoWylosowania.splice(0, 4);
	}

};

	// for (var j = TAblicaGier[2].length - 1; j >= 0; j--) //najpierw wypełnia 4 potem 3 i na koncu 2 os
	// {
	// 	if (TAblicaGier[2][j].active == false)
	// 	{
	// 		TablicaNieAktywnych.push(TAblicaGier[2][j]);
	// 	}
	// }
	// for (var j = TAblicaGier[1].length - 1; j >= 0; j--)
	// {
	// 	if (TAblicaGier[1][j].active == false)
	// 	{
	// 		TablicaNieAktywnych.push(TAblicaGier[1][j]);
	// 	}
	// }
	// for (var j = TAblicaGier[0].length - 1; j >= 0; j--)
	// {
	// 	if (TAblicaGier[0][j].active == false)
	// 	{
	// 		TablicaNieAktywnych.push(TAblicaGier[0][j]);
	// 	}

	// }

	// for (var i = 0; i < TablicaNieAktywnych.length; i++)
	// {
	// 	if (TablicaNieAktywnych.Socket4)
	// 	{
	// 		for (var h = TAblicaGier[2].length - 1; h >= 0; h--)
	// 		{
	// 			if(TAblicaGier[2][h]==TablicaNieAktywnych[i])
	// 			{
	// 				TAblicaGier[2][h].active = true;
	// 				TAblicaGier[2][h].Socket1.create({ client: DoWylosowania[0]});
	// 				TAblicaGier[2][h].Socket2.create({ client: DoWylosowania[1]});
	// 				TAblicaGier[2][h].Socket3.create({ client: DoWylosowania[2]});
	// 				TAblicaGier[2][h].Socket4.create({ client: DoWylosowania[3]});
	// 			}
	// 		}
	// 		TablicaNieAktywnych.splice(i, 1);

	// 	}
	// 	else if (TablicaNieAktywnych.Socket3)
	// 	{
	// 		for (var h = TAblicaGier[1].length - 1; h >= 0; h--)
	// 		{
	// 			if(TAblicaGier[1][h]==TablicaNieAktywnych[i])
	// 			{
	// 				TAblicaGier[1][h].active = true;
	// 				TAblicaGier[1][h].Socket1.create({ client: DoWylosowania[0]});
	// 				TAblicaGier[1][h].Socket2.create({ client: DoWylosowania[1]});
	// 				TAblicaGier[1][h].Socket3.create({ client: DoWylosowania[2]});
	// 			}
	// 		}
	// 		TablicaNieAktywnych.splice(i, 1);
	// 	}
	// 	else if (TablicaNieAktywnych.Socket2)
	// 	{
	// 		for (var h = TAblicaGier[0].length - 1; h >= 0; h--)
	// 		{
	// 			if(TAblicaGier[0][h]==TablicaNieAktywnych[i])
	// 			{
	// 				TAblicaGier[0][h].active = true;
	// 				TAblicaGier[0][h].Socket1.create({ client: DoWylosowania[0]});
	// 				TAblicaGier[0][h].Socket2.create({ client: DoWylosowania[1]});
	// 			}
	// 		}
	// 		TablicaNieAktywnych.splice(i, 1);
	// 	}


	// }




module.exports = {
	find: matchmaking
}
