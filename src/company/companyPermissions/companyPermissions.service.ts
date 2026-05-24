import {
  CompanyPermission,
  UpdateCompanyPermissions,
} from 'src/graphql.schema';
import { PrismaService } from 'src/prisma/prisma.service';

import { Injectable } from '@nestjs/common';

@Injectable()
export class CompanyPermissionsService {
  constructor(private prisma: PrismaService) {}

  async update({
    input,
  }: {
    input: UpdateCompanyPermissions[];
  }): Promise<CompanyPermission[]> {
    const updates = input.map((permission) => {
      const { id } = permission;
      const permissionData = permission.input;

      return this.prisma.permissions.update({
        where: { id },
        data: {
          read: permissionData?.read ?? false,
          create: permissionData?.create ?? false,
          update: permissionData?.update ?? false,
          delete: permissionData?.delete ?? false,
        },
      });
    });

    return this.prisma.$transaction(updates);
  }

  async delete(roleId: string): Promise<string> {
    await this.prisma.permissions.deleteMany({
      where: { roleId },
    });

    return 'Company permissions deleted';
  }

  async findByRoleId(roleId: string): Promise<CompanyPermission[]> {
    return await this.prisma.permissions.findMany({
      where: { roleId },
    });
  }

  async createPermissionsForNewMenu(
    menuId: string,
  ): Promise<CompanyPermission[]> {
    const roles = await this.prisma.roles.findMany();

    await this.prisma.permissions.createMany({
      data: roles.map((role) => ({
        read: role.isProtected ? true : false,
        createUpdate: role.isProtected ? true : false,
        delete: role.isProtected ? true : false,
        menuId: menuId,
        roleId: role.id,
      })),
    });

    return await this.prisma.permissions.findMany({
      where: { menuId, deletedAt: null },
    });
  }

  async createPermissionsForNewRole(
    roleId: string,
  ): Promise<CompanyPermission[]> {
    const menus = await this.prisma.menu.findMany();
    const role = await this.prisma.roles.findUnique({
      where: { id: roleId },
    });

    if (!role) {
      return [];
    }

    await this.prisma.permissions.createMany({
      data: menus.map((menu) => ({
        read: role.isProtected ? true : false,
        createUpdate: role.isProtected ? true : false,
        delete: role.isProtected ? true : false,
        menuId: menu.id,
        roleId: role.id,
      })),
    });

    return await this.prisma.permissions.findMany({
      where: { roleId: roleId, deletedAt: null },
    });
  }

  async findMenuPermissionsByUser({
    menuId,
    userId,
  }: {
    menuId: string;
    userId: string;
  }): Promise<CompanyPermission | null> {
    /* const userRole = await this.prisma.userRoles.findFirst({
      where: { userCompanyId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });

    if (!userRole) {
      return null;
    } */

    return await this.prisma.permissions.findFirst({
      where: { menuId /*  roleId: userRole?.roleId */ },
    });
  }
}
