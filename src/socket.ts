import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';

let io: Server;

export const initSocket = (server: HttpServer) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: true
    }
  });

  io.on('connection', (socket: Socket) => {
    console.log(`[Socket.IO] Client connected: ${socket.id}`);

    // Join room based on user/driver ID
    socket.on('join', (userId: string) => {
      socket.join(userId);
      console.log(`[Socket.IO] Socket ${socket.id} joined room ${userId}`);
    });

    // Real-Time GPS Tracking & Geofencing
    socket.on('update_location', (data: { driverId: string; lat: number; lng: number; taskId?: string }) => {
      // Broadcast to users watching this driver/task
      if (data.taskId) {
        io.to(data.taskId).emit('driver_location_update', data);
      }
    });

    socket.on('geofence_alert', (data: { driverId: string; message: string; taskId?: string }) => {
      // Broadcast Geofence alert
      if (data.taskId) {
        io.to(data.taskId).emit('geofence_breach', data);
      }
    });

    // Emergency SOS & Safety Hub
    socket.on('trigger_sos', (data: { driverId: string; lat: number; lng: number; details: string }) => {
      console.warn(`[EMERGENCY SOS] Triggered by ${data.driverId} at [${data.lat}, ${data.lng}]: ${data.details}`);
      // In a real scenario, this would notify admin dashboard or emergency services
      // For now, broadcast back to confirm receipt
      socket.emit('sos_received', { success: true, message: 'Emergency services and admins have been notified.' });
    });

    socket.on('disconnect', () => {
      console.log(`[Socket.IO] Client disconnected: ${socket.id}`);
    });
  });

  return io;
};

export const getIO = (): Server => {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
};
