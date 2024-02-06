import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/db/user.entity';

interface FindUserI {
  validUser?: User[];
  valid: boolean;
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): Promise<User[]> {
    return this.userService.findAll();
  }
  @Post('/add')
  add(@Body() { name, lastname, groupname }: any): Promise<string> {
    return this.userService.add(name, lastname, groupname);
  }
  @Post('/findByGroup')
  findByGroup(@Body() { groupname }: any): Promise<User[] | undefined> {
    return this.userService.findByGroup(groupname);
  }
  @Post('/findUser')
  findUser(@Body() { name }: any): Promise<FindUserI> {
    return this.userService.FindUser(name);
  }
}
