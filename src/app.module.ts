import { GraphQLFormattedError } from 'graphql';

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { GqlAuthGuard } from './auth/guards/gql-auth.guard';
import { PermissionsGuard } from './auth/guards/permissions.guard';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.model';
import { OfficeModule } from './office/office.model';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthModule,
    CompanyModule,
    OfficeModule,
    UserModule,
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
      formatError: (error: GraphQLFormattedError) => {
        const originalError = error.extensions?.originalError as {
          message: string;
          statusCode: number;
        };

        return {
          message: error.message,
          code: error.extensions?.code || 'INTERNAL_SERVER_ERROR',
          status: originalError.statusCode || 500,
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
