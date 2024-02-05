import { Inject, Injectable } from '@nestjs/common';
import { Group } from 'src/db/group.entity';
import { Message } from 'src/db/message.entity';
import { User } from 'src/db/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(
    @Inject('MESSAGE_REPOSITORY')
    private messageRepository: Repository<Message>,
    @Inject('GROUP_REPOSITORY')
    private groupRepository: Repository<Group>,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Message[]> {
    return this.messageRepository.find({
      relations: {
        group: true,
      },
    });
  }
  async findByGroup(groupname: string): Promise<Group> {
    let groupsArr = await this.groupRepository.find({
      relations: {
        message: true,
      },
    });
    let valid = false;
    let validGroup;
    groupsArr.forEach((group) => {
      if (group.name == groupname) {
        valid = true;
        validGroup = group;
      }
    });
    if (valid) {
      return validGroup;
    }
  }

  async add(content: string, name: string, groupname: string): Promise<string> {
    let user = await this.userRepository.find({
      where: {
        name: name,
      },
    });
    let groupsArr = await this.groupRepository.find();
    let valid = false;
    let validGroup;
    groupsArr.forEach((group) => {
      if (group.name == groupname) {
        valid = true;
        validGroup = group;
      }
    });

    if (user && validGroup) {
      console.log(name, content);

      let newMessage = new Message();
      newMessage.group = validGroup;
      newMessage.name = name;
      newMessage.content = content;
      newMessage.date = Date.now();

      await this.messageRepository.save(newMessage);
      return 'message added';
    } else {
      return 'name not found';
    }
  }
}
