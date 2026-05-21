import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AiGateway {
  @WebSocketServer()
  server!: Server;

  broadcastInsight(encounterId: string, result: any) {
    this.server.emit('AI_INSIGHT_READY', {
      encounterId,
      data: result,
    });
  }
}
