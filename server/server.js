import http from 'http';
import { Server as SocketIO } from 'socket.io';
import app from './src/app.js';
import { connectDB } from './src/config/db.js';
import { PORT } from './src/config/env.js';

const httpServer = http.createServer(app);

// Socket.IO — handlers will be wired in the multiplayer phase
export const io = new SocketIO(httpServer, {
  cors: { origin: '*' },
});

io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`);
  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

connectDB().then(() => {
  httpServer.listen(PORT, () => {
    console.log(`ZN Chess server running on port ${PORT}`);
  });
});
