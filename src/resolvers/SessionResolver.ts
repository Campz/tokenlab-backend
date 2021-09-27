import {
    Mutation,
    Resolver,
    Arg,
    Query,
    ObjectType,
    Field,
} from 'type-graphql';
import Session from '../models/Session';
import AuthenticateUserService from '../services/AuthenticateUserService';

@Resolver()
class SessionResolve {
    @Mutation(() => Session)
    async createSession(
        @Arg('email') email: string,
        @Arg('password') password: string,
    ) {
        const authenticateUser = new AuthenticateUserService();

        const { user, token } = await authenticateUser.execute({
            email,
            password,
        });

        delete user.password;

        return { user, token };
    }
}

export default SessionResolve;
