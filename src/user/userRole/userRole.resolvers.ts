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
  getUserRole(
    @Args('userCompanyId') userCompanyId: string,
  ): Promise<UserRole | null> {
    return this.userRoleService.findByUserId({ userCompanyId });
  }

  @CheckPermission('users', 'createUpdate')
  @Mutation('createUserRole')
  async createUserRole(@Args('input') input: NewUserRole): Promise<UserRole> {
    return await this.userRoleService.create({ input });
  }

  @CheckPermission('users', 'createUpdate')
  @Mutation('createUserRole')
  async changeUserRole(
    @Args('userCompanyId') userCompanyId: string,
    @Args('roleId') roleId: string,
  ): Promise<UserRole> {
    const newRole = await this.userRoleService.updateRole({
      userCompanyId,
      roleId,
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
