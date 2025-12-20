import { AuthModule } from 'src/auth/auth.module';

import { forwardRef, Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { CategoryModule } from './category/category.module';
import { productProviderModule } from './productProvider/productProvider.module';
import { ProductTypeModule } from './productType/productType.module';
import { ProductResolvers } from './product.resolvers';
import { ProductService } from './product.service';

@Module({
  providers: [ProductResolvers, ProductService],
  imports: [
    PrismaModule,
    AuthModule,
    forwardRef(() => CategoryModule),
    ProductTypeModule,
    productProviderModule,
  ],
  exports: [ProductService],
})
export class ProductModule {}
