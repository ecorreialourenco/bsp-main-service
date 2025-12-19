import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';

import { Module } from '@nestjs/common';

import { ProviderContactsResolvers } from './providerContacts.resolvers';
import { ProviderContactsService } from './providerContacts.service';

@Module({
  providers: [ProviderContactsResolvers, ProviderContactsService],
  imports: [PrismaModule, AuthModule],
  exports: [ProviderContactsService],
})
export class ProviderContactsModule {}
