const net = require('net');
var server = net.createServer();

server.on("connection", function(socket)
{




	server.listen(8084, function(){
		console.log("port: 8084, nasluch ");
		
	});


		socket.on('data', function(data)
	{
		var y = JSON.parse(data.toString().slice(0, -1));
		var x = data.toJSON();
		console.log(data);
		console.log(x.code);
		console.log(x);
		console.log(y);


	});

});
