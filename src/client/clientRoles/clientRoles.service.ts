import {
  ClientRoleInput,
  ClientRole,
  ClientRolesListInput,
  ClientRolesPaginated,
} from 'src/graphql.schema';
import { PrismaService } from 'src/prisma/prisma.service';

import { Injectable } from '@nestjs/common';

@Injectable()
export class ClientRolesService {
  constructor(private prisma: PrismaService) {}

  async findOne({ id }: { id: number }): Promise<ClientRole | null> {
    return await this.prisma.companyClientRole.findUnique({
      where: { id },
    });
  }

  async findAll({
    input: { companyId, ...rest },
  }: {
    input: ClientRolesListInput;
  }): Promise<ClientRolesPaginated> {
    const roles = await this.prisma.companyClientRole.findMany({
      where: {
        companyId,
        deletedAt: null,
      },
      take: rest?.limit ?? 10,
      skip: rest?.offset ?? 0,
      orderBy: rest?.sortBy
        ? {
            [rest?.sortBy]: rest?.sortOrder || 'asc',
          }
        : { id: 'asc' },
    });
    const totalCount = await this.prisma.companyClientRole.count({
      where: { companyId, deletedAt: null },
    });

    return { roles, totalCount };
  }

  async create({ input }: { input: ClientRoleInput }): Promise<ClientRole> {
    return await this.prisma.companyClientRole.create({ data: input });
  }

  async update({
    id,
    input,
  }: {
    id: number;
    input: ClientRoleInput;
  }): Promise<ClientRole> {
    return await this.prisma.companyClientRole.update({
      where: { id },
      data: input,
    });
  }

  async delete({
    id,
    forceDelete,
  }: {
    id: number;
    forceDelete?: boolean;
  }): Promise<string> {
    if (forceDelete) {
      await this.prisma.companyClientRole.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
    } else {
      await this.prisma.companyClientRole.delete({ where: { id } });
    }

    return 'Client role deleted';
  }

  async restore({ id }: { id: number }): Promise<string> {
    await this.prisma.companyClientRole.update({
      where: { id },
      data: { deletedAt: null },
    });

    return 'Client role restored';
  }
}
