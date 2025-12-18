import { mockDeep } from 'jest-mock-extended';
import { PrismaService } from 'src/prisma/prisma.service';

import { companyRoleStub, companyPermissionsStub } from '../stubs/company.stub';
import { languageStub } from '../stubs/language.stub';
import { menuListStub } from '../stubs/menu.stub';
import { officeStub } from '../stubs/office.stub';
import { userContactsListStub, userListStub } from '../stubs/user.stub';

export const createPrismaMock = () => mockDeep<PrismaService>();

export const prismaMockValue = {
  company: {
    findMany: jest.fn().mockResolvedValue([{ id: 1, name: 'Test Company' }]),
    findUnique: jest.fn().mockResolvedValue({ id: 1, name: 'Test Company' }),
    create: jest
      .fn()
      .mockImplementation(({ data }) => Promise.resolve({ id: '1', ...data })),
    update: jest.fn().mockImplementation(({ data }) => Promise.resolve(data)),
  },
  companyRoles: {
    findMany: jest.fn().mockResolvedValue([companyRoleStub()]),
    findUnique: jest.fn().mockResolvedValue(companyRoleStub()),
    findFirst: jest.fn().mockResolvedValue(companyRoleStub()),
    create: jest
      .fn()
      .mockImplementation(({ data }) => Promise.resolve({ id: 1, ...data })),
    update: jest.fn().mockImplementation(({ data }) => Promise.resolve(data)),
  },
  companyPermissions: {
    findFirst: jest.fn().mockImplementation(({ where }) => {
      const permissions = companyPermissionsStub().find((permission) => {
        if (where?.id) {
          return permission.id === where.id;
        } else if (where?.companyRoleId && where?.menuId) {
          return (
            permission.companyRoleId === where.companyRoleId &&
            permission.menuId === where.menuId
          );
        }
      });

      return Promise.resolve(permissions);
    }),
    findMany: jest.fn().mockReturnValue(companyPermissionsStub()),
    create: jest
      .fn()
      .mockImplementation(({ data }) =>
        Promise.resolve({ id: companyPermissionsStub().length + 1, ...data }),
      ),
    createMany: jest.fn().mockImplementation(({ data }) =>
      Promise.resolve({
        count: Array.isArray(data) ? data.length : 0,
      }),
    ),
    update: jest
      .fn()
      .mockImplementation(({ data, where }) =>
        Promise.resolve({ ...data, id: where.id }),
      ),
  },
  language: {
    findFirst: jest.fn().mockImplementation(({ where }) => {
      const element = languageStub().find((lang) => {
        if (where?.id) {
          return lang.id === where.id;
        }
      });

      return Promise.resolve(element);
    }),
    create: jest
      .fn()
      .mockImplementation(({ data }) => Promise.resolve({ id: 1, ...data })),
    update: jest.fn().mockImplementation(({ data }) => Promise.resolve(data)),
  },
  menu: {
    findMany: jest.fn().mockResolvedValue(menuListStub()),
    findFirst: jest.fn().mockImplementation(({ where }) => {
      const findMenu = menuListStub().find((menu) => {
        if (where?.slug) {
          return menu.id === where.slug;
        }
      });
      return Promise.resolve(findMenu);
    }),
    create: jest
      .fn()
      .mockImplementation(({ data }) => Promise.resolve({ id: 1, ...data })),
    update: jest.fn().mockImplementation(({ data }) => Promise.resolve(data)),
    delete: jest.fn().mockImplementation(({ data }) => Promise.resolve(data)),
  },
  office: {
    findFirst: jest.fn().mockResolvedValue({ id: 1, ...officeStub }),
    findUnique: jest.fn().mockResolvedValue({ id: 1, ...officeStub }),
    findMany: jest.fn().mockResolvedValue([]),
    count: jest.fn().mockResolvedValue(0),
    create: jest
      .fn()
      .mockImplementation(({ data }) => Promise.resolve({ id: 1, ...data })),
    update: jest.fn().mockImplementation(({ data }) => Promise.resolve(data)),
    delete: jest.fn().mockImplementation(({ data }) => Promise.resolve(data)),
  },
  user: {
    findFirst: jest.fn().mockImplementation(({ where }) => {
      const user = userListStub().find((user) => {
        if (where?.id) {
          return user.companyId === where.id;
        } else if (where?.userName) {
          return user.userName === where.userName;
        }
      });

      return Promise.resolve(user);
    }),
    findMany: jest.fn().mockImplementation((data) => {
      const list = userListStub().filter(
        (user) => user.companyId === data?.where?.companyId,
      );
      return Promise.resolve(list);
    }),
    count: jest.fn().mockImplementation((data) => {
      const list = userListStub().filter(
        (user) => user.companyId === data?.where?.companyId,
      );
      return Promise.resolve(list.length);
    }),
    findUnique: jest.fn().mockImplementation(({ where }) => {
      const user = userListStub().find((user) => {
        if (where?.id) {
          return user.companyId === where.id;
        } else if (where?.userName) {
          return user.userName === where.userName;
        }
      });

      return Promise.resolve(user);
    }),
    create: jest.fn().mockImplementation(({ data }) => {
      delete data.password;
      return Promise.resolve({ ...data, id: 1 });
    }),
    update: jest.fn().mockImplementation(({ data, where }) => {
      const user = userListStub().find((user) => user.companyId === where?.id);

      return Promise.resolve({ ...user, ...data });
    }),
    delete: jest.fn().mockImplementation(({ data }) => Promise.resolve(data)),
  },
  userContacts: {
    findFirst: jest.fn().mockImplementation(({ where }) => {
      const contact = userContactsListStub().find((contact) => {
        if (where?.id) {
          return contact.id === where.id;
        }
      });

      return Promise.resolve(contact);
    }),
    create: jest
      .fn()
      .mockImplementation(({ data }) => Promise.resolve({ ...data, id: 1 })),
    update: jest.fn().mockImplementation(({ data, where }) => {
      const userContact = userContactsListStub().find(
        (contact) => contact.id === where?.id,
      );
      return Promise.resolve({ ...userContact, ...data });
    }),
  },
  userRoles: {
    findFirst: jest.fn().mockResolvedValue({
      id: 1,
      companyRoleId: 1,
      userId: 1,
    }),
    create: jest
      .fn()
      .mockResolvedValue({ id: 1, companyRoleId: 1, userCompanyId: 1 }),
  },
  userRoleWage: {
    create: jest.fn().mockResolvedValue({ id: 1, userRoleId: 1, userId: 1 }),
  },
};
