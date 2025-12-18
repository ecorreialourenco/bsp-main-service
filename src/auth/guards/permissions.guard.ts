import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';

import { PermissionAction } from '../decorators/permissions.decorator';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const required = this.reflector.get<{
      menuSlug: string;
      action: PermissionAction;
    }>('permission', context.getHandler());

    if (!required) return true;

    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;
    if (!user) {
      throw new ForbiddenException();
    }

    const userRole = await this.prisma.userRoles.findFirst({
      where: { userId: user.id },
    });

    const menu = await this.prisma.menu.findUnique({
      where: { slug: required.menuSlug },
    });

    if (!userRole || !menu) {
      throw new ForbiddenException();
    }

    const permission = await this.prisma.companyPermissions.findFirst({
      where: {
        companyRoleId: userRole.companyRoleId,
        menuId: menu.id,
      },
    });

    if (!permission) {
      throw new ForbiddenException();
    }

    return permission[required.action] === true;
  }
}
