import { PubSub } from 'graphql-subscriptions';
import { AuthModule } from 'src/auth/auth.module';
import { CompanyModule } from 'src/company/company.module';

import { forwardRef, Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { UserContactsModule } from './userContacts/userContacts.module';
import { UserRoleModule } from './userRole/userRole.module';
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
  exports: [UserService],
  imports: [
    PrismaModule,
    AuthModule,
    UserContactsModule,
    UserRoleModule,
    forwardRef(() => CompanyModule),
  ],
})
export class UserModule {}
