import { Response } from 'express';

interface SSEClient {
  id: string;
  userId?: string;
  res: Response;
}

class EventService {
  private clients: Map<string, SSEClient> = new Map();

  // Add SSE Client Connection
  public addClient(userId: string | undefined, res: Response): string {
    const clientId = `client_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    // Set SSE Headers
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*'
    });

    // Send Connection Established Event
    const initialMsg = `data: ${JSON.stringify({
      type: 'CONNECTED',
      message: 'Real-time Server-Sent Events stream connected',
      clientId,
      timestamp: new Date().toISOString()
    })}\n\n`;

    res.write(initialMsg);

    this.clients.set(clientId, { id: clientId, userId, res });

    // Handle Client Disconnect
    res.on('close', () => {
      this.removeClient(clientId);
    });

    return clientId;
  }

  // Remove Client
  public removeClient(clientId: string): void {
    if (this.clients.has(clientId)) {
      this.clients.delete(clientId);
      console.log(`[SSE Service] Client disconnected: ${clientId}`);
    }
  }

  // Broadcast Real-Time Notification Event to All or Specific User
  public broadcastEvent(eventType: string, payload: any, targetUserId?: string): void {
    const eventData = `data: ${JSON.stringify({
      type: eventType,
      payload,
      timestamp: new Date().toISOString()
    })}\n\n`;

    this.clients.forEach((client) => {
      if (!targetUserId || client.userId === String(targetUserId)) {
        client.res.write(eventData);
      }
    });
  }

  // Active Client Count
  public getActiveClientsCount(): number {
    return this.clients.size;
  }
}

export const eventService = new EventService();
