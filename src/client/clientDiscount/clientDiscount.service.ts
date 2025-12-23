import {
  ClientDiscountInput,
  ClientDiscount,
  ListClientDiscountInput,
  ClientDiscountPaginated,
} from 'src/graphql.schema';
import { PrismaService } from 'src/prisma/prisma.service';

import { Injectable } from '@nestjs/common';

@Injectable()
export class ClientDiscountService {
  constructor(private prisma: PrismaService) {}

  async findAll({
    input: { companyClientRoleId, ...rest },
  }: {
    input: ListClientDiscountInput;
  }): Promise<ClientDiscountPaginated> {
    const where: {
      companyClientRoleId: number;
      categoryId?: number;
      productTypeId?: number;
      deletedAt: null;
    } = {
      companyClientRoleId,
      deletedAt: null,
    };

    if (rest.categoryId) {
      where.categoryId = rest.categoryId;
    }
    if (rest.productTypeId) {
      where.productTypeId = rest.productTypeId;
    }

    const discounts = await this.prisma.companyClientDiscount.findMany({
      where,
      take: rest?.limit ?? 10,
      skip: rest?.offset ?? 0,
      orderBy: rest?.sortBy
        ? {
            [rest?.sortBy]: rest?.sortOrder || 'asc',
          }
        : { id: 'asc' },
    });
    const totalCount = await this.prisma.companyClientDiscount.count({ where });

    return { discounts, totalCount };
  }

  async create({
    input,
  }: {
    input: ClientDiscountInput;
  }): Promise<ClientDiscount> {
    return await this.prisma.companyClientDiscount.create({ data: input });
  }

  async update({
    id,
    input,
  }: {
    id: number;
    input: ClientDiscountInput;
  }): Promise<ClientDiscount> {
    return await this.prisma.companyClientDiscount.update({
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
      await this.prisma.companyClientDiscount.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
    } else {
      await this.prisma.companyClientDiscount.delete({ where: { id } });
    }

    return 'Client discount deleted';
  }

  async restore({ id }: { id: number }): Promise<string> {
    await this.prisma.companyClientDiscount.update({
      where: { id },
      data: { deletedAt: null },
    });

    return 'Client discount restored';
  }

  async findByClientRoleId({
    clientRoleId,
  }: {
    clientRoleId: number;
  }): Promise<ClientDiscount[]> {
    return await this.prisma.companyClientDiscount.findMany({
      where: { companyClientRoleId: clientRoleId },
    });
  }
}
