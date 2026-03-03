import { PubSub } from 'graphql-subscriptions';
import { AuthModule } from 'src/auth/auth.module';
import { CompanyRoleModule } from 'src/company/companyRole/companyRole.module';
import { PrismaModule } from 'src/prisma/prisma.module';

import { forwardRef, Module } from '@nestjs/common';

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
  imports: [PrismaModule, AuthModule, forwardRef(() => CompanyRoleModule)],
  exports: [UserRoleService],
})
export class UserRoleModule {}
