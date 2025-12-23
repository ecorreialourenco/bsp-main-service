import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';

import { Module } from '@nestjs/common';

import { ClientDiscountResolvers } from './clientDiscount.resolvers';
import { ClientDiscountService } from './clientDiscount.service';

@Module({
  providers: [ClientDiscountResolvers, ClientDiscountService],
  imports: [PrismaModule, AuthModule],
  exports: [ClientDiscountService],
})
export class ClientDiscountModule {}
