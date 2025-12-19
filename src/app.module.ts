import { GraphQLFormattedError } from 'graphql';

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

import { GqlAuthGuard } from './auth/guards/gql-auth.guard';
import { PermissionsGuard } from './auth/guards/permissions.guard';
import { ClientContactsModule } from './client/clientContacts/clientContacts.module';
import { ClientRolesModule } from './client/clientRoles/clientRoles.module';
import { CompanyPermissionsModule } from './company/companyPermissions/companyPermissions.module';
import { CompanyRoleModule } from './company/companyRole/companyRole.module';
import { ProviderContactsModule } from './provider/providerContacts/providerContacts.module';
import { UserContactsModule } from './user/userContacts/userContacts.module';
import { UserRoleModule } from './user/userRole/userRole.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';
import { CompanyModule } from './company/company.module';
import { OfficeModule } from './office/office.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProviderModule } from './provider/provider.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AdminModule,
    AuthModule,
    CompanyModule,
    ClientModule,
    ClientContactsModule,
    ClientRolesModule,
    CompanyPermissionsModule,
    CompanyRoleModule,
    OfficeModule,
    ProviderModule,
    ProviderContactsModule,
    UserModule,
    UserContactsModule,
    UserRoleModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
      subscriptions: {
        'subscriptions-transport-ws': {
          onConnect: (context: any) => {
            const { connectionParams } = context;

            return {
              req: {
                headers: {
                  authorization:
                    connectionParams?.Authorization ??
                    connectionParams?.authorization,
                },
              },
            };
          },
        },
      },
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      formatError: (error: GraphQLFormattedError) => {
        const originalError = error?.extensions?.originalError as {
          message: string;
          statusCode: number;
        };

        return {
          message: error.message,
          code: error.extensions?.code || 'INTERNAL_SERVER_ERROR',
          status: originalError?.statusCode || 500,
        };
      },
      context: ({ req, extra }) => {
        if (extra) {
          return { req: extra.req };
        }
        return { req };
      },
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GqlAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
  ],
})
export class AppModule {}
