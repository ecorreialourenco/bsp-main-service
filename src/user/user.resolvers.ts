import {
  ListUsers,
  User,
  UserInput,
  UserResponse,
  UserResponsePaginated,
} from 'src/graphql.schema';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { CheckPermission } from 'src/auth/decorators/permissions.decorator';
import { CompanyService } from 'src/company/company.service';

import { UserContactsService } from './userContacts/userContacts.service';
import { UserRoleService } from './userRole/userRole.service';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolvers {
  private readonly pubSub = new PubSub();
  constructor(
    private readonly userService: UserService,
    private readonly companyService: CompanyService,
    private readonly userContactsService: UserContactsService,
    private readonly userRoleService: UserRoleService,
  ) {}

  @CheckPermission('users', 'read')
  @Query('getUser')
  async getUser(@Args('id') id: number): Promise<User | null> {
    return await this.userService.findOne(id);
  }

  @CheckPermission('users', 'read')
  @Query('listUsers')
  async listUsers(
    @Args('input') input: ListUsers,
  ): Promise<UserResponsePaginated> {
    return await this.userService.findAll({ input });
  }

  @CheckPermission('users', 'createUpdate')
  @Mutation('createUser')
  async createUser(@Args('input') input: UserInput): Promise<UserResponse> {
    return await this.userService.create({ input });
  }

  @CheckPermission('users', 'createUpdate')
  @Mutation('updateUser')
  async updateUser(
    @Args('id') id: number,
    @Args('input') input: UserInput,
  ): Promise<UserResponse> {
    return await this.userService.update({ id, input });
  }

  @CheckPermission('users', 'delete')
  @Mutation('removeUser')
  async removeUser(
    @Args('id') id: number,
    @Args('forceDelete') forceDelete: boolean,
  ): Promise<string> {
    return await this.userService.delete({ id, forceDelete });
  }

  @CheckPermission('users', 'delete')
  @Mutation('restoreUser')
  async restoreUser(@Args('id') id: number): Promise<string> {
    return await this.userService.restore(id);
  }

  @CheckPermission('users', 'createUpdate')
  @Mutation('changeUserActiveStatus')
  async changeUserActiveStatus(
    @Args('id') id: number,
    @Args('status') status: boolean,
  ): Promise<UserResponse> {
    const newStatus = await this.userService.changeActiveStatus({ id, status });
    await this.pubSub.publish('userStatusChanged', {
      userStatusChanged: newStatus,
    });
    return newStatus;
  }

  @Subscription('userStatusChanged')
  userStatusChanged() {
    return this.pubSub.asyncIterableIterator('userStatusChanged');
  }

  @ResolveField('company')
  async getCompany(@Parent() user: User) {
    return await this.companyService.findOne(user.companyId);
  }

  @ResolveField('contacts')
  async getContacts(@Parent() user: User) {
    return await this.userContactsService.findByUserId({ userId: user.id });
  }

  @ResolveField('role')
  async getRole(@Parent() user: User) {
    return await this.userRoleService.findByUserId({ userId: user.id });
  }
}
