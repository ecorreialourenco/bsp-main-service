import { UserInput, UserResponse } from 'src/graphql.schema';
import { userStub } from 'src/test/stubs/user.stub';

import { Test, TestingModule } from '@nestjs/testing';

import { UserResolvers } from './user.resolvers';
import { UserService } from './user.service';

describe('UserResolvers', () => {
  let resolver: UserResolvers;
  let service: jest.Mocked<UserService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolvers,
        {
          provide: UserService,
          useValue: {
            findOne: jest.fn(),
            findAll: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            restore: jest.fn(),
            changeActiveStatus: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<UserResolvers>(UserResolvers);
    service = module.get(UserService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('getUser', () => {
    it('should call userService.findOne and return result', async () => {
      const mockUser = userStub();
      service.findOne.mockResolvedValue(mockUser);

      const result = await resolver.getUser(1);
      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockUser);
    });
  });

  describe('listUsers', () => {
    it('should call userService.findAll and return result', async () => {
      const mockResponse = { users: [], total: 0 };
      service.findAll.mockResolvedValue(mockResponse);

      const input = { page: 1, limit: 10, companyId: 1 };
      const result = await resolver.listUsers(input);
      expect(service.findAll).toHaveBeenCalledWith({ input });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('createUser', () => {
    it('should call userService.create and return result', async () => {
      const mockResponse: UserResponse = { status: 200, user: userStub() };
      service.create.mockResolvedValue(mockResponse);

      const input: UserInput = userStub();
      const result = await resolver.createUser(input);
      expect(service.create).toHaveBeenCalledWith({ input });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('updateUser', () => {
    it('should call userService.update and return result', async () => {
      const mockResponse: UserResponse = {
        status: 200,
        user: { ...userStub(), userName: 'updatedUser' },
      };
      service.update.mockResolvedValue(mockResponse);

      const input: UserInput = { ...userStub(), userName: 'updatedUser' };
      const result = await resolver.updateUser(1, input);
      expect(service.update).toHaveBeenCalledWith({ id: 1, input });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('removeUser', () => {
    it('should call userService.delete and return result', async () => {
      service.delete.mockResolvedValue('deleted');

      const result = await resolver.removeUser(1, true);
      expect(service.delete).toHaveBeenCalledWith({ id: 1, forceDelete: true });
      expect(result).toEqual('deleted');
    });
  });

  describe('restoreUser', () => {
    it('should call userService.restore and return result', async () => {
      service.restore.mockResolvedValue('restored');

      const result = await resolver.restoreUser(1);
      expect(service.restore).toHaveBeenCalledWith(1);
      expect(result).toEqual('restored');
    });
  });

  describe('changeUserActiveStatus', () => {
    it('should call userService.changeActiveStatus, publish event, and return result', async () => {
      const input: { id: number; status: boolean } = {
        id: 1,
        status: true,
      };
      const mockResponse = { status: 200, user: userStub() };
      service.changeActiveStatus.mockResolvedValue(mockResponse);

      const publishSpy = jest.spyOn((resolver as any).pubSub, 'publish');

      const result = await resolver.changeUserActiveStatus(
        input.id,
        input.status,
      );
      expect(service.changeActiveStatus).toHaveBeenCalledWith(input);
      expect(publishSpy).toHaveBeenCalledWith('userStatusChanged', {
        userStatusChanged: mockResponse,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('userStatusChanged subscription', () => {
    it('should return async iterator', () => {
      const iterator = resolver.userStatusChanged();
      expect(iterator).toBeDefined();
      expect(typeof iterator[Symbol.asyncIterator]).toBe('function');
    });
  });
});
