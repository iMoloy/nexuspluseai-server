import { eventService } from '../src/services/event.service';

const runSSETests = async () => {
  console.log('=== Starting Server-Sent Events (SSE) & Live Notification Tests ===');

  let writtenData: string[] = [];

  // Mock Express Response object for SSE
  const mockResponse: any = {
    writeHead: (status: number, headers: any) => {
      console.log(`✓ SSE Headers set: Status ${status}, Content-Type: ${headers['Content-Type']}`);
    },
    write: (data: string) => {
      writtenData.push(data);
    },
    on: (event: string, callback: Function) => {}
  };

  // 1. Add Client to SSE Stream
  const clientId = eventService.addClient('user_12345', mockResponse);
  console.log('✓ SSE Client registered. ID:', clientId);
  console.log('✓ Initial Connection Event Data:', writtenData[0].trim());

  // 2. Broadcast Escrow Notification Event
  const escrowNotificationPayload = {
    amount: 300,
    referenceId: 'gig_999',
    message: 'Escrow Funds Locked for Gig Project'
  };

  eventService.broadcastEvent('ESCROW_LOCKED', escrowNotificationPayload, 'user_12345');
  console.log('✓ Broadcast Event Sent to Client. Received Data:', writtenData[1].trim());

  // 3. Cleanup Client Connection
  eventService.removeClient(clientId);
  console.log('✓ Client connection cleaned up. Remaining active clients:', eventService.getActiveClientsCount());

  if (writtenData.length >= 2 && writtenData[1].includes('ESCROW_LOCKED')) {
    console.log('✅ Server-Sent Events (SSE) & Live Notifications Tests Passed 100% Successfully!');
  } else {
    console.error('❌ SSE Broadcast test failed');
    process.exit(1);
  }
};

runSSETests();
