import {
  ProductCost,
  ProductProvidersInput,
  UpdateProductProvidersPricesInput,
} from 'src/graphql.schema';
import { PrismaService } from 'src/prisma/prisma.service';

import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductProviderService {
  constructor(private prisma: PrismaService) {}

  async createOrRestore({
    input: { productId, providers },
  }: {
    input: ProductProvidersInput;
  }) {
    return this.prisma.$transaction(
      providers.map((p) =>
        this.prisma.productProvider.upsert({
          where: {
            productId_providerId: {
              productId: productId,
              providerId: p.providerId,
            },
          },
          update: {
            deletedAt: null,
            prices: {
              create: {
                price: p.price,
              },
            },
          },
          create: {
            productId,
            providerId: p.providerId,
            prices: {
              create: {
                price: p.price,
              },
            },
          },
          include: {
            prices: {
              orderBy: { createdAt: 'desc' },
              take: 1,
            },
          },
        }),
      ),
    );
  }

  async updatePrice({
    input: { productId, providerId, price },
  }: {
    input: UpdateProductProvidersPricesInput;
  }) {
    return this.prisma.$transaction(async () => {
      const link = await this.prisma.productProvider.upsert({
        where: {
          productId_providerId: { productId, providerId },
        },
        update: { deletedAt: null },
        create: { productId, providerId },
      });

      return this.prisma.productProviderPrices.create({
        data: {
          productProviderId: link.id,
          price: price,
        },
      });
    });
  }

  async getPrice({ productProviderId }: { productProviderId: number }) {
    return this.prisma.productProviderPrices.findMany({
      where: { productProviderId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getProductPrice({
    productId,
  }: {
    productId: number;
  }): Promise<ProductCost[]> {
    const productProviders = await this.prisma.productProvider.findMany({
      where: { productId },
      include: {
        prices: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });

    const providerPrices = await this.prisma.productProviderPrices.findMany({
      where: {
        productProviderId: { in: productProviders.map((pp) => pp.id) },
        deletedAt: null,
      },
      orderBy: { createdAt: 'desc' },
    });

    return providerPrices.map((pp) => ({
      id: pp.id,
      productProviderId: pp.productProviderId,
      price: pp.price,
    }));
  }
}
