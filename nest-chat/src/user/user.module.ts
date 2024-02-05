import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/db/database.module';
import { UserController } from './user.controller';
import { userProviders } from 'src/db/user.providers';
import { UserService } from './user.service';
import { groupProviders } from 'src/db/group.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...userProviders, ...groupProviders, UserService],
  controllers: [UserController],
})
export class UserModule {}
