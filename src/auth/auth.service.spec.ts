import { SignupInput } from 'src/graphql.schema';
import { prismaMockValue } from 'src/test/mocks/prisma.service.mock';
import { userStub } from 'src/test/stubs/user.stub';

import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from './auth.service';

jest.mock('bcrypt', () => ({
  compareSync: jest.fn().mockImplementation((val1, val2) => val1 === val2),
  genSaltSync: jest.fn(),
  hashSync: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService;
  let jwt: jest.Mocked<JwtService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: prismaMockValue,
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('fakeToken'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
    jwt = module.get(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findUsername', () => {
    it('should return isValid=true if user does not exist', async () => {
      const result = await service.findUsername('testUser');
      expect(result).toEqual({ isValid: true, status: 200 });
    });

    it('should return isValid=false if user exists', async () => {
      const result = await service.findUsername(userStub().userName);
      expect(result).toEqual({ isValid: false, status: 200 });
    });
  });

  describe('login', () => {
    it('should return 401 if user not found', async () => {
      const result = await service.login('testUser', '123');
      expect(result).toEqual({ status: 401, token: '' });
    });

    it('should return 401 if password does not match', async () => {
      const result = await service.login('testUser', '123');
      expect(result).toEqual({ status: 401, token: '' });
    });

    it('should return token if login succeeds', async () => {
      jwt.sign.mockReturnValue('fakeToken');

      const result = await service.login(
        userStub().userName,
        userStub().password,
      );
      expect(result).toEqual({ token: 'fakeToken', status: 200 });
      expect(jwt.sign).toHaveBeenCalled();
    });

    it('should return 401 if passwords doesn`t match', async () => {
      jwt.sign.mockReturnValue('fakeToken');

      const result = await service.login('testUser', '$2b$10$');
      expect(result).toEqual({ token: '', status: 401 });
    });
  });

  describe('signup', () => {
    it('should create company, office, and user', async () => {
      const input: SignupInput = {
        company: { name: 'TestCo', website: '' },
        office: {
          name: 'HQ',
          city: '',
          state: '',
          country: '',
          address: '',
          zipCode: '',
        },
        user: {
          firstName: '',
          lastName: '',
          userName: 'newUser',
          password: '123',
        },
      };

      const result = await service.signup(input);
      expect(prisma.company.create).toHaveBeenCalledWith({
        data: input.company,
      });
      expect(prisma.office.create).toHaveBeenCalledWith({
        data: { ...input.office, companyId: '1' },
      });
      expect(prisma.user.create).toHaveBeenCalled();
      expect(result).toEqual({
        status: 200,
        user: userStub(),
      });
    });
  });
});
