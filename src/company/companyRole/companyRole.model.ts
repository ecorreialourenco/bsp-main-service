import { AuthModule } from 'src/auth/auth.module';
import { OfficeModule } from 'src/office/office.model';
import { PrismaModule } from 'src/prisma/prisma.module';

import { Module } from '@nestjs/common';

import { CompanyRoleResolvers } from './companyRole.resolvers';
import { CompanyRoleService } from './companyRole.service';

@Module({
  providers: [CompanyRoleResolvers, CompanyRoleService],
  imports: [PrismaModule, AuthModule, OfficeModule],
  exports: [CompanyRoleService],
})
export class CompanyRoleModule {}
