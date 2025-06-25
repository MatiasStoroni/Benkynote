// pages/api/socket.js
import { Server } from 'ws';

const WebSocketServer = (req, res) => {
    if (req.method === 'GET') {
        // Solo permitimos conexiones WebSocket
        res.socket.server.wss = res.socket.server.wss || new Server({ noServer: true });

        res.socket.server.on('upgrade', (request, socket, head) => {
            res.socket.server.wss.handleUpgrade(request, socket, head, (ws) => {
                res.socket.server.wss.emit('connection', ws, request);
            });
        });

        // Maneja las conexiones de los clientes
        res.socket.server.wss.on('connection', (ws) => {
            console.log('Cliente conectado');
            
            // Maneja el mensaje recibido de un cliente
            ws.on('message', (message) => {
                console.log('Mensaje recibido:', message);

                // Envía el mensaje a todos los clientes conectados
                res.socket.server.wss.clients.forEach(client => {
                    if (client !== ws && client.readyState === client.OPEN) {
                        client.send(message);
                    }
                });
            });

            // Maneja la desconexión del cliente
            ws.on('close', () => {
                console.log('Cliente desconectado');
            });
        });
        
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('WebSocket server is running');
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default WebSocketServer;
