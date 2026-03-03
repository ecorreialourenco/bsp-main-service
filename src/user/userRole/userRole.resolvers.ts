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
import { CompanyRoleService } from 'src/company/companyRole/companyRole.service';
import { NewUserRole, UserRole } from 'src/graphql.schema';

import { UserRoleService } from './userRole.service';

@Resolver('UserRole')
export class UserRoleResolvers {
  private readonly pubSub = new PubSub();
  constructor(
    private readonly userRoleService: UserRoleService,
    private readonly companyRoleService: CompanyRoleService,
  ) {}

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

  @ResolveField('name')
  async getRole(@Parent() userRole: UserRole) {
    return await this.companyRoleService
      .findById(userRole.id)
      .then((res) => res?.name ?? '');
  }
}
