import { UserInput, ListUsers } from 'src/graphql.schema';
import { prismaMockValue } from 'src/test/mocks/prisma.service.mock';
import { userStub } from 'src/test/stubs/user.stub';

import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '../prisma/prisma.service';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let prisma: typeof prismaMockValue;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: prismaMockValue,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findOne', () => {
    it('should call findUnique with correct id', async () => {
      const mockUser = userStub();
      const result = await service.findOne(1);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(mockUser);
    });
  });

  describe('findAll', () => {
    it('should use default pagination (10, 0) and default order (id asc)', async () => {
      const input: ListUsers = { companyId: 1 };
      await service.findAll({ input });

      expect(prisma.user.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          take: 10,
          skip: 0,
          orderBy: { id: 'asc' },
        }),
      );
    });

    it('should use provided limit, offset and dynamic sorting', async () => {
      const input: ListUsers = {
        companyId: 1,
        limit: 5,
        offset: 2,
        sortBy: 'userName',
        sortOrder: 'desc',
      };
      await service.findAll({ input });

      expect(prisma.user.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          take: 5,
          skip: 2,
          orderBy: { userName: 'desc' },
        }),
      );
    });

    it('should return totalCount from count method', async () => {
      const result = await service.findAll({ input: { companyId: 1 } });
      expect(prisma.user.count).toHaveBeenCalledWith({
        where: { companyId: 1 },
      });
      expect(result).toHaveProperty('totalCount');
    });
  });

  describe('create', () => {
    it('should create a user and return UserResponse format', async () => {
      const input: UserInput = userStub();
      const result = await service.create({ input });

      expect(prisma.user.create).toHaveBeenCalledWith({ data: input });
      expect(result).toEqual({ user: expect.any(Object), status: 200 });
    });
  });

  describe('update', () => {
    it('should update user and return UserResponse', async () => {
      const input: UserInput = { ...userStub(), firstName: 'Updated' };
      const result = await service.update({ id: 1, input });

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: input,
      });
      expect(result.status).toBe(200);
    });
  });

  describe('delete', () => {
    it('should execute hard delete when forceDelete is true', async () => {
      const result = await service.delete({ id: 1, forceDelete: true });

      expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toBe('User deleted');
    });

    it('should execute soft delete (update deletedAt) when forceDelete is false/undefined', async () => {
      const result = await service.delete({ id: 1 });

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { deletedAt: expect.any(Date) },
      });
      expect(result).toBe('User deleted');
    });
  });

  describe('restore', () => {
    it('should call delete method as defined in service', async () => {
      const result = await service.restore(1);
      expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toBe('User restored');
    });
  });

  describe('changeActiveStatus', () => {
    it('should update isActive status to true', async () => {
      const result = await service.changeActiveStatus({ id: 1, status: true });

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { isActive: true },
      });
      expect(result.status).toBe(200);
    });

    it('should update isActive status to false', async () => {
      await service.changeActiveStatus({ id: 1, status: false });

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { isActive: false },
      });
    });
  });
});
