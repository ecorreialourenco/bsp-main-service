import { AdminModule } from 'src/admin/admin.module';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';

import { forwardRef, Module } from '@nestjs/common';

import { CompanyPermissionsResolvers } from './companyPermissions.resolvers';
import { CompanyPermissionsService } from './companyPermissions.service';

@Module({
  providers: [CompanyPermissionsResolvers, CompanyPermissionsService],
  imports: [PrismaModule, AuthModule, forwardRef(() => AdminModule)],
  exports: [CompanyPermissionsModule, CompanyPermissionsService],
})
export class CompanyPermissionsModule {}
