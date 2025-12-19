import {
  CompanyPermission,
  CompanyPermissionInput,
  UpdateCompanyPermissions,
} from 'src/graphql.schema';
import { PrismaService } from 'src/prisma/prisma.service';

import { Injectable } from '@nestjs/common';

@Injectable()
export class CompanyPermissionsService {
  constructor(private prisma: PrismaService) {}

  async create({
    input,
  }: {
    input: CompanyPermissionInput;
  }): Promise<CompanyPermission[]> {
    await this.prisma.companyPermissions.createMany({
      data: input.menuPermissions.map((data) => ({
        read: data.read ?? false,
        createUpdate: data.createUpdate ?? false,
        delete: data.delete ?? false,
        companyRoleId: input.companyRoleId,
        menuId: data.menuId,
      })),
    });

    return this.prisma.companyPermissions.findMany({
      where: { companyRoleId: input.companyRoleId },
    });
  }

  async update({
    input,
  }: {
    input: UpdateCompanyPermissions[];
  }): Promise<CompanyPermission[]> {
    const updates = input.map((permission) => {
      const { id, input } = permission;
      return this.prisma.companyPermissions.update({
        where: { id },
        data: {
          read: input.read ?? false,
          createUpdate: input.createUpdate ?? false,
          delete: input.delete ?? false,
        },
      });
    });

    return this.prisma.$transaction(updates);
  }

  async delete(id: number): Promise<string> {
    await this.prisma.companyPermissions.delete({ where: { id } });

    return 'Company permission deleted';
  }

  async findByRoleId(companyRoleId: number): Promise<CompanyPermission[]> {
    return await this.prisma.companyPermissions.findMany({
      where: { companyRoleId },
    });
  }

  async createPermissionsForNewMenu(menuId: number) {
    const roles = await this.prisma.companyRoles.findMany();

    return await this.prisma.companyPermissions.createMany({
      data: roles.map((role) => ({
        read: role.isProtected ? true : false,
        createUpdate: role.isProtected ? true : false,
        delete: role.isProtected ? true : false,
        menuId: menuId,
        companyRoleId: role.id,
      })),
    });
  }

  async createPermissionsForNewRole(roleId: number) {
    const menus = await this.prisma.menu.findMany();
    const role = await this.prisma.companyRoles.findUnique({
      where: { id: roleId },
    });

    if (!role) {
      return null;
    }

    return await this.prisma.companyPermissions.createMany({
      data: menus.map((menu) => ({
        read: role.isProtected ? true : false,
        createUpdate: role.isProtected ? true : false,
        delete: role.isProtected ? true : false,
        menuId: menu.id,
        companyRoleId: role.id,
      })),
    });
  }
}
