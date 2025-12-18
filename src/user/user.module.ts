import { PubSub } from 'graphql-subscriptions';
import { AuthModule } from 'src/auth/auth.module';
import { CompanyModule } from 'src/company/company.model';

import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { UserContactsModule } from './userContacts/userContacts.module';
import { UserResolvers } from './user.resolvers';
import { UserService } from './user.service';

@Module({
  providers: [
    UserResolvers,
    UserService,
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
  ],
  imports: [PrismaModule, AuthModule, CompanyModule, UserContactsModule],
})
export class UserModule {}
