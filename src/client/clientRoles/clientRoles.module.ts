import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';

import { Module } from '@nestjs/common';

import { ClientDiscountModule } from '../clientDiscount/clientDiscount.module';
import { ClientRolesResolvers } from './clientRoles.resolvers';
import { ClientRolesService } from './clientRoles.service';

@Module({
  providers: [ClientRolesResolvers, ClientRolesService],
  imports: [PrismaModule, AuthModule, ClientDiscountModule],
  exports: [ClientRolesService],
})
export class ClientRolesModule {}
