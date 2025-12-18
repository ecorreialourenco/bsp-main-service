import { NewUserRole, UserRole } from 'src/graphql.schema';
import { PrismaService } from 'src/prisma/prisma.service';

import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRoleService {
  constructor(private prisma: PrismaService) {}

  async findByUserId({ userId }: { userId: number }): Promise<UserRole | null> {
    return await this.prisma.userRoles.findFirst({
      where: { userId },
      orderBy: { id: 'desc' },
    });
  }

  async create({ input }: { input: NewUserRole }): Promise<UserRole> {
    return await this.prisma.userRoles.create({ data: input });
  }
}
