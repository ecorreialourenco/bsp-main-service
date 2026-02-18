import {
  ListUsers,
  UserInput,
  UserResponse,
  UserResponsePaginated,
} from 'src/graphql.schema';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findAll({
    input: { companyId, userRoleId, offset, limit, sortBy, sortOrder },
  }: {
    input: ListUsers;
  }): Promise<UserResponsePaginated> {
    const filters: {
      companyId: number;
      id?: { in: number[] };
      deletedAt: null;
    } = {
      companyId,
      deletedAt: null,
    };

    if (userRoleId) {
      const filterUserByRole = await this.prisma.userRoles.findMany({
        where: { companyRoleId: userRoleId },
      });
      filters.id = { in: filterUserByRole.map((ur) => ur.userId) };
    }

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
    id: number;
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
    id: number;
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

  async restore(id: number): Promise<string> {
    await this.prisma.user.delete({ where: { id } });

    return 'User restored';
  }

  async changeActiveStatus({
    id,
    status,
  }: {
    id: number;
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

  async findByCompanyId({ companyId }: { companyId: number }): Promise<User[]> {
    return await this.prisma.user.findMany({
      where: { companyId },
    });
  }
}
