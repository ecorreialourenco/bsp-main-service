import { Office } from '@prisma/client';

export const officeStub = (): Office => ({
  id: 1,
  name: 'Main Office',
  address: '123 Main St',
  city: 'Metropolis',
  state: 'NY',
  country: 'USA',
  zipCode: '12345',
  companyId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
});
