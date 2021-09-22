import { Mutation, Resolver, Arg } from 'type-graphql';
import User from '../models/User';
import CreateUserService from '../services/CreateUserService';

@Resolver()
class UserResolver {
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
