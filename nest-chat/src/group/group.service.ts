import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Group } from 'src/db/group.entity';
@Injectable()
export class GroupService {
  constructor(
    @Inject('GROUP_REPOSITORY')
    private userRepository: Repository<Group>,
  ) {}

  async findAll(): Promise<Group[]> {
    return this.userRepository.find({
      relations: {
        users: true,
      },
    });
  }

  async add(name: string): Promise<string> {
    let newUser = new Group();
    newUser.name = name;
    await this.userRepository.save(newUser);
    return 'group added';
  }
}
