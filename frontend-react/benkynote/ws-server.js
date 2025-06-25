// ws-server.js
const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 1234 });

server.on('connection', (socket, request) => {
    // Asegúrate de que el origen sea permitido
    const origin = request.headers.origin;
    console.log('Conexión desde:', origin);

    if (origin === 'http://localhost:3000') {
        console.log('Conexión permitida desde:', origin);
    } else {
        console.log('Conexión rechazada desde:', origin);
        socket.close(); // Cerrar la conexión si el origen no es permitido
    }

    socket.on('message', (message) => {
        console.log('Mensaje recibido:', message);
        // Procesar el mensaje...
    });

    socket.on('close', () => {
        console.log('Conexión cerrada');
    });
});

console.log('Servidor WebSocket escuchando en ws://localhost:1234');
