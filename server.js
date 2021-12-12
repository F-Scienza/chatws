const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

//  servidor escuchando puerto 8080 de localhost
httpServer.listen(process.env.PORT || 3000, function () {
	console.log('Server running...');
});
//  para probar creamos un array de mensajes que vamos a 
//  enviar cuando se conecte un cliente web
const messages = [
    { author: "Cufa", text: "Hola we!" },
    { author: "Sofi", text: "Hola!! !"  },
    { author: "Pachi", text: "Que onda"  },
    { author: "Sam", text: "guaf guaf"  }
];

//  el servidor de websocket espera la conexion
//  y en emit enviamos el array
io.on('conection', function(socket){
    console.log('un cliente se ha conectado')
    socket.emit('messages', messages)
})

//  indicamos ruta de archivos estaticos
app.use(express.static('public'))