import {
  UsernameValidationResponse,
  LoginResponse,
  User,
} from '../graphql.schema';
import { Test, TestingModule } from '@nestjs/testing';

import { AuthResolvers } from './auth.resolvers';
import { AuthService } from './auth.service';

describe('AuthResolvers', () => {
  let resolver: AuthResolvers;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolvers,
        {
          provide: AuthService,
          useValue: {
            findUsername: jest.fn(),
            login: jest.fn(),
            signup: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<AuthResolvers>(AuthResolvers);
    service = module.get<AuthService>(AuthService);
  });

  it('Should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('checkUsername', () => {
    it('should call AuthService.findUsername and return the response', async () => {
      const mockResponse: UsernameValidationResponse = {
        isValid: true,
        status: 200,
      };
      (service.findUsername as jest.Mock).mockResolvedValue(mockResponse);

      const result = await resolver.checkUsername('teste');
      expect(service.findUsername).toHaveBeenCalledWith('teste');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('login', () => {
    it('should call AuthService.login and return LoginResponse', async () => {
      const mockResponse: LoginResponse = { status: 200, token: 'abc123' };
      (service.login as jest.Mock).mockResolvedValue(mockResponse);

      const result = await resolver.login({
        username: 'teste',
        password: '123',
      });
      expect(service.login).toHaveBeenCalledWith('teste', '123');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('signup', () => {
    it('should call AuthService.signup and return User', async () => {
      const mockUser: User = { id: 1, userName: 'teste', password: 'hashed' };
      (service.signup as jest.Mock).mockResolvedValue(mockUser);

      const result = await resolver.signup({
        username: 'teste',
        password: '123',
      });
      expect(service.signup).toHaveBeenCalledWith({
        username: 'teste',
        password: '123',
      });
      expect(result).toEqual(mockUser);
    });
  });
});
