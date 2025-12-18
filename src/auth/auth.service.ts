import {
  LoginResponse,
  SignupInput,
  SignupResponse,
  UsernameValidationResponse,
} from 'src/graphql.schema';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async findUsername(userName: string): Promise<UsernameValidationResponse> {
    const user = await this.prisma.user.findUnique({ where: { userName } });

    return { isValid: !user, status: 200 };
  }

  async login(userName: string, password: string): Promise<LoginResponse> {
    const searchByUsername = await this.prisma.user.findUnique({
      where: { userName },
    });

    if (!searchByUsername) {
      return { status: 401, token: '' };
    }

    const userPassword: string = searchByUsername.password;
    const checkPassword = compareSync(password, userPassword);

    if (!checkPassword) {
      return { status: 401, token: '' };
    }

    const userData = await this.prisma.user.findUnique({
      where: { id: searchByUsername.id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        userName: true,
        companyId: true,
        isAdmin: true,
      },
    });

    return { token: this.jwtService.sign(userData!), status: 200 };
  }

  async signup(input: SignupInput): Promise<SignupResponse> {
    const { company, office, user } = input;

    const newCompany = await this.prisma.company.create({ data: company });
    await this.prisma.office.create({
      data: { ...office, companyId: newCompany.id },
    });

    const companyRole = await this.prisma.companyRoles.create({
      data: {
        name: 'Admin',
        companyId: newCompany.id,
        isProtected: true,
      },
    });

    const menus = await this.prisma.menu.findMany();
    await this.prisma.companyPermissions.createMany({
      data: menus.map((menu) => ({
        companyRoleId: companyRole.id,
        menuId: menu.id,
        read: true,
        createUpdate: true,
        delete: true,
      })),
      skipDuplicates: true,
    });

    const salt = genSaltSync(10);
    const password = hashSync(user.password, salt);

    const newUser = await this.prisma.user.create({
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        companyId: newCompany.id,
        employeeNr: 1,
        password,
      },
    });

    const userRole = await this.prisma.userRoles.create({
      data: {
        companyRoleId: companyRole.id,
        userId: newUser.id,
      },
    });

    await this.prisma.userRoleWage.create({
      data: { userRoleId: userRole.id },
    });

    const userData = await this.prisma.user.findUnique({
      where: { id: newUser.id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        userName: true,
        isActive: true,
        companyId: true,
        employeeNr: true,
      },
    });

    return { user: userData, status: 200 };
  }
}
