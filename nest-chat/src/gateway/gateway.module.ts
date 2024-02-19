import { Module } from '@nestjs/common';
import { SocketGateway } from './gateway';
import { MessageModule } from 'src/message/message.module';
import { MessageService } from 'src/message/message.service';
import { userProviders } from 'src/db/user.providers';
import { groupProviders } from 'src/db/group.providers';
import { messageProviders } from 'src/db/message.providers';
import { DatabaseModule } from 'src/db/database.module';

@Module({
  imports: [MessageModule, DatabaseModule],
  providers: [
    ...messageProviders,
    ...groupProviders,
    ...userProviders,
    SocketGateway,
    MessageService,
  ],
})
export class GatewayModule {
  constructor(private messageService: MessageService) {}
}
