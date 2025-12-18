import path from 'node:path';
import { defineConfig, env } from 'prisma/config';

process.loadEnvFile();

export default defineConfig({
  schema: path.join('prisma', ''),
  datasource: {
    url: env('DATABASE_URL'),
  },
});
