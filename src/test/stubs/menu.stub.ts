import { Menu } from '@prisma/client';

export const menuStub = (): Menu => ({
  id: 1,
  name: 'Dashboard',
  slug: 'dashboard',
  order: 1,
  icon: 'some-icon',
  onlyAdmin: false,
  isVisible: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
});

export const menuListStub = (): Menu[] => [
  menuStub(),
  { ...menuStub(), id: 2, name: 'Settings', slug: 'settings', order: 2 },
  { ...menuStub(), id: 3, name: 'Company', slug: 'company', order: 3 },
  { ...menuStub(), id: 4, name: 'Employees', slug: 'users', order: 4 },
];
