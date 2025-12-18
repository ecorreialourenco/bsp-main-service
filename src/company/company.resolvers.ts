import {
  Company,
  CompanyInput,
  CompanyResponse,
  CompanyResponsePaginated,
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
import { OfficeService } from 'src/office/office.service';

import { CompanyRoleService } from './companyRole/companyRole.service';
import { CompanyService } from './company.service';

@Resolver('Company')
export class CompanyResolvers {
  constructor(
    private readonly companyService: CompanyService,
    private readonly officeService: OfficeService,
    private readonly companyRoleService: CompanyRoleService,
  ) {}

  @CheckPermission('company', 'read')
  @Query('getCompany')
  async getCompany(@Args('id') id: number): Promise<Company | null> {
    return await this.companyService.findOne(id);
  }

  @CheckPermission('company', 'read')
  @Query('listCompanies')
  async listCompanies(): Promise<CompanyResponsePaginated> {
    return await this.companyService.findAll();
  }

  @CheckPermission('company', 'createUpdate')
  @Mutation('updateCompany')
  async updateCompany(
    @Args('id') id: number,
    @Args('input') input: CompanyInput,
  ): Promise<CompanyResponse> {
    return await this.companyService.update({ id, input });
  }

  @CheckPermission('company', 'delete')
  @Mutation('deleteCompany')
  async deleteCompany(@Args('id') id: number): Promise<string> {
    return await this.companyService.delete(id);
  }

  @ResolveField('offices')
  async getOffices(@Parent() company: Company) {
    return await this.officeService.findByCompanyId(company.id);
  }

  @ResolveField('roles')
  async getRoles(@Parent() company: Company) {
    return await this.companyRoleService.findByCompanyId(company.id);
  }
}
