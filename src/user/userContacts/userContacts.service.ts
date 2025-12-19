import { UserContactInput, UserContact } from 'src/graphql.schema';
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
    return await this.prisma.userContacts.findMany({
      where: { userId },
    });
  }

  async create({ input }: { input: UserContactInput }): Promise<UserContact> {
    return await this.prisma.userContacts.create({ data: input });
  }

  async update({
    id,
    input,
  }: {
    id: number;
    input: UserContactInput;
  }): Promise<UserContact> {
    return await this.prisma.userContacts.update({
      where: { id },
      data: input,
    });
  }

  async delete({ id }: { id: number }): Promise<string> {
    await this.prisma.userContacts.delete({ where: { id } });

    return 'User contact deleted';
  }
}
