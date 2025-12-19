import {
  CompanyPermission,
  CompanyPermissionInput,
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
  @Mutation('createPermissions')
  async createPermissions(
    @Args('input') input: CompanyPermissionInput,
  ): Promise<CompanyPermission[]> {
    return await this.companyPermissionsService.create({ input });
  }

  @CheckPermission('company', 'createUpdate')
  @Mutation('updatePermissions')
  async updatePermissions(
    @Args('input') input: UpdateCompanyPermissions[],
  ): Promise<CompanyPermission[]> {
    return await this.companyPermissionsService.update({ input });
  }

  @CheckPermission('companyRole', 'delete')
  @Mutation('removePermissions')
  async removePermissions(@Args('id') id: number): Promise<string> {
    return await this.companyPermissionsService.delete(id);
  }

  @ResolveField('menu')
  async getMenu(@Parent() permission: CompanyPermission) {
    return await this.menuService.findMenuById(permission.menuId);
  }
}
