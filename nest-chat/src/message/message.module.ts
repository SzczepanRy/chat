import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { DatabaseModule } from 'src/db/database.module';
import { messageProviders } from 'src/db/message.providers';
import { MessageService } from './message.service';
import { userProviders } from 'src/db/user.providers';
import { groupProviders } from 'src/db/group.providers';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...messageProviders,
    ...groupProviders,
    ...userProviders,
    MessageService,
  ],
  controllers: [MessageController],
})
export class MessageModule {}
