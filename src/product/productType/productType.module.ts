import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';

import { forwardRef, Module } from '@nestjs/common';

import { ProductModule } from '../product.module';
import { ProductTypeResolvers } from './productType.resolvers';
import { ProductTypeService } from './productType.service';

@Module({
  providers: [ProductTypeResolvers, ProductTypeService],
  imports: [PrismaModule, AuthModule, forwardRef(() => ProductModule)],
  exports: [ProductTypeService],
})
export class ProductTypeModule {}
