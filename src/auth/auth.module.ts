import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Importante para o .env

import { PrismaModule } from '../prisma/prisma.module';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { PermissionsGuard } from './guards/permissions.guard';
import { AuthResolvers } from './auth.resolvers';
import { AuthService } from './auth.service';

@Module({
  imports: [
    PrismaModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_PRIVATE_KEY'),
        signOptions: {
          expiresIn: '8h',
        },
      }),
    }),
  ],
  providers: [AuthResolvers, AuthService, GqlAuthGuard, PermissionsGuard],
  exports: [AuthService, JwtModule, GqlAuthGuard, PermissionsGuard],
})
export class AuthModule {}
