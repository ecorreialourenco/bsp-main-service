import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';

import { Module } from '@nestjs/common';

import { ClientContactsResolvers } from './clientContacts.resolvers';
import { ClientContactsService } from './clientContacts.service';

@Module({
  providers: [ClientContactsResolvers, ClientContactsService],
  imports: [PrismaModule, AuthModule],
  exports: [ClientContactsService],
})
export class ClientContactsModule {}
