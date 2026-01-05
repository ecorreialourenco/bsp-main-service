import {
  MenuInput,
  MenuListInput,
  MenuResponsePaginated,
} from 'src/graphql.schema';
import { CompanyPermissionsService } from 'src/company/companyPermissions/companyPermissions.service';

import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Menu } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MenuService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => CompanyPermissionsService))
    private readonly companyPermissionsService: CompanyPermissionsService,
  ) {}

  async findAll({
    input,
  }: {
    input: MenuListInput;
  }): Promise<MenuResponsePaginated> {
    let where: {
      id?: { in: number[] };
      onlyAdmin?: boolean;
      isVisible?: boolean;
      parentId: number | null;
    } = {
      parentId: null,
    };

    if (input?.isVisible) {
      where = { ...where, isVisible: input.isVisible };
    }

    const menus = await this.prisma.menu.findMany({
      where,
      take: input?.limit ?? 10,
      skip: input?.offset ?? 0,
      orderBy: input?.sortBy
        ? {
            [input?.sortBy]: input?.sortOrder || 'asc',
          }
        : { order: 'asc' },
    });
    const totalCount = await this.prisma.menu.count({
      where,
    });

    return { menus, totalCount };
  }

  async create({ input }: { input: MenuInput }): Promise<Menu> {
    const newMenu = await this.prisma.menu.create({
      data: input,
    });

    await this.companyPermissionsService.createPermissionsForNewMenu(
      newMenu.id,
    );

    return newMenu;
  }

  async update({ id, input }: { id: number; input: MenuInput }): Promise<Menu> {
    return await this.prisma.menu.update({
      where: { id },
      data: input,
    });
  }

  async delete(id: number): Promise<string> {
    await this.prisma.menu.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return 'Menu deleted';
  }

  async restore(id: number): Promise<string> {
    await this.prisma.menu.update({
      where: { id },
      data: { deletedAt: null },
    });

    return 'Menu restored';
  }

  async findSubMenu(id: number): Promise<Menu[]> {
    return await this.prisma.menu.findMany({
      where: { parentId: id },
    });
  }

  async findMenuById(id: number): Promise<Menu | null> {
    return await this.prisma.menu.findUnique({
      where: { id },
    });
  }
}
