import { Test, TestingModule } from '@nestjs/testing';
import { ChatGateway } from './chat.gateway';

describe('ChatGateway', () => {
  const socket: any = {
    broadcast: {
      emit: jest.fn(() => {
        return socket
      })
    },
    emit: jest.fn(() => {
      return socket
    })
  }
  let gateway: ChatGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatGateway],
    }).compile();

    gateway = module.get<ChatGateway>(ChatGateway);
  });

  it('should broadcast correctly when connect', () => {
    gateway.handleConnection(socket);

    expect(socket.broadcast.emit)
      .toHaveBeenLastCalledWith('change-connected-users', { connected_users: 1 })
    expect(socket.emit)
      .toHaveBeenLastCalledWith('change-connected-users', { connected_users: 1 })
  });

  it('should broadcast correctly when disconnect', () => {
    gateway.handleConnection(socket);
    gateway.handleDisconnect(socket);

    expect(socket.broadcast.emit)
      .toHaveBeenLastCalledWith('change-connected-users', { connected_users: 0 })
  });

  it('should broadcast correctly when new message', () => {
    const data: any = { message: 'Hello World' }

    gateway.handleNewMessage(socket, data)

    expect(socket.broadcast.emit)
      .toHaveBeenLastCalledWith('new-message', data)
  });
});
