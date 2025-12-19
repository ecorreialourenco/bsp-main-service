import {
  ClientListInput,
  Client,
  ClientInput,
  ClientResponsePaginated,
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

import { ClientContactsService } from './clientContacts/clientContacts.service';
import { ClientRolesService } from './clientRoles/clientRoles.service';
import { ClientService } from './client.service';

@Resolver('Client')
export class ClientResolvers {
  private readonly pubSub = new PubSub();
  constructor(
    private readonly clientService: ClientService,
    private readonly clientContactsService: ClientContactsService,
    private readonly clientRolesService: ClientRolesService,
  ) {}

  @CheckPermission('clients', 'read')
  @Query('getClient')
  async getClient(@Args('id') id: number): Promise<Client | null> {
    return await this.clientService.findOne(id);
  }

  @CheckPermission('clients', 'read')
  @Query('listClients')
  async listClients(
    @Args('input') input: ClientListInput,
  ): Promise<ClientResponsePaginated> {
    return await this.clientService.findAll({ input });
  }

  @CheckPermission('clients', 'read')
  @Query('listClientTypes')
  listClientTypes(): string[] {
    return this.clientService.findTypes();
  }

  @CheckPermission('clients', 'createUpdate')
  @Mutation('createClient')
  async createClient(@Args('input') input: ClientInput): Promise<Client> {
    return await this.clientService.create({ input });
  }

  @CheckPermission('clients', 'createUpdate')
  @Mutation('updateClient')
  async updateClient(
    @Args('id') id: number,
    @Args('input') input: ClientInput,
  ): Promise<Client> {
    return await this.clientService.update({ id, input });
  }

  @CheckPermission('clients', 'delete')
  @Mutation('removeClient')
  async removeClient(
    @Args('id') id: number,
    @Args('forceDelete') forceDelete: boolean,
  ): Promise<string> {
    return await this.clientService.delete({ id, forceDelete });
  }

  @CheckPermission('clients', 'delete')
  @Mutation('restoreClient')
  async restoreClient(@Args('id') id: number): Promise<string> {
    return await this.clientService.restore(id);
  }

  @ResolveField('contacts')
  async getContacts(@Parent() client: Client) {
    return await this.clientContactsService.findByClientId({
      clientId: client.id,
    });
  }

  @ResolveField('role')
  async getRole(@Parent() client: Client) {
    return await this.clientRolesService.findOne({
      id: client.companyClientRoleId,
    });
  }
}
