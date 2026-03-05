import { faker } from '@faker-js/faker';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '@prisma/client';

import 'dotenv/config';

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionLimit: 50,
});

const prisma = new PrismaClient({ adapter });
const getContact = () => {
  const contactType = faker.helpers.arrayElement([
    'Email',
    'Fax',
    'Phone',
    'Mobile',
  ]);

  const contact =
    contactType === 'Email' ? faker.internet.email() : faker.phone.number();

  return { contact, contactType };
};

const roleData = (name: string, companyId: number) => {
  const min = Number(faker.commerce.price({ min: 900, max: 2000 }));
  const max = Number(faker.commerce.price({ min: min + 1, max: 5000 }));
  return { companyId, name, minWages: min, maxWages: max };
};

const NUM_COMPANIES = 20;
const NUM_USERS = 20;
const NUM_CATEGORIES = 20;
const NUM_PRODUCTS = 500;
const NUM_PRODUCT_TYPES = 20;
const NUM_PROVIDERS = 20;
const NUM_CLIENTS = 50;

async function main() {
  console.log('Start loading data...');

  const language = await prisma.language.create({
    data: { code: 'en-gb', name: 'English', isAvailable: true },
  });

  await prisma.menu.createMany({
    data: [
      {
        slug: 'dashboard',
        name: 'Dashboard',
        isVisible: true,
        order: 1,
        icon: 'grip',
      },
      {
        slug: 'clients',
        name: 'Clients',
        isVisible: true,
        order: 2,
        icon: 'user',
      },
      {
        slug: 'providers',
        name: 'Providers',
        isVisible: true,
        order: 3,
        icon: 'industry',
      },
      {
        slug: 'products',
        name: 'Products',
        isVisible: true,
        order: 4,
        icon: 'cart-flatbed-suitcase',
      },
      {
        slug: 'company',
        name: 'Company',
        isVisible: true,
        order: 5,
        icon: 'landmark',
      },
      {
        slug: 'company-info',
        name: 'Info',
        isVisible: true,
        onlyAdmin: false,
        order: 1,
        parentId: 5,
        icon: 'screwdriver-wrench',
      },
      {
        slug: 'offices',
        name: 'Offices',
        isVisible: true,
        order: 2,
        parentId: 5,
        icon: 'building',
      },
      {
        slug: 'users',
        name: 'Users',
        isVisible: true,
        order: 3,
        parentId: 5,
        icon: 'users',
      },
      {
        slug: 'company-roles',
        name: 'Roles',
        isVisible: true,
        onlyAdmin: false,
        order: 4,
        parentId: 5,
        icon: 'screwdriver-wrench',
      },
      {
        slug: 'company-languages',
        name: 'Languages',
        isVisible: true,
        onlyAdmin: false,
        order: 5,
        parentId: 5,
        icon: 'screwdriver-wrench',
      },
      {
        slug: 'admin',
        name: 'Admin',
        isVisible: true,
        onlyAdmin: true,
        order: 6,
        icon: 'screwdriver-wrench',
      },
      {
        slug: 'admin-languages',
        name: 'Languages',
        isVisible: true,
        onlyAdmin: true,
        order: 1,
        parentId: 11,
        icon: 'screwdriver-wrench',
      },
      {
        slug: 'admin-menu',
        name: 'Menu',
        isVisible: true,
        onlyAdmin: true,
        order: 2,
        parentId: 11,
        icon: 'screwdriver-wrench',
      },
    ],
  });

  const menu = await prisma.menu.findMany();

  for (let i = 0; i < faker.number.int({ min: 1, max: NUM_COMPANIES }); i++) {
    console.log(`Company ${i}...`);
    const company = await prisma.company.create({
      data: {
        name: faker.company.name(),
        website: faker.internet.url(),
        currency: faker.finance.currencyCode(),
      },
    });

    const office = await prisma.office.create({
      data: {
        name: faker.company.name(),
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        country: faker.location.country(),
        zipCode: faker.location.zipCode(),
        companyId: company.id,
      },
    });

    await prisma.companyRoles.createMany({
      data: [
        roleData('CEO', company.id),
        roleData('Sales', company.id),
        roleData('Technical', company.id),
      ],
    });

    const roles = await prisma.companyRoles.findMany({
      where: { companyId: company.id },
    });

    await prisma.$transaction(
      roles.flatMap((role) =>
        menu.map((m) =>
          prisma.companyPermissions.create({
            data: {
              menuId: m.id,
              companyRoleId: role.id,
              read: faker.datatype.boolean(),
              createUpdate: faker.datatype.boolean(),
              delete: faker.datatype.boolean(),
            },
          }),
        ),
      ),
    );

    const companyLang = await prisma.companyLanguages.create({
      data: {
        companyId: company.id,
        languageId: language.id,
      },
    });

    await prisma.companyClientRole.createMany({
      data: [
        { name: 'regular', companyId: company.id },
        { name: 'reseller', companyId: company.id },
        { name: 'partner', companyId: company.id },
      ],
    });
    const companyClientRoles = await prisma.companyClientRole.findMany({
      where: { companyId: company.id },
    });

    for (let j = 0; j < faker.number.int({ min: 1, max: NUM_USERS }); j++) {
      console.log(`Company ${i} - User ${j} ...`);
      const user = await prisma.user.create({
        data: {
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          userName: faker.internet.username(),
          address: faker.location.streetAddress(),
          city: faker.location.city(),
          state: faker.location.state(),
          country: faker.location.country(),
          zipCode: faker.location.zipCode(),
          companyId: company.id,
          password:
            '$2b$10$JvsYZ8XZE/FDhYyrR6PPb.Lc5EZ1hUZ9DpArn3T3ZKY9OW8L6k1dO',
          employeeNr: j + 1,
        },
      });

      await prisma.userRoles.create({
        data: {
          userId: user.id,
          companyRoleId: roles[Math.ceil(Math.random() * roles.length) - 1].id,
        },
      });
    }

    for (
      let j = 0;
      j < faker.number.int({ min: 1, max: NUM_CATEGORIES });
      j++
    ) {
      const category = await prisma.category.create({
        data: {
          companyId: company.id,
        },
      });

      await prisma.categoryName.create({
        data: {
          name: faker.commerce.productAdjective(),
          categoryId: category.id,
          companyLanguageId: companyLang.id,
        },
      });
    }

    for (
      let j = 0;
      j < faker.number.int({ min: 1, max: NUM_PRODUCT_TYPES });
      j++
    ) {
      const productType = await prisma.productType.create({
        data: {
          companyId: company.id,
        },
      });

      await prisma.productTypeName.create({
        data: {
          name: faker.commerce.productMaterial(),
          productTypeId: productType.id,
          companyLanguageId: companyLang.id,
        },
      });
    }

    for (let j = 0; j < faker.number.int({ min: 1, max: NUM_PROVIDERS }); j++) {
      console.log(`Company ${i} - Provider ${j} ...`);
      const provider = await prisma.provider.create({
        data: {
          name: faker.company.name(),
          providerNr: j + 1,
          website: faker.internet.url(),
          address: faker.location.streetAddress(),
          city: faker.location.city(),
          state: faker.location.state(),
          country: faker.location.country(),
          zipCode: faker.location.zipCode(),
          companyId: company.id,
        },
      });
      for (let j = 0; j < Math.ceil(Math.random() * 3); j++) {
        const { contact, contactType } = getContact();
        await prisma.providerContacts.create({
          data: {
            providerId: provider.id,
            name: faker.person.fullName(),
            contact,
            type: contactType,
          },
        });
      }
    }

    for (let j = 0; j < faker.number.int({ min: 1, max: NUM_CLIENTS }); j++) {
      const clientType = faker.helpers.arrayElement(['Company', 'Personal']);
      const randomId = Math.ceil(Math.random() * companyClientRoles.length) - 1;
      const client = await prisma.client.create({
        data: {
          name:
            clientType === 'Personal'
              ? faker.person.fullName()
              : faker.company.name(),
          clientNr: j + 1,
          type: clientType,
          address: faker.location.streetAddress(),
          city: faker.location.city(),
          state: faker.location.state(),
          country: faker.location.country(),
          zipCode: faker.location.zipCode(),
          companyId: company.id,
          companyClientRoleId: companyClientRoles[randomId].id,
        },
      });
      for (let j = 0; j < Math.ceil(Math.random() * 3); j++) {
        const { contact, contactType } = getContact();
        await prisma.clientContacts.create({
          data: {
            clientId: client.id,
            name: faker.person.fullName(),
            contact,
            type: contactType,
          },
        });
      }
    }

    const categories = await prisma.category.findMany({
      where: { companyId: company.id },
    });
    const types = await prisma.productType.findMany({
      where: { companyId: company.id },
    });
    const providers = await prisma.provider.findMany({
      where: { companyId: company.id },
    });

    for (let j = 0; j < faker.number.int({ min: 1, max: NUM_PRODUCTS }); j++) {
      console.log(`Company ${i} - Product ${j} ...`);
      const product = await prisma.products.create({
        data: {
          ref: faker.vehicle.vin(),
          companyId: company.id,
          productTypeId: types[Math.ceil(Math.random() * types.length) - 1].id,
        },
      });

      await prisma.productLanguage.create({
        data: {
          productId: product.id,
          companyLanguageId: companyLang.id,
          title: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
        },
      });

      await prisma.productPrice.create({
        data: {
          productId: product.id,
          price: parseFloat(faker.commerce.price()),
          currency: company.currency,
        },
      });

      await prisma.productStock.create({
        data: {
          officeId: office.id,
          productId: product.id,
          quantity: faker.number.int({ min: 0, max: 1000 }),
        },
      });

      const count = Math.floor(Math.random() * providers.length);
      const selectedProviders = faker.helpers.arrayElements(providers, count);
      await Promise.all(
        selectedProviders.map(async (provider) => {
          const productProvider = await prisma.productProvider.create({
            data: { productId: product.id, providerId: provider.id },
          });
          return prisma.productProviderPrices.create({
            data: {
              productProviderId: productProvider.id,
              price: parseFloat(faker.commerce.price()),
            },
          });
        }),
      );

      for (
        let k = 0;
        k < Math.ceil(Math.random() * categories.length) - 1;
        k++
      ) {
        await prisma.productCategory.create({
          data: {
            productId: product.id,
            categoryId:
              categories[Math.ceil(Math.random() * categories.length) - 1].id,
          },
        });
      }
    }
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('error', e);
    await prisma.$disconnect();
    process.exit(1);
  });
