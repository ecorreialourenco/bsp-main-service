import { NewUserRole, UserRole } from 'src/graphql.schema';
import { PrismaService } from 'src/prisma/prisma.service';

import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRoleService {
  constructor(private prisma: PrismaService) {}

  async findByUserId({
    userCompanyId,
  }: {
    userCompanyId: string;
  }): Promise<UserRole | null> {
    return await this.prisma.userRoles.findFirst({
      where: { userCompanyId },
      orderBy: { id: 'desc' },
    });
  }

  async create({ input }: { input: NewUserRole }): Promise<UserRole> {
    return await this.prisma.userRoles.create({ data: input });
  }

  async updateRole({
    userCompanyId,
    roleId,
  }: {
    userCompanyId: string;
    roleId: string;
  }): Promise<UserRole> {
    return await this.prisma.userRoles.create({
      data: { roleId, userCompanyId },
    });
  }

  async countByRole({ roleId }: { roleId: string }): Promise<number> {
    return this.prisma.userRoles.count({ where: { roleId } });
  }
}
