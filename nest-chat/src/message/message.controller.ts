import { Body, Controller, Get, Post } from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from 'src/db/message.entity';
import { Group } from 'src/db/group.entity';

@Controller('message')
export class MessageController {
  constructor(private readonly messageServeice: MessageService) {}

  @Get()
  getAll(): Promise<Message[]> {
    return this.messageServeice.findAll();
  }
  @Post('/add')
  add(@Body() { content, name, groupname }: any): Promise<string> {
    return this.messageServeice.add(content, name, groupname);
  }
  @Post('/find')
  findByGroup(@Body() { groupname }: any): Promise<Group> {
    return this.messageServeice.findByGroup(groupname);
  }
}
