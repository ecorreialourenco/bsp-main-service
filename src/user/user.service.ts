import {
  ListUsers,
  UserInput,
  UserResponse,
  UserResponsePaginated,
} from 'src/graphql.schema';
import { Injectable } from '@nestjs/common';
import { User, UserCompanies } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findAll({
    input: { companyId, search, userRoleId, offset, limit, sortBy, sortOrder },
  }: {
    input: ListUsers;
  }): Promise<UserResponsePaginated> {
    const filters: {
      id?: { in: string[] };
      deletedAt: null;
      OR?: [
        { firstName: { contains: string } },
        { lastName: { contains: string } },
        { userName: { contains: string } },
      ];
    } = {
      deletedAt: null,
    };

    if (search) {
      filters.OR = [
        { firstName: { contains: search } },
        { lastName: { contains: search } },
        { userName: { contains: search } },
      ];
    }

    const userComanyFilters: { companyId: string; id?: { in: string[] } } = {
      companyId,
    };
    if (userRoleId) {
      const filterUserByRole = await this.prisma.userRoles.findMany({
        where: {
          roleId: userRoleId,
        },
      });
      userComanyFilters.id = {
        in: filterUserByRole.map((ur) => ur.userCompanyId),
      };
    }

    const filterUserByCompany = await this.prisma.userCompanies.findMany({
      where: userComanyFilters,
    });
    filters.id = { in: filterUserByCompany.map((ur) => ur.userId) };

    const users = await this.prisma.user.findMany({
      where: filters,
      take: limit ?? 10,
      skip: offset ?? 0,
      orderBy: sortBy
        ? {
            [sortBy]: sortOrder || 'asc',
          }
        : { id: 'asc' },
    });
    const totalCount = await this.prisma.user.count({ where: filters });

    return { users, totalCount };
  }

  async create({ input }: { input: UserInput }): Promise<UserResponse> {
    const user = await this.prisma.user.create({ data: input });
    return { user, status: 200 };
  }

  async update({
    id,
    input,
  }: {
    id: string;
    input: UserInput;
  }): Promise<UserResponse> {
    const user = await this.prisma.user.update({
      where: { id },
      data: input,
    });

    return { user, status: 200 };
  }

  async delete({
    id,
    forceDelete,
  }: {
    id: string;
    forceDelete?: boolean;
  }): Promise<string> {
    if (forceDelete) {
      await this.prisma.user.delete({ where: { id } });
    } else {
      await this.prisma.user.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
    }

    return 'User deleted';
  }

  async restore(id: string): Promise<string> {
    await this.prisma.user.delete({ where: { id } });

    return 'User restored';
  }

  async changeActiveStatus({
    id,
    status,
  }: {
    id: string;
    status: boolean;
  }): Promise<UserResponse> {
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        isActive: status,
      },
    });

    return { user, status: 200 };
  }

  async findByCompanyId({ companyId }: { companyId: string }): Promise<User[]> {
    const usersList = await this.prisma.userCompanies.findMany({
      where: { companyId },
    });

    return await this.prisma.user.findMany({
      where: { id: { in: usersList.map((ul) => ul.userId) } },
    });
  }

  async getUserCompanies({
    userId,
  }: {
    userId: string;
  }): Promise<UserCompanies[]> {
    return await this.prisma.userCompanies.findMany({
      where: { userId },
    });
  }
}
