import { PubSub } from 'graphql-subscriptions';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';

import { Module } from '@nestjs/common';

import { UserPermissionsResolvers } from './userPermissions.resolvers';
import { UserPermissionsService } from './userPermissions.service';

@Module({
  providers: [
    UserPermissionsResolvers,
    UserPermissionsService,
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
  ],
  exports: [UserPermissionsService],
  imports: [PrismaModule, AuthModule],
})
export class UserPermissionsModule {}
