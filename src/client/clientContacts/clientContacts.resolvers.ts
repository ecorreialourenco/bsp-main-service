import { CheckPermission } from 'src/auth/decorators/permissions.decorator';
import { ClientContact, ClientContactInput } from 'src/graphql.schema';

import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { ClientContactsService } from './clientContacts.service';

@Resolver('ClientContacts')
export class ClientContactsResolvers {
  constructor(private readonly clientContactsService: ClientContactsService) {}

  @CheckPermission('clients', 'createUpdate')
  @Mutation('createClientContact')
  async createClientContact(
    @Args('input') input: ClientContactInput,
  ): Promise<ClientContact> {
    return await this.clientContactsService.create({ input });
  }

  @CheckPermission('clients', 'createUpdate')
  @Mutation('updateClientContact')
  async updateClientContact(
    @Args('id') id: number,
    @Args('input') input: ClientContactInput,
  ): Promise<ClientContact> {
    return await this.clientContactsService.update({ id, input });
  }

  @CheckPermission('clients', 'delete')
  @Mutation('removeClientContact')
  async removeClientContact(
    @Args('id') id: number,
    @Args('forceDelete') forceDelete?: boolean,
  ): Promise<string> {
    return await this.clientContactsService.delete({ id, forceDelete });
  }

  @CheckPermission('clients', 'delete')
  @Mutation('restoreClientContact')
  async restoreClientContact(@Args('id') id: number): Promise<string> {
    return await this.clientContactsService.delete({ id });
  }
}
