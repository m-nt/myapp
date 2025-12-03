import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { log } from 'console';
import { Socket } from 'net';

@WebSocketGateway({ transports: ['websocket'] })
export class WsGateway {
	@SubscribeMessage('message')
	handleMessage(client: Socket, payload: any): string {
		log(payload);
		client.emit('message', 'hi too');
		return 'Hello world!';
	}
}
