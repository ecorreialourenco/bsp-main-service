import {
  CompanyInput,
  CompanyResponse,
  CompanyResponsePaginated,
} from 'src/graphql.schema';
import { Injectable } from '@nestjs/common';
import { Company } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: number): Promise<Company | null> {
    return this.prisma.company.findUnique({ where: { id } });
  }

  async findAll(): Promise<CompanyResponsePaginated> {
    const companies = await this.prisma.company.findMany();
    const totalCount = await this.prisma.company.count();

    return { companies, totalCount };
  }

  async update({
    id,
    input,
  }: {
    id: number;
    input: CompanyInput;
  }): Promise<CompanyResponse> {
    const company = await this.prisma.company.update({
      where: { id },
      data: input,
    });

    return { status: 200, company };
  }

  async delete(id: number): Promise<string> {
    await this.prisma.company.delete({ where: { id } });

    return 'Company deleted';
  }
}
