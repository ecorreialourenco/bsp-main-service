import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {
  Menu,
  MenuInput,
  MenuListInput,
  MenuResponsePaginated,
} from 'src/graphql.schema';
import { Public } from 'src/auth/decorators/public.decorator';
import { Role, Roles } from 'src/auth/decorators/roles.decorator';

import { MenuService } from './menu.service';

@Roles(Role.ADMIN)
@Resolver('Menu')
export class MenuResolvers {
  constructor(private readonly menuService: MenuService) {}

  @Public()
  @Query('listMenus')
  async listMenus(
    @Args('input') input: MenuListInput,
  ): Promise<MenuResponsePaginated> {
    return await this.menuService.findAll({ input });
  }

  @Mutation('createMenu')
  async createMenu(@Args('input') input: MenuInput): Promise<Menu> {
    return await this.menuService.create({ input });
  }

  @Mutation('updateMenu')
  async updateMenu(
    @Args('id') id: number,
    @Args('input') input: MenuInput,
  ): Promise<Menu> {
    return await this.menuService.update({ id, input });
  }

  @Mutation('deleteMenu')
  async deleteMenu(@Args('id') id: number): Promise<string> {
    return await this.menuService.delete(id);
  }

  @Mutation('restoreMenu')
  async restoreMenu(@Args('id') id: number): Promise<string> {
    return await this.menuService.restore(id);
  }

  @ResolveField('subMenu')
  async getSubMenu(@Parent() menu: Menu) {
    return await this.menuService.findSubMenu(menu.id);
  }
}
