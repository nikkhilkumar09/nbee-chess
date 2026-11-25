import http from 'http';
import { Server as SocketIO } from 'socket.io';
import app from './src/app.js';
import { connectDB } from './src/config/db.js';
import { PORT } from './src/config/env.js';
import { registerGameHandlers } from './src/sockets/gameSocket.js';

const httpServer = http.createServer(app);

export const io = new SocketIO(httpServer, {
  cors: { origin: '*' },
});

io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`);
  registerGameHandlers(io, socket);
  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

connectDB().then(() => {
  httpServer.listen(PORT, () => {
    console.log(`NBee Chess server running on port ${PORT}`);
  });
});
