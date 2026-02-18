import { AuthModule } from 'src/auth/auth.module';
import { ProductModule } from 'src/product/product.module';

import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { ProviderContactsModule } from './providerContacts/providerContacts.module';
import { ProviderResolvers } from './provider.resolvers';
import { ProviderService } from './provider.service';

@Module({
  providers: [ProviderResolvers, ProviderService],
  imports: [PrismaModule, AuthModule, ProviderContactsModule, ProductModule],
})
export class ProviderModule {}
