import { SubscribeMessage, WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, MessageBody } from '@nestjs/websockets'
import { Socket } from 'socket.io'

export interface MessageEventData {
  user_name: string;
  message_text: string;
}

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private connectedUsers = 0

  public handleConnection(client: Socket) {
    this.connectedUsers++
    client.broadcast.emit('change-connected-users', { connected_users: this.connectedUsers})
    client.emit('change-connected-users', { connected_users: this.connectedUsers})
  }

  public handleDisconnect(client: Socket) {
    this.connectedUsers--
    client.broadcast.emit('change-connected-users', { connected_users: this.connectedUsers})
  }

  @SubscribeMessage('new-message')
  public handleNewMessage(client: Socket, data: MessageEventData) {
    client.broadcast.emit('new-message', data)
  }
}
