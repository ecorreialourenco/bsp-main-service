import {
  CompanyPermission,
  UpdateCompanyPermissions,
} from 'src/graphql.schema';
import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { MenuService } from 'src/admin/menu.service';
import { CheckPermission } from 'src/auth/decorators/permissions.decorator';

import { CompanyPermissionsService } from './companyPermissions.service';

@Resolver('CompanyPermission')
export class CompanyPermissionsResolvers {
  constructor(
    private readonly companyPermissionsService: CompanyPermissionsService,
    private readonly menuService: MenuService,
  ) {}

  @CheckPermission('company', 'createUpdate')
  @Mutation('updatePermissions')
  async updatePermissions(
    @Args('input') input: UpdateCompanyPermissions[],
  ): Promise<CompanyPermission[]> {
    return await this.companyPermissionsService.update({ input });
  }

  @CheckPermission('companyRole', 'delete')
  @Mutation('removePermissions')
  async removePermissions(@Args('roleId') roleId: string): Promise<string> {
    return await this.companyPermissionsService.delete(roleId);
  }

  @ResolveField('menu')
  async getMenu(@Parent() permission: CompanyPermission) {
    return await this.menuService.findMenuById(permission.menuId);
  }
}
