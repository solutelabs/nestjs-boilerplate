import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { newUser } from './dto/create-user.dto';
import { userInput } from './dto/user-input.dto';
import { UserEntity } from './entities';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => newUser)
  async createUser(@Args('data') data: userInput) {
    return this.userService.createUser(data);
  }

  @Query(() => newUser)
  getUser(@Args('input', { type: () => String }) email: string) {
    return this.userService.findByEmail(email);
  }
}
