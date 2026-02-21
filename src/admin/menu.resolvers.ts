import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import {
  Menu,
  MenuInput,
  MenuListInput,
  MenuResponsePaginated,
} from 'src/graphql.schema';
import { PubSub } from 'graphql-subscriptions';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Role, Roles } from 'src/auth/decorators/roles.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CompanyPermissionsService } from 'src/company/companyPermissions/companyPermissions.service';

import { UseGuards } from '@nestjs/common';

import { MenuService } from './menu.service';

@Roles(Role.ADMIN)
@Resolver('Menu')
export class MenuResolvers {
  private readonly pubSub = new PubSub();
  constructor(
    private readonly menuService: MenuService,
    private readonly companyPermissionService: CompanyPermissionsService,
  ) {}

  @Roles(Role.USER)
  @Query('listMenus')
  async listMenus(
    @Args('input') input: MenuListInput,
    @CurrentUser() user: any,
  ): Promise<MenuResponsePaginated> {
    return await this.menuService.findAll({ input, user });
  }

  @Mutation('createMenu')
  async createMenu(@Args('input') input: MenuInput): Promise<Menu> {
    const menu = await this.menuService.create({ input });

    await this.pubSub.publish('menuChanged', { menu });

    return menu;
  }

  @Mutation('updateMenu')
  async updateMenu(
    @Args('id') id: number,
    @Args('input') input: MenuInput,
  ): Promise<Menu> {
    const menu = await this.menuService.update({ id, input });

    await this.pubSub.publish('menuChanged', { menu });

    return menu;
  }

  @Mutation('deleteMenu')
  async deleteMenu(@Args('id') id: number): Promise<string> {
    const response = await this.menuService.delete(id);

    await this.pubSub.publish('menuChanged', { menu: null });

    return response;
  }

  @Mutation('restoreMenu')
  async restoreMenu(@Args('id') id: number): Promise<string> {
    const response = await this.menuService.restore(id);

    await this.pubSub.publish('menuChanged', { menu: null });

    return response;
  }

  @Subscription('menuChanged')
  menuChanged() {
    return this.pubSub.asyncIterableIterator('menuChanged');
  }

  @ResolveField('subMenu')
  async getSubMenu(@Parent() menu: Menu) {
    return await this.menuService.findSubMenu(menu.id);
  }

  @UseGuards(GqlAuthGuard)
  @ResolveField('userPermission')
  async getUserPermission(@Parent() menu: Menu, @CurrentUser() user: any) {
    return await this.companyPermissionService.findMenuPermissionsByUser({
      menuId: menu.id,
      userId: user.id,
    });
  }
}
