import { env } from 'prisma/config';

import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const adapter = new PrismaMariaDb({
      host: env('DATABASE_HOST'),
      user: env('DATABASE_USER'),
      //password: env('DATABASE_PASSWORD'),
      database: env('DATABASE_NAME'),
      connectionLimit: 5,
    });

    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
