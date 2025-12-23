import {
  ClientDiscount,
  ClientRole,
  ClientRoleInput,
  ClientRolesListInput,
  ClientRolesPaginated,
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

import { ClientDiscountService } from '../clientDiscount/clientDiscount.service';
import { ClientRolesService } from './clientRoles.service';

@Resolver('ClientRoles')
export class ClientRolesResolvers {
  constructor(
    private readonly clientRolesService: ClientRolesService,
    private readonly clientDiscountService: ClientDiscountService,
  ) {}

  @CheckPermission('clients', 'createUpdate')
  @Query('getClientRole')
  async getClientRole(@Args('id') id: number): Promise<ClientRole | null> {
    return await this.clientRolesService.findOne({ id });
  }

  @CheckPermission('clients', 'createUpdate')
  @Query('listClientRoles')
  async listClientRoles(
    @Args('input') input: ClientRolesListInput,
  ): Promise<ClientRolesPaginated> {
    return await this.clientRolesService.findAll({ input });
  }

  @CheckPermission('clients', 'createUpdate')
  @Mutation('createClientRole')
  async createClientRole(
    @Args('input') input: ClientRoleInput,
  ): Promise<ClientRole> {
    return await this.clientRolesService.create({ input });
  }

  @CheckPermission('clients', 'createUpdate')
  @Mutation('updateClientRole')
  async updateClientRole(
    @Args('id') id: number,
    @Args('input') input: ClientRoleInput,
  ): Promise<ClientRole> {
    return await this.clientRolesService.update({ id, input });
  }

  @CheckPermission('clients', 'delete')
  @Mutation('deleteClientRole')
  async deleteClientRole(
    @Args('id') id: number,
    @Args('forceDelete') forceDelete?: boolean,
  ): Promise<string> {
    return await this.clientRolesService.delete({ id, forceDelete });
  }

  @CheckPermission('clients', 'delete')
  @Mutation('restoreClientRole')
  async restoreClientRole(@Args('id') id: number): Promise<string> {
    return await this.clientRolesService.delete({ id });
  }

  @ResolveField('discounts')
  async getDiscounts(
    @Parent() clientRole: ClientRole,
  ): Promise<ClientDiscount[]> {
    return await this.clientDiscountService.findByClientRoleId({
      clientRoleId: clientRole.id,
    });
  }
}
