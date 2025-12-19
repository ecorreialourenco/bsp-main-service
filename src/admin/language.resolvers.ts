import {
  Language,
  LanguageInput,
  LanguagesResponsePaginated,
  LanguageListInput,
} from 'src/graphql.schema';
import { PubSub } from 'graphql-subscriptions';
import { Public } from 'src/auth/decorators/public.decorator';
import { Role, Roles } from 'src/auth/decorators/roles.decorator';

import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';

import { LanguageService } from './languagues.service';

@Roles(Role.ADMIN)
@Resolver('Language')
export class LanguageResolvers {
  private readonly pubSub = new PubSub();
  constructor(private readonly languageService: LanguageService) {}

  @Public()
  @Query('listLanguages')
  async listLanguages(
    @Args('input') input: LanguageListInput,
  ): Promise<LanguagesResponsePaginated> {
    return await this.languageService.findAll({ input });
  }

  @Mutation('createLanguage')
  async createLanguage(@Args('input') input: LanguageInput): Promise<Language> {
    const language = await this.languageService.create({ input });

    await this.pubSub.publish('languageChanged', {
      languageChanged: language,
    });

    return language;
  }

  @Mutation('updateLanguage')
  async updateLanguage(
    @Args('id') id: number,
    @Args('input') input: LanguageInput,
  ): Promise<Language | null> {
    const language = await this.languageService.update({ id, input });

    await this.pubSub.publish('languageChanged', {
      languageChanged: language,
    });

    return language;
  }

  @Subscription('languageChanged')
  languageChanged() {
    return this.pubSub.asyncIterableIterator('languageChanged');
  }
}
