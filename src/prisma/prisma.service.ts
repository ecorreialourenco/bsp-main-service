import { Pool } from 'pg';
import { env } from 'prisma/config';

import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

process.loadEnvFile();

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    // 1. Criamos o pool de conexões apontando para o .env
    const pool = new Pool({
      connectionString: env('DATABASE_URL'),
      max: 5, // Limite de conexões em simultâneo
    });

    // 2. Inicializamos o adaptador de Postgres do Prisma
    const adapter = new PrismaPg(pool);

    // 3. Passamos o adaptador para o construtor do PrismaClient
    super({ adapter });
  }

  async onModuleInit() {
    // Liga à base de dados quando o módulo do NestJS arrancar
    await this.$connect();
  }
}
