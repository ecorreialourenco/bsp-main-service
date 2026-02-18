import {
  CategoryListInput,
  CategoryResponsePaginated,
  CategoryInput,
  Category,
} from 'src/graphql.schema';
import { PrismaService } from 'src/prisma/prisma.service';

import { Injectable } from '@nestjs/common';
import { CategoryName } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async findAll({
    input: { companyId, ...rest },
  }: {
    input: CategoryListInput;
  }): Promise<CategoryResponsePaginated> {
    const categories = await this.prisma.category.findMany({
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
    const totalCount = await this.prisma.category.count({
      where: { companyId, deletedAt: null },
    });

    return { categories, totalCount };
  }

  async create({ input }: { input: CategoryInput }): Promise<Category | null> {
    const newCategory = await this.prisma.category.create({
      data: {
        companyId: input.companyId,
      },
    });

    if (input.names.length) {
      await this.prisma.categoryName.createMany({
        data: input.names.map((lang) => ({
          name: lang.name,
          companyLanguageId: lang.productLanguagesInput,
          categoryId: newCategory.id,
        })),
      });
    }

    return await this.prisma.category.findUnique({
      where: { id: newCategory.id },
    });
  }

  async update({
    id,
    input,
  }: {
    id: number;
    input: CategoryInput;
  }): Promise<Category | null> {
    await this.prisma.$transaction(
      input.names.map((lang) =>
        this.prisma.categoryName.upsert({
          where: { id },
          update: {
            name: lang.name,
          },
          create: {
            name: lang.name,
            companyLanguageId: lang.productLanguagesInput,
            categoryId: id,
          },
        }),
      ),
    );

    return await this.prisma.category.findUnique({
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
      await this.prisma.category.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
    } else {
      await this.prisma.categoryName.deleteMany({ where: { categoryId: id } });
      await this.prisma.category.delete({ where: { id } });
    }

    return 'Product category deleted';
  }

  async restore({ id }: { id: number }): Promise<string> {
    await this.prisma.category.update({
      where: { id },
      data: { deletedAt: null },
    });

    return 'Product category restored';
  }

  async findByProductId({
    productId,
  }: {
    productId: number;
  }): Promise<Category[]> {
    const productCategories = await this.prisma.productCategory.findMany({
      where: { productId },
    });
    return await this.prisma.category.findMany({
      where: { id: { in: productCategories.map((pc) => pc.categoryId) } },
    });
  }

  async findNamesById({ id }: { id: number }): Promise<CategoryName[]> {
    return await this.prisma.categoryName.findMany({
      where: { categoryId: id },
    });
  }
}
