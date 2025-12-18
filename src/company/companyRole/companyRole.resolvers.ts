import {
  CompanyRole,
  CompanyRoleInput,
  CompanyRolesResponsePaginated,
} from 'src/graphql.schema';
import { CheckPermission } from 'src/auth/decorators/permissions.decorator';

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CompanyRoleService } from './companyRole.service';

@Resolver('CompanyRole')
export class CompanyRoleResolvers {
  constructor(private readonly companyRoleService: CompanyRoleService) {}

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

  /*  @ResolveField('employeeCount')
  async getEmployeeCount(@Parent() role: CompanyRole) {
    return await this.companyRoleService.findByCompanyId(company.id);
  } */
}
