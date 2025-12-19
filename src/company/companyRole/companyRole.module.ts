import { AuthModule } from 'src/auth/auth.module';
import { OfficeModule } from 'src/office/office.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserRoleModule } from 'src/user/userRole/userRole.module';

import { Module } from '@nestjs/common';

import { CompanyPermissionsModule } from '../companyPermissions/companyPermissions.module';
import { CompanyRoleResolvers } from './companyRole.resolvers';
import { CompanyRoleService } from './companyRole.service';

@Module({
  providers: [CompanyRoleResolvers, CompanyRoleService],
  imports: [
    PrismaModule,
    AuthModule,
    OfficeModule,
    CompanyPermissionsModule,
    UserRoleModule,
  ],
  exports: [CompanyRoleService],
})
export class CompanyRoleModule {}
