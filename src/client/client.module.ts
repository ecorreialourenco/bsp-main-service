import { AuthModule } from 'src/auth/auth.module';

import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { ClientContactsModule } from './clientContacts/clientContacts.module';
import { ClientRolesModule } from './clientRoles/clientRoles.module';
import { ClientResolvers } from './client.resolvers';
import { ClientService } from './client.service';

@Module({
  providers: [ClientResolvers, ClientService],
  imports: [PrismaModule, AuthModule, ClientContactsModule, ClientRolesModule],
})
export class ClientModule {}
