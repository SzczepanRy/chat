import { Inject, Injectable } from '@nestjs/common';
import { Group } from 'src/db/group.entity';
import { User } from 'src/db/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('GROUP_REPOSITORY')
    private groupRepository: Repository<Group>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findByGroup(groupname: string): Promise<User[] | undefined> {
    let group = await this.userRepository.find({
      relations: {
        group: true,
      },
      where: {
        group: {
          name: groupname,
        },
      },
    });

    return group;
  }

  async FindUser(){
    //find user thru login 
  }
  

  async add(
    name: string,
    lastname: string,
    groupname: string,
  ): Promise<string> {
    let groupsArr = await this.groupRepository.find();

    let valid = false;
    let validGroup;
    groupsArr.forEach((group) => {
      if (group.name == groupname) {
        valid = true;
        validGroup = group;
      }
    });

    if (valid) {
      let newUser = new User();
      newUser.group = validGroup;
      newUser.name = name;
      newUser.lastname = lastname;
      await this.userRepository.save(newUser);
      return 'user added';
    } else {
      return 'not a valid classname';
    }
  }
}
