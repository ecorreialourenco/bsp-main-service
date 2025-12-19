import {
  LanguageInput,
  LanguageListInput,
  LanguagesResponsePaginated,
} from 'src/graphql.schema';
import { Injectable } from '@nestjs/common';
import { Language } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LanguageService {
  constructor(private prisma: PrismaService) {}

  async findAll({
    input,
  }: {
    input: LanguageListInput;
  }): Promise<LanguagesResponsePaginated> {
    const where: { isAvailable?: boolean } = {};
    if (input?.isAvailable) {
      where.isAvailable = input.isAvailable;
    }
    const languages = await this.prisma.language.findMany({
      where,
      take: input?.limit ?? 10,
      skip: input?.offset ?? 0,
      orderBy: input?.sortBy
        ? {
            [input?.sortBy]: input?.sortOrder || 'asc',
          }
        : { id: 'asc' },
    });

    const totalCount = await this.prisma.language.count({ where });

    return { languages, totalCount };
  }

  async create({ input }: { input: LanguageInput }): Promise<Language> {
    return await this.prisma.language.create({
      data: input,
    });
  }
  async update({
    id,
    input,
  }: {
    id: number;
    input: LanguageInput;
  }): Promise<Language> {
    return await this.prisma.language.update({
      where: { id },
      data: input,
    });
  }
}
