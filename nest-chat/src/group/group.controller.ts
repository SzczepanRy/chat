import { Body, Controller, Get, Post } from '@nestjs/common';
import { GroupService } from './group.service';
import { Group } from 'src/db/group.entity';

@Controller('group')
export class GroupController {
  constructor(private readonly groupServeice: GroupService) {}

  @Get()
  getAll(): Promise<Group[]> {
    return this.groupServeice.findAll();
  }
  @Post('/add')
  add(@Body() { name }: any): Promise<string> {
    return this.groupServeice.add(name);
  }
  @Post('/findGroupsByUser')
  findGroupsByUser(@Body() { name }: any) {
    return this.groupServeice.findGroupsByUser(name);
  }
}
