import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Public } from './decorators/public.decorator';
import { SignupInput, LoginInput, User } from '../graphql.schema';
import { AuthService } from './auth.service';

@Resolver('Auth')
export class AuthResolvers {
  constructor(private readonly AuthService: AuthService) {}

  @Public()
  @Query('checkUsername')
  async checkUsername(@Args('username') username: string): Promise<boolean> {
    return await this.AuthService.findUsername(username);
  }

  @Public()
  @Mutation('login')
  async login(
    @Args('input') { username, password }: LoginInput,
  ): Promise<string> {
    const loginData = await this.AuthService.login(username, password);
    return loginData;
  }

  @Public()
  @Mutation('signup')
  async signup(@Args('input') args: SignupInput): Promise<User | null> {
    return await this.AuthService.signup(args);
  }
}
