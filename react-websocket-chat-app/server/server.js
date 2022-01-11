const WebSocket = require('ws');

const wss = new WebSocket.Server({port: 5000});
const clients = [];

wss.on('connection', function connection(socket) {
    socket.on('message', function incoming(message) {
        const data = JSON.parse(message);
        socket.send(
            JSON.stringify({
                ...data,
            }),
        )
    });
});