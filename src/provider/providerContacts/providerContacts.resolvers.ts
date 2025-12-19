import { CheckPermission } from 'src/auth/decorators/permissions.decorator';
import { ProviderContact, ProviderContactInput } from 'src/graphql.schema';

import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { ProviderContactsService } from './providerContacts.service';

@Resolver('ProviderContacts')
export class ProviderContactsResolvers {
  constructor(
    private readonly providerContactsService: ProviderContactsService,
  ) {}

  @CheckPermission('providers', 'createUpdate')
  @Mutation('createProviderContact')
  async createProviderContact(
    @Args('input') input: ProviderContactInput,
  ): Promise<ProviderContact> {
    return await this.providerContactsService.create({ input });
  }

  @CheckPermission('providers', 'createUpdate')
  @Mutation('updateProviderContact')
  async updateProviderContact(
    @Args('id') id: number,
    @Args('input') input: ProviderContactInput,
  ): Promise<ProviderContact> {
    return await this.providerContactsService.update({ id, input });
  }

  @CheckPermission('providers', 'delete')
  @Mutation('removeProviderContact')
  async removeProviderContact(
    @Args('id') id: number,
    @Args('forceDelete') forceDelete?: boolean,
  ): Promise<string> {
    return await this.providerContactsService.delete({ id, forceDelete });
  }

  @CheckPermission('providers', 'delete')
  @Mutation('restoreProviderContact')
  async restoreProviderContact(@Args('id') id: number): Promise<string> {
    return await this.providerContactsService.delete({ id });
  }
}
