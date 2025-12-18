import {
  UserContactResponse,
  UserContactInput,
  UserContact,
} from 'src/graphql.schema';
import { PrismaService } from 'src/prisma/prisma.service';

import { Injectable } from '@nestjs/common';
import { ContactType } from '@prisma/client';

@Injectable()
export class UserContactsService {
  constructor(private prisma: PrismaService) {}

  getContactTypes(): string[] {
    return Object.values(ContactType);
  }

  async findByUserId({ userId }: { userId: number }): Promise<UserContact[]> {
    const contacts = await this.prisma.userContacts.findMany({
      where: { userId },
    });

    return contacts.map((contact) => ({
      ...contact,
      type: ContactType[contact.type.valueOf()],
    }));
  }

  async create({
    input,
  }: {
    input: UserContactInput;
  }): Promise<UserContactResponse> {
    const contact = await this.prisma.userContacts.create({ data: input });
    return {
      contact: { ...contact, type: ContactType[contact.type.valueOf()] },
      status: 200,
    };
  }

  async update({
    id,
    input,
  }: {
    id: number;
    input: UserContactInput;
  }): Promise<UserContactResponse> {
    const contact = await this.prisma.userContacts.update({
      where: { id },
      data: input,
    });

    return {
      contact: { ...contact, type: ContactType[contact.type.valueOf()] },
      status: 200,
    };
  }

  async delete({ id }: { id: number }): Promise<string> {
    await this.prisma.userContacts.delete({ where: { id } });

    return 'User contact deleted';
  }
}
