import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {
  ProductProvider,
  ProductProvidersInput,
  UpdateProductProvidersPricesInput,
} from 'src/graphql.schema';
import { CheckPermission } from 'src/auth/decorators/permissions.decorator';

import { ProductProviderService } from './productProvider.service';

@Resolver('ProductProvider')
export class ProductProviderResolvers {
  constructor(
    private readonly productProviderService: ProductProviderService,
  ) {}

  @CheckPermission('products', 'createUpdate')
  @Mutation('createOrRestore')
  async createOrRestore(
    @Args('input') input: ProductProvidersInput,
  ): Promise<ProductProvider[] | null> {
    return await this.productProviderService.createOrRestore({ input });
  }

  @CheckPermission('products', 'createUpdate')
  @Mutation('updateProductProviderPrice')
  async updateProductProviderPrice(
    @Args('input') input: UpdateProductProvidersPricesInput,
  ): Promise<ProductProvider | null> {
    return await this.productProviderService.updatePrice({ input });
  }

  @ResolveField('prices')
  async getPrices(@Parent() productProvider: ProductProvider) {
    return this.productProviderService.getPrice({
      productProviderId: productProvider.id,
    });
  }
}
