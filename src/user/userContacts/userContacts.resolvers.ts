import { CheckPermission } from 'src/auth/decorators/permissions.decorator';
import { UserContact, UserContactInput } from 'src/graphql.schema';

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UserContactsService } from './userContacts.service';

@Resolver('UserContacts')
export class UserContactsResolvers {
  constructor(private readonly userContactsService: UserContactsService) {}

  @CheckPermission('users', 'read')
  @Query('listContactTypes')
  listContactTypes(): string[] {
    return this.userContactsService.getContactTypes();
  }

  @CheckPermission('users', 'createUpdate')
  @Mutation('createUserContact')
  async createUserContact(
    @Args('input') input: UserContactInput,
  ): Promise<UserContact> {
    return await this.userContactsService.create({ input });
  }

  @CheckPermission('users', 'createUpdate')
  @Mutation('updateUserContact')
  async updateUserContact(
    @Args('id') id: number,
    @Args('input') input: UserContactInput,
  ): Promise<UserContact> {
    return await this.userContactsService.update({ id, input });
  }

  @CheckPermission('users', 'delete')
  @Mutation('removeUserContact')
  async removeUserContact(@Args('id') id: number): Promise<string> {
    return await this.userContactsService.delete({ id });
  }
}
