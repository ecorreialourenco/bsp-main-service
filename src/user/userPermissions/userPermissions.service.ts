import {
  ListUserPermissions,
  UserPermissionsResponse,
} from 'src/graphql.schema';
import { PrismaService } from 'src/prisma/prisma.service';

import { Injectable } from '@nestjs/common';

@Injectable()
export class UserPermissionsService {
  constructor(private prisma: PrismaService) {}

  async findUserPermissions({
    input: { userId, companyId },
  }: {
    input: ListUserPermissions;
  }): Promise<UserPermissionsResponse> {
    const userCompanies = await this.prisma.userCompanies.findFirst({
      where: { userId, companyId },
    });

    const userRole = await this.prisma.userRoles.findFirst({
      where: { userCompanyId: userCompanies?.id },
    });

    const permissions = await this.prisma.permissions.findMany({
      where: { roleId: userRole?.roleId },
    });

    return { permissions };
  }
}
