import { User, UserContacts, ContactType } from '@prisma/client';

export const userStub = (): User => ({
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  userName: 'jDoe',
  password: '123',
  isActive: true,
  isAdmin: false,
  companyId: 1,
  employeeNr: 1,
  address: '123 Main St',
  city: 'Metropolis',
  state: 'NY',
  country: 'USA',
  zipCode: '12345',
  createdAt: new Date('2025-09-14T18:07:10.598+00:00'),
  updatedAt: new Date('2025-09-14T18:07:10.598+00:00'),
  deletedAt: null,
});

export const userListStub = (): User[] => [
  {
    ...userStub(),
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    userName: 'jDoe',
  },
  {
    ...userStub(),
    id: 2,
    firstName: 'Jane',
    lastName: 'Doe',
    userName: 'janedoe',
    companyId: 3,
  },
  {
    ...userStub(),
    id: 3,
    firstName: 'Marie',
    lastName: 'Smith',
    userName: 'mSmith',
  },
  {
    ...userStub(),
    id: 4,
    firstName: 'Albert',
    lastName: 'Frank',
    userName: 'alFra',
    companyId: 2,
  },
];

export const userContactsListStub = (): UserContacts[] => [
  {
    id: 1,
    contact: 'email@emal.com',
    type: ContactType.Email,
    userId: 1,
    createdAt: new Date('2025-09-14T18:07:10.598+00:00'),
    updatedAt: new Date('2025-09-14T18:07:10.598+00:00'),
    deletedAt: null,
  },
];
