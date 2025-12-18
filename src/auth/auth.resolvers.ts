import {
  SignupInput,
  LoginInput,
  LoginResponse,
  UsernameValidationResponse,
  SignupResponse,
} from '../graphql.schema';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Public } from './decorators/public.decorator';
import { AuthService } from './auth.service';

@Resolver('Auth')
export class AuthResolvers {
  constructor(private readonly AuthService: AuthService) {}

  @Public()
  @Query('checkUsername')
  async checkUsername(
    @Args('username') username: string,
  ): Promise<UsernameValidationResponse> {
    return await this.AuthService.findUsername(username);
  }

  @Public()
  @Mutation('login')
  async login(
    @Args('input') { username, password }: LoginInput,
  ): Promise<LoginResponse> {
    const loginData = await this.AuthService.login(username, password);
    return loginData;
  }

  @Public()
  @Mutation('signup')
  async signup(@Args('input') args: SignupInput): Promise<SignupResponse> {
    return await this.AuthService.signup(args);
  }
}
