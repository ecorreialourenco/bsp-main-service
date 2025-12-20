import {
  ProductType,
  ProductTypeInput,
  ProductTypeResponsePaginated,
} from 'src/graphql.schema';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CheckPermission } from 'src/auth/decorators/permissions.decorator';

import { ProductService } from '../product.service';
import { ProductTypeService } from './productType.service';

@Resolver('ProductType')
export class ProductTypeResolvers {
  constructor(
    private readonly productTypeService: ProductTypeService,
    private readonly productService: ProductService,
  ) {}

  @CheckPermission('products', 'read')
  @Query('listProductTypes')
  async listProductTypes(
    @Args('input') input: ProductTypeInput,
  ): Promise<ProductTypeResponsePaginated> {
    return await this.productTypeService.findAll({ input });
  }

  @CheckPermission('products', 'createUpdate')
  @Mutation('createProductType')
  async createProductType(
    @Args('input') input: ProductTypeInput,
  ): Promise<ProductType | null> {
    return await this.productTypeService.create({ input });
  }

  @CheckPermission('products', 'createUpdate')
  @Mutation('updateProductType')
  async updateProductType(
    @Args('id') id: number,
    @Args('input') input: ProductTypeInput,
  ): Promise<ProductType | null> {
    return await this.productTypeService.update({ id, input });
  }

  @CheckPermission('products', 'delete')
  @Mutation('removeProductType')
  async removeProductType(
    @Args('id') id: number,
    @Args('forceDelete') forceDelete?: boolean,
  ): Promise<string> {
    return await this.productTypeService.delete({ id, forceDelete });
  }

  @CheckPermission('products', 'delete')
  @Mutation('restoreProductType')
  async restoreProductType(@Args('id') id: number): Promise<string> {
    return await this.productTypeService.delete({ id });
  }

  @ResolveField('names')
  async getCategories(@Parent() productType: ProductType) {
    return await this.productTypeService.findNamesById({
      id: productType.id,
    });
  }

  @ResolveField('products')
  async getProducts(@Parent() productType: ProductType) {
    return await this.productService.findByProductTypeId({
      productTypeId: productType.id,
    });
  }
}
