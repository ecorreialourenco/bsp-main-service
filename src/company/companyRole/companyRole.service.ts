import {
  CompanyRole,
  CompanyRoleInput,
  CompanyRolesResponsePaginated,
  UpdateCompanyRoleInput,
} from 'src/graphql.schema';
import { PrismaService } from 'src/prisma/prisma.service';

import { Injectable } from '@nestjs/common';

import { CompanyPermissionsService } from '../companyPermissions/companyPermissions.service';

@Injectable()
export class CompanyRoleService {
  constructor(
    private prisma: PrismaService,
    private companyPermissionsService: CompanyPermissionsService,
  ) {}

  async findAll({
    companyId,
  }: {
    companyId: number;
  }): Promise<CompanyRolesResponsePaginated> {
    const roles = await this.prisma.companyRoles.findMany({
      where: { companyId },
    });
    const totalCount = await this.prisma.companyRoles.count({
      where: { companyId },
    });

    return { roles, totalCount };
  }

  async create({ input }: { input: CompanyRoleInput }): Promise<CompanyRole> {
    const newRole = await this.prisma.companyRoles.create({
      data: input,
    });

    await this.companyPermissionsService.createPermissionsForNewRole(
      newRole.id,
    );

    return newRole;
  }

  async update({
    id,
    input,
  }: {
    id: number;
    input: UpdateCompanyRoleInput;
  }): Promise<CompanyRole> {
    return await this.prisma.companyRoles.update({
      where: { id },
      data: input,
    });
  }

  async delete(id: number): Promise<string> {
    await this.prisma.companyRoles.delete({ where: { id } });

    return 'Company role deleted';
  }

  async findByCompanyId(companyId: number): Promise<CompanyRole[]> {
    return await this.prisma.companyRoles.findMany({
      where: { companyId },
    });
  }
}
