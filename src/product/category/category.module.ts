import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';

import { forwardRef, Module } from '@nestjs/common';

import { ProductModule } from '../product.module';
import { CategoryResolvers } from './category.resolvers';
import { CategoryService } from './category.service';

@Module({
  providers: [CategoryResolvers, CategoryService],
  imports: [PrismaModule, AuthModule, forwardRef(() => ProductModule)],
  exports: [CategoryService],
})
export class CategoryModule {}
