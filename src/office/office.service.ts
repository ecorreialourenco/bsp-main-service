import {
  OfficeInput,
  OfficeListInput,
  OfficeResponse,
  OfficeResponsePaginated,
} from 'src/graphql.schema';
import { Injectable } from '@nestjs/common';
import { Office } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OfficeService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: number): Promise<Office | null> {
    return this.prisma.office.findUnique({ where: { id } });
  }

  async findAll({
    input: { companyId, offset, limit, sortBy, sortOrder },
  }: {
    input: OfficeListInput;
  }): Promise<OfficeResponsePaginated> {
    const offices = await this.prisma.office.findMany({
      where: { companyId: companyId },
      skip: offset || 0,
      take: limit || 10,
      orderBy: sortBy ? { [sortBy]: sortOrder || 'asc' } : { id: 'asc' },
    });
    const totalCount = await this.prisma.office.count({
      where: { companyId: companyId },
    });

    return { offices, totalCount };
  }

  async create({ input }: { input: OfficeInput }): Promise<OfficeResponse> {
    const office = await this.prisma.office.create({ data: input });

    return { status: 200, office };
  }

  async update({
    id,
    input,
  }: {
    id: number;
    input: OfficeInput;
  }): Promise<OfficeResponse> {
    const office = await this.prisma.office.update({
      where: { id },
      data: input,
    });

    return { status: 200, office };
  }

  async delete(id: number, forceDelete?: boolean): Promise<string> {
    if (forceDelete) {
      await this.prisma.office.delete({ where: { id } });
    } else {
      await this.prisma.office.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
    }

    return 'Office deleted';
  }

  async restore(id: number): Promise<string> {
    await this.prisma.office.delete({ where: { id } });

    return 'Office restored';
  }

  async findByCompanyId(companyId: number): Promise<Office[]> {
    return this.prisma.office.findMany({
      where: { companyId },
    });
  }
}
