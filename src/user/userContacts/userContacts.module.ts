import { PubSub } from 'graphql-subscriptions';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';

import { Module } from '@nestjs/common';

import { UserContactsResolvers } from './userContacts.resolvers';
import { UserContactsService } from './userContacts.service';

@Module({
  providers: [
    UserContactsResolvers,
    UserContactsService,
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
  ],
  imports: [PrismaModule, AuthModule],
  exports: [UserContactsService],
})
export class UserContactsModule {}
