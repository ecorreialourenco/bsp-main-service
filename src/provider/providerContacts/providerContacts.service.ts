import { ProviderContactInput, ProviderContact } from 'src/graphql.schema';
import { PrismaService } from 'src/prisma/prisma.service';

import { Injectable } from '@nestjs/common';
import { ContactType } from '@prisma/client';

@Injectable()
export class ProviderContactsService {
  constructor(private prisma: PrismaService) {}

  getContactTypes(): string[] {
    return Object.values(ContactType);
  }

  async findByProviderId({
    providerId,
  }: {
    providerId: number;
  }): Promise<ProviderContact[]> {
    return await this.prisma.providerContacts.findMany({
      where: { providerId },
    });
  }

  async create({
    input,
  }: {
    input: ProviderContactInput;
  }): Promise<ProviderContact> {
    return await this.prisma.providerContacts.create({ data: input });
  }

  async update({
    id,
    input,
  }: {
    id: number;
    input: ProviderContactInput;
  }): Promise<ProviderContact> {
    return await this.prisma.providerContacts.update({
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
      await this.prisma.providerContacts.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
    } else {
      await this.prisma.providerContacts.delete({ where: { id } });
    }

    return 'Provider contact deleted';
  }

  async restore({ id }: { id: number }): Promise<string> {
    await this.prisma.providerContacts.update({
      where: { id },
      data: { deletedAt: null },
    });

    return 'Provider contact restored';
  }
}
