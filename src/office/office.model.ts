import { AuthModule } from 'src/auth/auth.module';

import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { OfficeResolvers } from './office.resolvers';
import { OfficeService } from './office.service';

@Module({
  providers: [OfficeResolvers, OfficeService],
  imports: [PrismaModule, AuthModule],
  exports: [OfficeService],
})
export class OfficeModule {}
