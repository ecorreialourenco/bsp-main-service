import {
  ProductInput,
  ProductListInput,
  ProductPrice,
  ProductResponsePaginated,
} from 'src/graphql.schema';
import { Injectable } from '@nestjs/common';
import { ProductLanguage, Products } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: number): Promise<Products | null> {
    return await this.prisma.products.findUnique({ where: { id } });
  }

  async findAll({
    input: { companyId, providerId, offset, limit, sortBy, sortOrder },
  }: {
    input: ProductListInput;
  }): Promise<ProductResponsePaginated> {
    const filters: {
      companyId: number;
      id?: { in: number[] };
      deletedAt: null;
    } = {
      companyId,
      deletedAt: null,
    };

    if (providerId) {
      const providerProducts = await this.prisma.productProvider.findMany({
        where: {
          providerId,
          deletedAt: null,
        },
      });

      filters.id = { in: providerProducts.map((pp) => pp.productId) };
    }

    const products = await this.prisma.products.findMany({
      where: filters,
      take: limit ?? 10,
      skip: offset ?? 0,
      orderBy: sortBy
        ? {
            [sortBy]: sortOrder || 'asc',
          }
        : { id: 'asc' },
    });
    const totalCount = await this.prisma.products.count({ where: filters });

    return { products, totalCount };
  }

  async create({ input }: { input: ProductInput }): Promise<Products> {
    const product = await this.prisma.products.create({
      data: {
        ref: input.ref,
        companyId: input.companyId,
        productTypeId: input.productTypeId,
      },
    });

    return product;
  }

  async update({
    id,
    input,
  }: {
    id: number;
    input: ProductInput;
  }): Promise<Products> {
    return await this.prisma.products.update({
      where: { id },
      data: {
        ref: input.ref,
        companyId: input.companyId,
        productTypeId: input.productTypeId,
      },
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
      await this.prisma.products.delete({ where: { id } });
    } else {
      await this.prisma.products.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
    }

    return 'Product deleted';
  }

  async restore(id: number): Promise<string> {
    await this.prisma.products.delete({ where: { id } });

    return 'Product restored';
  }

  async updatePrice({
    productId,
    price,
    currency,
  }: {
    productId: number;
    price: number;
    currency: string;
  }): Promise<ProductPrice> {
    return await this.prisma.productPrice.create({
      data: { productId, price, currency },
    });
  }

  async findByCategoryId({
    categoryId,
  }: {
    categoryId: number;
  }): Promise<Products[]> {
    const productCategories = await this.prisma.productCategory.findMany({
      where: { categoryId },
    });

    return await this.prisma.products.findMany({
      where: { id: { in: productCategories.map((pc) => pc.productId) } },
    });
  }

  async findByProductTypeId({
    productTypeId,
  }: {
    productTypeId: number;
  }): Promise<Products[]> {
    return await this.prisma.products.findMany({ where: { productTypeId } });
  }

  async getPrice({ productId }: { productId: number }): Promise<number> {
    const productPrice = await this.prisma.productPrice.findFirst({
      where: { productId },
      orderBy: { createdAt: 'desc' },
    });

    return productPrice?.price ?? 0;
  }

  async getPrices({
    productId,
  }: {
    productId: number;
  }): Promise<ProductPrice[]> {
    return await this.prisma.productPrice.findMany({
      where: { productId },
    });
  }

  async countProductsByProviderId({
    providerId,
  }: {
    providerId: number;
  }): Promise<number> {
    const products = await this.prisma.productProvider.groupBy({
      by: ['productId'],
      where: { providerId },
    });
    return products.length || 0;
  }

  async getProductLanguages({
    productId,
  }: {
    productId: number;
  }): Promise<ProductLanguage[]> {
    return await this.prisma.productLanguage.findMany({
      where: { productId },
    });
  }
}
