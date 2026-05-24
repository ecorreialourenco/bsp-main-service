import { Permissions, Roles } from '@prisma/client';

export const companyRoleStub = (): Roles => ({
  id: '1',
  name: 'Admin',
  companyId: '1',
  minWages: 920,
  maxWages: 2000,
  isProtected: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
});

export const companyPermissionsStub = (): Permissions[] => [
  {
    id: '1',
    read: true,
    create: true,
    update: true,
    delete: true,
    roleId: '1',
    menuId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: '2',
    read: true,
    create: false,
    update: false,
    delete: false,
    roleId: '1',
    menuId: '2',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
];
