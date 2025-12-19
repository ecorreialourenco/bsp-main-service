import { ClientContactInput, ClientContact } from 'src/graphql.schema';
import { PrismaService } from 'src/prisma/prisma.service';

import { Injectable } from '@nestjs/common';
import { ContactType } from '@prisma/client';

@Injectable()
export class ClientContactsService {
  constructor(private prisma: PrismaService) {}

  getContactTypes(): string[] {
    return Object.values(ContactType);
  }

  async findByClientId({
    clientId,
  }: {
    clientId: number;
  }): Promise<ClientContact[]> {
    return await this.prisma.clientContacts.findMany({
      where: { clientId },
    });
  }

  async create({
    input,
  }: {
    input: ClientContactInput;
  }): Promise<ClientContact> {
    return await this.prisma.clientContacts.create({ data: input });
  }

  async update({
    id,
    input,
  }: {
    id: number;
    input: ClientContactInput;
  }): Promise<ClientContact> {
    return await this.prisma.clientContacts.update({
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
      await this.prisma.clientContacts.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
    } else {
      await this.prisma.clientContacts.delete({ where: { id } });
    }

    return 'Client contact deleted';
  }

  async restore({ id }: { id: number }): Promise<string> {
    await this.prisma.clientContacts.update({
      where: { id },
      data: { deletedAt: null },
    });

    return 'Client contact restored';
  }
}
