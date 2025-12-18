import { Language } from '@prisma/client';

export const languageStub = (): Language[] => [
  {
    id: 1,
    code: 'en-gb',
    name: 'English',
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: 2,
    code: 'fr-fr',
    name: 'French',
    isAvailable: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
];
