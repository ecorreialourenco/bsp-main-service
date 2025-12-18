import { CompanyPermissions, CompanyRoles } from '@prisma/client';

export const companyRoleStub = (): CompanyRoles => ({
  id: 1,
  name: 'Admin',
  companyId: 1,
  minWages: 920,
  maxWages: 2000,
  isProtected: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
});

export const companyPermissionsStub = (): CompanyPermissions[] => [
  {
    id: 1,
    read: true,
    createUpdate: true,
    delete: true,
    companyRoleId: 1,
    menuId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: 2,
    read: true,
    createUpdate: false,
    delete: false,
    companyRoleId: 1,
    menuId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
];
