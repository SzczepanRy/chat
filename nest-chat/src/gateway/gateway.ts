import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server } from 'socket.io';
import { MessageService } from 'src/message/message.service';

interface addMessageI {
  content: string;
  name: string;
  groupname: string;
}

@WebSocketGateway({ cors: true })
export class SocketGateway implements OnModuleInit {
  constructor(private messageServeice: MessageService) {}

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', async (socket: any) => {
      console.log('connected');
      console.log(socket.id);

      //this.messageServeice.findAll();
      // get user g
    });
  }

  @SubscribeMessage('loadChat')
  async loadChat(@MessageBody() groupname: string) {
    // let { groupname } = data;
    console.log(groupname);

    let res = await this.messageServeice.findByGroup(groupname);
    this.server.emit('resChat', res);
  }

  @SubscribeMessage('newMessage')
  async onNewMessage(@MessageBody() messageString: string) {
    console.log(messageString);
    let message = JSON.parse(messageString);
    message = JSON.parse(JSON.stringify(message));
    console.log(message);
    let { content, name, groupname } = message;
    console.log(content, name, groupname);

    await this.messageServeice.add(content, name, groupname);
    let res = await this.messageServeice.findByGroup(groupname);

    this.server.emit('resChat', res);
  }
}
