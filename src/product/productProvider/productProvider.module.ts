import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';

import { forwardRef, Module } from '@nestjs/common';

import { ProductModule } from '../product.module';
import { ProductProviderResolvers } from './productProvider.resolvers';
import { ProductProviderService } from './productProvider.service';

@Module({
  providers: [ProductProviderResolvers, ProductProviderService],
  imports: [PrismaModule, AuthModule, forwardRef(() => ProductModule)],
  exports: [ProductProviderService],
})
export class productProviderModule {}
