import {
  CompaniesListInput,
  CompanyInput,
  CompanyResponsePaginated,
} from 'src/graphql.schema';
import { Injectable } from '@nestjs/common';
import { Company } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string): Promise<Company | null> {
    return this.prisma.company.findUnique({ where: { id } });
  }

  async findAll({
    input,
  }: {
    input: CompaniesListInput;
  }): Promise<CompanyResponsePaginated> {
    const companies = await this.prisma.company.findMany({
      skip: input?.offset || 0,
      take: input?.limit || 10,
      orderBy: input?.sortBy
        ? { [input?.sortBy]: input?.sortOrder || 'asc' }
        : { id: 'asc' },
    });
    const totalCount = await this.prisma.company.count();

    return { companies, totalCount };
  }

  async update({
    id,
    input,
  }: {
    id: string;
    input: CompanyInput;
  }): Promise<Company> {
    return await this.prisma.company.update({
      where: { id },
      data: input,
    });
  }

  async delete(id: string): Promise<string> {
    await this.prisma.company.delete({ where: { id } });

    return 'Company deleted';
  }
}
