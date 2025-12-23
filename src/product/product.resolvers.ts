import {
  ProductListInput,
  Product,
  ProductInput,
  ProductResponsePaginated,
  ProductPrice,
  Category,
  ProductType,
  ProductProviderPrice,
} from 'src/graphql.schema';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { CheckPermission } from 'src/auth/decorators/permissions.decorator';

import { CategoryService } from './category/category.service';
import { ProductProviderService } from './productProvider/productProvider.service';
import { ProductTypeService } from './productType/productType.service';
import { ProductService } from './product.service';

@Resolver('Product')
export class ProductResolvers {
  private readonly pubSub = new PubSub();
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
    private readonly productTypeService: ProductTypeService,
    private readonly productProviderService: ProductProviderService,
  ) {}

  @CheckPermission('products', 'read')
  @Query('getProduct')
  async getProduct(@Args('id') id: number): Promise<Product | null> {
    return await this.productService.findOne(id);
  }

  @CheckPermission('products', 'read')
  @Query('listProducts')
  async listProducts(
    @Args('input') input: ProductListInput,
  ): Promise<ProductResponsePaginated> {
    return await this.productService.findAll({ input });
  }

  @CheckPermission('products', 'createUpdate')
  @Mutation('createProduct')
  async createProduct(@Args('input') input: ProductInput): Promise<Product> {
    return await this.productService.create({ input });
  }

  @CheckPermission('products', 'createUpdate')
  @Mutation('updateProduct')
  async updateProduct(
    @Args('id') id: number,
    @Args('input') input: ProductInput,
  ): Promise<Product> {
    return await this.productService.update({ id, input });
  }

  @CheckPermission('products', 'delete')
  @Mutation('removeProduct')
  async removeProduct(
    @Args('id') id: number,
    @Args('forceDelete') forceDelete: boolean,
  ): Promise<string> {
    return await this.productService.delete({ id, forceDelete });
  }

  @CheckPermission('products', 'delete')
  @Mutation('restoreProduct')
  async restoreProduct(@Args('id') id: number): Promise<string> {
    return await this.productService.restore(id);
  }

  @CheckPermission('products', 'delete')
  @Mutation('updateProductPrice')
  async updateProductPrice(
    @Args('productId') productId: number,
    @Args('price') price: number,
    @Args('currency') currency: string,
  ): Promise<ProductPrice> {
    return await this.productService.updatePrice({
      productId,
      price,
      currency,
    });
  }

  @ResolveField('categories')
  async getCategories(@Parent() product: Product): Promise<Category[]> {
    return await this.categoryService.findByProductId({
      productId: product.id,
    });
  }

  @ResolveField('type')
  async getType(@Parent() product: Product): Promise<ProductType | null> {
    return await this.productTypeService.findByTypeId({
      productTypeId: product.productTypeId,
    });
  }

  @ResolveField('price')
  async getPrice(@Parent() product: Product): Promise<number> {
    return await this.productService.getPrice({
      productId: product.id,
    });
  }

  @ResolveField('prices')
  async getPrices(@Parent() product: Product): Promise<ProductPrice[]> {
    return await this.productService.getPrices({
      productId: product.id,
    });
  }

  @ResolveField('costPrices')
  async getCostPrices(
    @Parent() product: Product,
  ): Promise<ProductProviderPrice[]> {
    return await this.productProviderService.getProductPrices({
      productId: product.id,
    });
  }
}
