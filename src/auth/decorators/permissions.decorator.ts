import { SetMetadata } from '@nestjs/common';

export type PermissionAction = 'read' | 'createUpdate' | 'delete';

export const CheckPermission = (menuSlug: string, action: PermissionAction) =>
  SetMetadata('permission', { menuSlug, action });
