import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { SignupInput, User } from 'src/graphql.schema';

import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async findUsername(userName: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({ where: { userName } });

    return !user;
  }

  async login(userName: string, password: string): Promise<string> {
    const searchByUsername = await this.prisma.user.findUnique({
      where: { userName },
    });

    if (!searchByUsername) {
      return '';
    }

    const userPassword: string = searchByUsername.password;
    const checkPassword = compareSync(password, userPassword);

    if (!checkPassword) {
      return '';
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

    return this.jwtService.sign(userData!);
  }

  async signup(input: SignupInput): Promise<User | null> {
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

    return await this.prisma.user.findUnique({
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
  }
}
