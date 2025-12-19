import {
  ClientInput,
  ClientListInput,
  ClientResponsePaginated,
} from 'src/graphql.schema';
import { Injectable } from '@nestjs/common';
import { Client, ClientType } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: number): Promise<Client | null> {
    return await this.prisma.client.findUnique({ where: { id } });
  }

  async findAll({
    input: { companyId, offset, limit, sortBy, sortOrder },
  }: {
    input: ClientListInput;
  }): Promise<ClientResponsePaginated> {
    const clients = await this.prisma.client.findMany({
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
    const totalCount = await this.prisma.client.count({ where: { companyId } });

    return { clients, totalCount };
  }

  findTypes(): string[] {
    return Object.values(ClientType);
  }

  async create({ input }: { input: ClientInput }): Promise<Client> {
    return await this.prisma.client.create({ data: input });
  }

  async update({
    id,
    input,
  }: {
    id: number;
    input: ClientInput;
  }): Promise<Client> {
    return await this.prisma.client.update({
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
      await this.prisma.client.delete({ where: { id } });
    } else {
      await this.prisma.client.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
    }

    return 'Client deleted';
  }

  async restore(id: number): Promise<string> {
    await this.prisma.client.delete({ where: { id } });

    return 'Client restored';
  }
}
