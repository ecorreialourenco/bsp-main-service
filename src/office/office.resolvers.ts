import {
  Office,
  OfficeInput,
  OfficeListInput,
  OfficeResponse,
  OfficeResponsePaginated,
} from 'src/graphql.schema';
import { CheckPermission } from 'src/auth/decorators/permissions.decorator';

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { OfficeService } from './office.service';

@Resolver('Office')
export class OfficeResolvers {
  constructor(private readonly officeService: OfficeService) {}

  @CheckPermission('offices', 'read')
  @Query('getOffice')
  async getOffice(@Args('id') id: number): Promise<Office | null> {
    return await this.officeService.findOne(id);
  }

  @CheckPermission('offices', 'read')
  @Query('listOffices')
  async listOffices(
    @Args('input') input: OfficeListInput,
  ): Promise<OfficeResponsePaginated> {
    return await this.officeService.findAll({ input });
  }

  @CheckPermission('offices', 'createUpdate')
  @Mutation('createOffice')
  async createOffice(
    @Args('input') input: OfficeInput,
  ): Promise<OfficeResponse> {
    return await this.officeService.create({ input });
  }

  @CheckPermission('offices', 'createUpdate')
  @Mutation('updateOffice')
  async updateOffice(
    @Args('id') id: number,
    @Args('input') input: OfficeInput,
  ): Promise<OfficeResponse> {
    return await this.officeService.update({ id, input });
  }

  @CheckPermission('offices', 'delete')
  @Mutation('deleteOffice')
  async deleteOffice(
    @Args('id') id: number,
    @Args('forceDelete') forceDelete: boolean,
  ): Promise<string> {
    return await this.officeService.delete(id, forceDelete);
  }

  @CheckPermission('offices', 'delete')
  @Mutation('restoreOffice')
  async restoreOffice(@Args('id') id: number): Promise<string> {
    return await this.officeService.delete(id);
  }
}
