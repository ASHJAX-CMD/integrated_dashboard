import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
  console.log('Client connected');

  ws.on('message', function message(data) {
    console.log('Received:', data);

    // Broadcast received message to all clients
    try {
      const parsedData = JSON.parse(data);
      // Broadcast the data to all connected clients (including the sender)
      wss.clients.forEach((client) => {
        if (client.readyState === client.OPEN) {
          client.send(JSON.stringify(parsedData));
        }
      });
    } catch (error) {
      console.error('Invalid JSON received:', data);
    }
  });

  // Send a welcome message to the new client
  ws.send(JSON.stringify({ message: 'Welcome client!' }));
});
