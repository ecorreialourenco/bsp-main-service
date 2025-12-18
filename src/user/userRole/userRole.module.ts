import { PubSub } from 'graphql-subscriptions';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';

import { Module } from '@nestjs/common';

import { UserRoleResolvers } from './userRole.resolvers';
import { UserRoleService } from './userRole.service';

@Module({
  providers: [
    UserRoleResolvers,
    UserRoleService,
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
  ],
  imports: [PrismaModule, AuthModule],
  exports: [UserRoleService],
})
export class UserRoleModule {}
