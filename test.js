const net = require('net');
let server = net.createServer();

// server.on("connection", function(socket)
// {




// 	server.listen(8084, function(){
// 		console.log("port: 8084, nasluch ");

// 	});


// 		socket.on('data', function(data)
// 	{
// 		let y = JSON.parse(data.toString().slice(0, -1));
// 		let x = data.toJSON();
// 		console.log(data);
// 		console.log(x.code);
// 		console.log(x);
// 		console.log(y);


// 	});

// });
MapSize = [800, 600];

 let b = Buffer.from(MapSize);

console.log(b);
