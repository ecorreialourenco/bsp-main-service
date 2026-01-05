import { PubSub } from 'graphql-subscriptions';
import { CheckPermission } from 'src/auth/decorators/permissions.decorator';
import { NewUserRole, UserRole } from 'src/graphql.schema';

import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';

import { UserRoleService } from './userRole.service';

@Resolver('UserRole')
export class UserRoleResolvers {
  private readonly pubSub = new PubSub();
  constructor(private readonly userRoleService: UserRoleService) {}

  @CheckPermission('users', 'read')
  @Query('getUserRole')
  getUserRole(@Args('userId') userId: number): Promise<UserRole | null> {
    return this.userRoleService.findByUserId({ userId });
  }

  @CheckPermission('users', 'createUpdate')
  @Mutation('createUserRole')
  async createUserRole(@Args('input') input: NewUserRole): Promise<UserRole> {
    return await this.userRoleService.create({ input });
  }

  @CheckPermission('users', 'createUpdate')
  @Mutation('createUserRole')
  async changeUserRole(
    @Args('userId') userId: number,
    @Args('companyRoleId') companyRoleId: number,
  ): Promise<UserRole> {
    const newRole = await this.userRoleService.updateRole({
      userId,
      companyRoleId,
    });

    await this.pubSub.publish('userRoleChanged', { userRole: newRole });

    return newRole;
  }

  @Subscription('userRoleChanged')
  userRoleChanged() {
    return this.pubSub.asyncIterableIterator('userRoleChanged');
  }
}
