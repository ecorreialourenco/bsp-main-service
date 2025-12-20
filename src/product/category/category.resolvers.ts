import {
  Category,
  CategoryInput,
  CategoryListInput,
  CategoryResponsePaginated,
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
import { CategoryService } from './category.service';

@Resolver('Category')
export class CategoryResolvers {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly productService: ProductService,
  ) {}

  @CheckPermission('products', 'read')
  @Query('listCategories')
  async listCategories(
    @Args('input') input: CategoryListInput,
  ): Promise<CategoryResponsePaginated> {
    return await this.categoryService.findAll({ input });
  }

  @CheckPermission('products', 'createUpdate')
  @Mutation('createCategory')
  async createCategory(
    @Args('input') input: CategoryInput,
  ): Promise<Category | null> {
    return await this.categoryService.create({ input });
  }

  @CheckPermission('products', 'createUpdate')
  @Mutation('updateCategory')
  async updateCategory(
    @Args('id') id: number,
    @Args('input') input: CategoryInput,
  ): Promise<Category | null> {
    return await this.categoryService.update({ id, input });
  }

  @CheckPermission('products', 'delete')
  @Mutation('removeCategory')
  async removeCategory(
    @Args('id') id: number,
    @Args('forceDelete') forceDelete?: boolean,
  ): Promise<string> {
    return await this.categoryService.delete({ id, forceDelete });
  }

  @CheckPermission('products', 'delete')
  @Mutation('restoreCategory')
  async restoreCategory(@Args('id') id: number): Promise<string> {
    return await this.categoryService.delete({ id });
  }

  @ResolveField('names')
  async getCategories(@Parent() category: Category) {
    return await this.categoryService.findNamesById({
      id: category.id,
    });
  }

  @ResolveField('products')
  async getProducts(@Parent() category: Category) {
    return await this.productService.findByCategoryId({
      categoryId: category.id,
    });
  }
}
