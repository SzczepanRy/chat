import { Module } from '@nestjs/common';

import { GroupController } from './group.controller';
import { groupProviders } from 'src/db/group.providers';
import { GroupService } from './group.service';
import { DatabaseModule } from 'src/db/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...groupProviders, GroupService],
  controllers: [GroupController],
})
export class GroupModule {}
