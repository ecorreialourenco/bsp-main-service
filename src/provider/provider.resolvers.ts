import {
  ProviderListInput,
  Provider,
  ProviderInput,
  ProviderListPaginated,
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

import { ProviderContactsService } from './providerContacts/providerContacts.service';
import { ProviderService } from './provider.service';

@Resolver('Provider')
export class ProviderResolvers {
  private readonly pubSub = new PubSub();
  constructor(
    private readonly providerService: ProviderService,
    private readonly providerContactsService: ProviderContactsService,
  ) {}

  @CheckPermission('provider', 'read')
  @Query('getProvider')
  async getProvider(@Args('id') id: number): Promise<Provider | null> {
    return await this.providerService.findOne(id);
  }

  @CheckPermission('provider', 'read')
  @Query('listProviders')
  async listProviders(
    @Args('input') input: ProviderListInput,
  ): Promise<ProviderListPaginated> {
    return await this.providerService.findAll({ input });
  }

  @CheckPermission('provider', 'createUpdate')
  @Mutation('createProvider')
  async createProvider(@Args('input') input: ProviderInput): Promise<Provider> {
    return await this.providerService.create({ input });
  }

  @CheckPermission('provider', 'createUpdate')
  @Mutation('updateProvider')
  async updateProvider(
    @Args('id') id: number,
    @Args('input') input: ProviderInput,
  ): Promise<Provider> {
    return await this.providerService.update({ id, input });
  }

  @CheckPermission('provider', 'delete')
  @Mutation('removeProvider')
  async removeProvider(
    @Args('id') id: number,
    @Args('forceDelete') forceDelete: boolean,
  ): Promise<string> {
    return await this.providerService.delete({ id, forceDelete });
  }

  @CheckPermission('provider', 'delete')
  @Mutation('restoreProvider')
  async restoreProvider(@Args('id') id: number): Promise<string> {
    return await this.providerService.restore(id);
  }

  @ResolveField('contacts')
  async getContacts(@Parent() provider: Provider) {
    return await this.providerContactsService.findByProviderId({
      providerId: provider.id,
    });
  }
}
