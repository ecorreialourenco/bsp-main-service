import {
  CompanyRole,
  CompanyRoleInput,
  CompanyRolesResponsePaginated,
} from 'src/graphql.schema';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CheckPermission } from 'src/auth/decorators/permissions.decorator';
import { UserRoleService } from 'src/user/userRole/userRole.service';

import { CompanyPermissionsService } from '../companyPermissions/companyPermissions.service';
import { CompanyRoleService } from './companyRole.service';

@Resolver('CompanyRole')
export class CompanyRoleResolvers {
  constructor(
    private readonly companyRoleService: CompanyRoleService,
    private readonly companyPermissionsService: CompanyPermissionsService,
    private readonly userRoleService: UserRoleService,
  ) {}

  @CheckPermission('company', 'read')
  @Query('listCompanyRoles')
  async listCompanyRoles(
    @Args('companyId') companyId: number,
  ): Promise<CompanyRolesResponsePaginated> {
    return await this.companyRoleService.findAll({ companyId });
  }

  @CheckPermission('company', 'createUpdate')
  @Mutation('createCompanyRole')
  async createCompanyRole(
    @Args('input') input: CompanyRoleInput,
  ): Promise<CompanyRole> {
    return await this.companyRoleService.create({ input });
  }

  @CheckPermission('company', 'createUpdate')
  @Mutation('updateCompanyRole')
  async updateCompanyRole(
    @Args('id') id: number,
    @Args('input') input: CompanyRoleInput,
  ): Promise<CompanyRole> {
    return await this.companyRoleService.update({ id, input });
  }

  @CheckPermission('companyRole', 'delete')
  @Mutation('deleteCompanyRole')
  async deleteCompanyRole(@Args('id') id: number): Promise<string> {
    return await this.companyRoleService.delete(id);
  }

  @ResolveField('employeeCount')
  async getEmployeeCount(@Parent() role: CompanyRole) {
    return await this.userRoleService.countByRole({ companyRoleId: role.id });
  }

  @ResolveField('permissions')
  async getPermissions(@Parent() role: CompanyRole) {
    return await this.companyPermissionsService.findByRoleId(role.id);
  }
}
