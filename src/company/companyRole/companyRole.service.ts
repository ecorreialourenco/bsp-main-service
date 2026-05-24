import {
  CompanyRole,
  CompanyRoleInput,
  CompanyRolesResponsePaginated,
  ListCompanyRolesInput,
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

  async findById(id: string) {
    return await this.prisma.roles.findUnique({ where: { id } });
  }

  async findAll({
    input: { companyId, search, offset, limit, sortBy, sortOrder },
  }: {
    input: ListCompanyRolesInput;
  }): Promise<CompanyRolesResponsePaginated> {
    let filters: {
      where: {
        companyId: string;
        deletedAt: null;
        name?: {
          contains: string;
        };
      };
      take?: number;
      skip?: number;
      orderBy: Record<string, string>;
    } = {
      where: { companyId, deletedAt: null },
      orderBy: sortBy
        ? {
            [sortBy]: sortOrder || 'asc',
          }
        : { id: 'asc' },
    };

    if (search) {
      filters.where.name = {
        contains: search,
      };
    }

    if (limit || offset) {
      filters = {
        ...filters,
        take: limit ?? 10,
        skip: offset ?? 0,
      };
    }

    const roles = await this.prisma.roles.findMany(filters);
    const totalCount = await this.prisma.roles.count({
      where: filters.where,
    });

    return { roles, totalCount };
  }

  async create({ input }: { input: CompanyRoleInput }): Promise<CompanyRole> {
    const newRole = await this.prisma.roles.create({
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
    id: string;
    input: UpdateCompanyRoleInput;
  }): Promise<CompanyRole> {
    return await this.prisma.roles.update({
      where: { id },
      data: input,
    });
  }

  async delete(id: string): Promise<string> {
    await this.prisma.roles.delete({ where: { id } });

    return 'Company role deleted';
  }

  async findByCompanyId(companyId: string): Promise<CompanyRole[]> {
    return await this.prisma.roles.findMany({
      where: { companyId },
    });
  }
}
