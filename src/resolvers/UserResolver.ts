import { Mutation, Resolver, Arg, Query, Authorized } from 'type-graphql';
import { getRepository } from 'typeorm';
import User from '../models/User';
import CreateUserService from '../services/CreateUserService';

@Resolver()
class UserResolver {
    @Query(() => [User]!)
    @Authorized()
    async users() {
        const usersRepository = getRepository(User);

        const users = await usersRepository.find();

        return users;
    }

    @Mutation(() => User)
    async createUser(
        @Arg('name') name: string,
        @Arg('email') email: string,
        @Arg('password') password: string,
    ) {
        const userService = new CreateUserService();

        const createdUser = await userService.execute({
            name,
            email,
            password,
        });

        return createdUser;
    }
}

export default UserResolver;
