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
    input: { userId },
  }: {
    input: ListUserPermissions;
  }): Promise<UserPermissionsResponse> {
    const userRole = await this.prisma.userRoles.findFirst({
      where: { userId },
    });

    const permissions = await this.prisma.companyPermissions.findMany({
      where: { companyRoleId: userRole?.companyRoleId },
    });

    return { permissions };
  }
}
