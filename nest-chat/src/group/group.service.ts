import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Group } from 'src/db/group.entity';
@Injectable()
export class GroupService {
  constructor(
    @Inject('GROUP_REPOSITORY')
    private groupRepository: Repository<Group>,
  ) {}

  async findAll(): Promise<Group[]> {
    return this.groupRepository.find({
      relations: {
        users: true,
      },
    });
  }
  async findGroupsByUser(name: string) {
    let groups = await this.groupRepository.find({
      relations: {
        users: true,
      },
    });

    // console.log(JSON.stringify(groups, null, 5));

    let data = [];
    groups.map((group) => {
      let id = group.id;
      let groupname = group.name;

      group.users.map((user) => {
        if (user.name == name) {
          data.push({ id, name: groupname, users: [...group.users] });
        }
      });
    });
    // console.log(JSON.stringify(data, null, 2));
    return data;
  }

  async add(name: string): Promise<string> {
    let newUser = new Group();
    newUser.name = name;
    await this.groupRepository.save(newUser);
    return 'group added';
  }
}
