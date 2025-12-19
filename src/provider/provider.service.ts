import {
  ProviderInput,
  ProviderListInput,
  ProviderListPaginated,
} from 'src/graphql.schema';
import { Injectable } from '@nestjs/common';
import { Provider } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProviderService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: number): Promise<Provider | null> {
    return await this.prisma.provider.findUnique({ where: { id } });
  }

  async findAll({
    input: { companyId, offset, limit, sortBy, sortOrder },
  }: {
    input: ProviderListInput;
  }): Promise<ProviderListPaginated> {
    const providers = await this.prisma.provider.findMany({
      where: {
        companyId,
        deletedAt: null,
      },
      take: limit ?? 10,
      skip: offset ?? 0,
      orderBy: sortBy
        ? {
            [sortBy]: sortOrder || 'asc',
          }
        : { id: 'asc' },
    });
    const totalCount = await this.prisma.provider.count({
      where: { companyId },
    });

    return { providers, totalCount };
  }

  async create({ input }: { input: ProviderInput }): Promise<Provider> {
    return await this.prisma.provider.create({ data: input });
  }

  async update({
    id,
    input,
  }: {
    id: number;
    input: ProviderInput;
  }): Promise<Provider> {
    return await this.prisma.provider.update({
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
      await this.prisma.provider.delete({ where: { id } });
    } else {
      await this.prisma.provider.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
    }

    return 'Provider deleted';
  }

  async restore(id: number): Promise<string> {
    await this.prisma.provider.delete({ where: { id } });

    return 'Provider restored';
  }
}
