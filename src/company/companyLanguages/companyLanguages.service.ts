import {
  CompanyLanguages,
  CompanyLanguagesInput,
  CompanyLanguagesResponsePaginated,
  UpdateCompanyLanguagesInput,
} from 'src/graphql.schema';
import { PrismaService } from 'src/prisma/prisma.service';

import { Injectable } from '@nestjs/common';

@Injectable()
export class CompanyLanguagesService {
  constructor(private prisma: PrismaService) {}
  async findAll({
    companyId,
  }: {
    companyId: number;
  }): Promise<CompanyLanguagesResponsePaginated> {
    const languages = await this.prisma.companyLanguages.findMany({
      where: { companyId },
    });
    const totalCount = await this.prisma.companyLanguages.count({
      where: { companyId },
    });

    return { languages, totalCount };
  }

  async create({
    input,
  }: {
    input: CompanyLanguagesInput;
  }): Promise<CompanyLanguages> {
    if (input.isDefault) {
      await this.prisma.companyLanguages.updateMany({
        data: { isDefault: false },
        where: { companyId: input.companyId },
      });
    }

    const newLanguages = await this.prisma.companyLanguages.create({
      data: input,
    });

    return newLanguages;
  }

  async update({
    id,
    input,
  }: {
    id: number;
    input: UpdateCompanyLanguagesInput;
  }): Promise<CompanyLanguages> {
    if (input.isDefault) {
      const companyLanguage = await this.prisma.companyLanguages.findUnique({
        where: { id },
      });

      await this.prisma.companyLanguages.updateMany({
        data: { isDefault: false },
        where: { companyId: companyLanguage?.companyId },
      });
    }

    return await this.prisma.companyLanguages.update({
      where: { id },
      data: input,
    });
  }

  async delete(id: number): Promise<string> {
    await this.prisma.companyLanguages.delete({ where: { id } });

    return 'Company language deleted';
  }
}
