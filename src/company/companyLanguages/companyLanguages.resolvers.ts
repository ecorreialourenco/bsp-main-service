import {
  CompanyLanguages,
  CompanyLanguagesInput,
  CompanyLanguagesResponsePaginated,
} from 'src/graphql.schema';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { LanguageService } from 'src/admin/languagues.service';
import { CheckPermission } from 'src/auth/decorators/permissions.decorator';

import { CompanyLanguagesService } from './companyLanguages.service';

@Resolver('CompanyLanguages')
export class CompanyLanguagesResolvers {
  constructor(
    private readonly companyLanguagesService: CompanyLanguagesService,
    private readonly languageService: LanguageService,
  ) {}

  @CheckPermission('company-languages', 'read')
  @Query('listCompanyLanguages')
  async listCompanyLanguagess(
    @Args('companyId') companyId: number,
  ): Promise<CompanyLanguagesResponsePaginated> {
    return await this.companyLanguagesService.findAll({ companyId });
  }

  @CheckPermission('company-languages', 'createUpdate')
  @Mutation('createCompanyLanguages')
  async createCompanyLanguages(
    @Args('input') input: CompanyLanguagesInput,
  ): Promise<CompanyLanguages> {
    return await this.companyLanguagesService.create({ input });
  }

  @CheckPermission('company-languages', 'createUpdate')
  @Mutation('updateCompanyLanguages')
  async updateCompanyLanguages(
    @Args('id') id: number,
    @Args('input') input: CompanyLanguagesInput,
  ): Promise<CompanyLanguages> {
    return await this.companyLanguagesService.update({ id, input });
  }

  @CheckPermission('company-languages', 'delete')
  @Mutation('deleteCompanyLanguages')
  async deleteCompanyLanguages(@Args('id') id: number): Promise<string> {
    return await this.companyLanguagesService.delete(id);
  }

  @ResolveField('name')
  async getLanguageName(@Parent() companyLanguage: CompanyLanguages) {
    return await this.languageService
      .getById({
        id: companyLanguage.languageId,
      })
      .then((res) => res?.name);
  }
}
