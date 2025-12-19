import { AuthModule } from 'src/auth/auth.module';
import { CompanyPermissionsModule } from 'src/company/companyPermissions/companyPermissions.model';

import { forwardRef, Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { LanguageResolvers } from './language.resolvers';
import { LanguageService } from './languagues.service';
import { MenuResolvers } from './menu.resolvers';
import { MenuService } from './menu.service';

@Module({
  providers: [LanguageResolvers, LanguageService, MenuResolvers, MenuService],
  imports: [
    PrismaModule,
    AuthModule,
    forwardRef(() => CompanyPermissionsModule),
  ],
  exports: [AdminModule, MenuService],
})
export class AdminModule {}
