import { AdminModule } from 'src/admin/admin.module';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';

import { Module } from '@nestjs/common';

import { CompanyLanguagesResolvers } from './companyLanguages.resolvers';
import { CompanyLanguagesService } from './companyLanguages.service';

@Module({
  providers: [CompanyLanguagesResolvers, CompanyLanguagesService],
  imports: [PrismaModule, AuthModule, AdminModule],
  exports: [CompanyLanguagesService],
})
export class CompanyLanguagesModule {}
