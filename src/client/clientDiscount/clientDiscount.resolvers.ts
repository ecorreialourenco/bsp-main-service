import {
  ClientDiscount,
  ClientDiscountInput,
  ListClientDiscountInput,
  ClientDiscountPaginated,
} from 'src/graphql.schema';
import { CheckPermission } from 'src/auth/decorators/permissions.decorator';

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { ClientDiscountService } from './clientDiscount.service';

@Resolver('ClientDicount')
export class ClientDiscountResolvers {
  constructor(private readonly clientDiscountService: ClientDiscountService) {}

  @CheckPermission('company', 'createUpdate')
  @Query('listClientDicount')
  async listClientDicount(
    @Args('input') input: ListClientDiscountInput,
  ): Promise<ClientDiscountPaginated> {
    return await this.clientDiscountService.findAll({ input });
  }

  @CheckPermission('company', 'createUpdate')
  @Mutation('createClientDiscount')
  async createClientDiscount(
    @Args('input') input: ClientDiscountInput,
  ): Promise<ClientDiscount> {
    return await this.clientDiscountService.create({ input });
  }

  @CheckPermission('company', 'createUpdate')
  @Mutation('updateClientDiscount')
  async updateClientDiscount(
    @Args('id') id: number,
    @Args('input') input: ClientDiscountInput,
  ): Promise<ClientDiscount> {
    return await this.clientDiscountService.update({ id, input });
  }

  @CheckPermission('company', 'delete')
  @Mutation('deleteClientDiscount')
  async deleteClientDiscount(
    @Args('id') id: number,
    @Args('forceDelete') forceDelete?: boolean,
  ): Promise<string> {
    return await this.clientDiscountService.delete({ id, forceDelete });
  }

  @CheckPermission('company', 'delete')
  @Mutation('restoreClientDiscount')
  async restoreClientDiscount(@Args('id') id: number): Promise<string> {
    return await this.clientDiscountService.delete({ id });
  }
}
