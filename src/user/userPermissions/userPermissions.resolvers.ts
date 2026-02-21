import {
  ListUserPermissions,
  UserPermissionsResponse,
} from 'src/graphql.schema';
import { PubSub } from 'graphql-subscriptions';
import { CheckPermission } from 'src/auth/decorators/permissions.decorator';

import { Args, Query, Resolver } from '@nestjs/graphql';

import { UserPermissionsService } from './userPermissions.service';

@Resolver('User')
export class UserPermissionsResolvers {
  private readonly pubSub = new PubSub();
  constructor(private readonly userPermissionService: UserPermissionsService) {}

  @CheckPermission('users', 'read')
  @Query('listUserPermissions')
  async listUsers(
    @Args('input') input: ListUserPermissions,
  ): Promise<UserPermissionsResponse> {
    return await this.userPermissionService.findUserPermissions({ input });
  }
}
