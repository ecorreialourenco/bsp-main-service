import { AuthModule } from 'src/auth/auth.module';
import { OfficeModule } from 'src/office/office.model';

import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { CompanyRoleModule } from './companyRole/companyRole.model';
import { CompanyResolvers } from './company.resolvers';
import { CompanyService } from './company.service';

@Module({
  providers: [CompanyResolvers, CompanyService],
  imports: [PrismaModule, AuthModule, OfficeModule, CompanyRoleModule],
  exports: [CompanyService],
})
export class CompanyModule {}
