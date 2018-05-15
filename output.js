

var LastTab;


function write(state, value1, value2, tab)
{
	// console.clear();

	// switch(state)
	// {
	// 	case 0:
	// 		console.log("Nowe połączenie");
	// 	break;
	// 	case 1:
	// 		console.log("Nazwa gracza: " + value1);
	// 	break;
	// 	case 2:
	// 		console.log("Gotowość gracza: " + value1 + " zgłoszona");
	// 	break;
	// 	case 3:
	// 		console.log("Koordynaty");
	// 		console.log("x = " + value1);
	// 		console.log("y = " + value2);
	// 	break
	// 	default:
	// 		console.log(value1);
	// 		if(value2)
	// 			console.log(value2);
	// 	break;
	// }
	// console.log("\n");

	// FirstRoom(tab);

}

function FirstRoom(tab)
{

	// var room = tab[0];

	// var out =
	// {
	// 	Room: `Status pokoju: ${room.active}`,
	// 	Player1: `Status: ${(room.Socket1.client == null) ? 'NULL' : 'Online'}   |   Gotowość: ${room.Socket1.Redy}   |   X / Y: ${room.Socket1.place[0]} / ${room.Socket1.place[1]}   |   IP: ${(room.Socket1.client == null) ? 'NULL' : room.Socket1.client.ip}`,
	// 	Player2: `Status: ${(room.Socket2.client == null) ? 'NULL' : 'Online'}   |   Gotowość: ${room.Socket2.Redy}   |   X / Y: ${room.Socket2.place[0]} / ${room.Socket2.place[1]}   |   IP: ${(room.Socket2.client == null) ? 'NULL' : room.Socket2.client.ip}`,
	// 	Player3: `Status: ${(room.Socket3.client == null) ? 'NULL' : 'Online'}   |   Gotowość: ${room.Socket3.Redy}   |   X / Y: ${room.Socket3.place[0]} / ${room.Socket3.place[1]}   |   IP: ${(room.Socket3.client == null) ? 'NULL' : room.Socket3.client.ip}`,
	// 	Player4: `Status: ${(room.Socket4.client == null) ? 'NULL' : 'Online'}   |   Gotowość: ${room.Socket4.Redy}   |   X / Y: ${room.Socket4.place[0]} / ${room.Socket4.place[1]}   |   IP: ${(room.Socket4.client == null) ? 'NULL' : room.Socket4.client.ip}`,
	// }


	// 	console.log(out.Room);
	// 	console.log("-----------------------------------------------------------------------");
	// 	console.log(out.Player1);
	// 	console.log("-----------------------------------------------------------------------");
	// 	console.log(out.Player2);
	// 	console.log("-----------------------------------------------------------------------");
	// 	console.log(out.Player3);
	// 	console.log("-----------------------------------------------------------------------");
	// 	console.log(out.Player4);
	// 	console.log("-----------------------------------------------------------------------");
	


}


module.exports = 
{
    cli: write,
    FirstRoom: FirstRoom
};