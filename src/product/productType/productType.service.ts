import {
  ProductTypeInput,
  ProductType,
  ProductListInput,
  ProductTypeResponsePaginated,
} from 'src/graphql.schema';
import { PrismaService } from 'src/prisma/prisma.service';

import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductTypeService {
  constructor(private prisma: PrismaService) {}

  async findAll({
    input: { companyId, ...input },
  }: {
    input: ProductListInput;
  }): Promise<ProductTypeResponsePaginated> {
    const types = await this.prisma.productType.findMany({
      where: { companyId, deletedAt: null },
      take: input?.limit ?? 10,
      skip: input?.offset ?? 0,
      orderBy: input?.sortBy
        ? {
            [input?.sortBy]: input?.sortOrder || 'asc',
          }
        : { id: 'asc' },
    });
    const totalCount = await this.prisma.productType.count({
      where: { companyId, deletedAt: null },
    });

    return { types, totalCount };
  }

  async create({
    input,
  }: {
    input: ProductTypeInput;
  }): Promise<ProductType | null> {
    const newType = await this.prisma.productType.create({
      data: { companyId: input.companyId },
    });

    if (input.names.length) {
      await this.prisma.productTypeName.createMany({
        data: input.names.map((name) => ({
          name: name.name,
          companyLanguageId: name.companyLanguageId,
          productTypeId: newType.id,
        })),
      });
    }

    return await this.prisma.productType.findUnique({
      where: { id: newType.id },
    });
  }

  async update({
    id,
    input,
  }: {
    id: number;
    input: ProductTypeInput;
  }): Promise<ProductType | null> {
    await this.prisma.$transaction(
      input.names.map((lang) =>
        this.prisma.productTypeName.upsert({
          where: { id },
          update: {
            name: lang.name,
          },
          create: {
            name: lang.name,
            companyLanguageId: lang.companyLanguageId,
            productTypeId: id,
          },
        }),
      ),
    );

    return await this.prisma.productType.findUnique({
      where: { id },
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
      await this.prisma.productType.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
    } else {
      await this.prisma.productTypeName.deleteMany({
        where: { productTypeId: id },
      });
      await this.prisma.productType.delete({ where: { id } });
    }

    return 'Product type deleted';
  }

  async restore({ id }: { id: number }): Promise<string> {
    await this.prisma.productType.update({
      where: { id },
      data: { deletedAt: null },
    });

    return 'Product type restored';
  }

  async findNamesById({ id }: { id: number }): Promise<ProductType[]> {
    return await this.prisma.productTypeName.findMany({
      where: { productTypeId: id },
    });
  }

  async findByTypeId({
    productTypeId,
  }: {
    productTypeId: number;
  }): Promise<ProductType | null> {
    return await this.prisma.productType.findUnique({
      where: { id: productTypeId },
    });
  }
}
