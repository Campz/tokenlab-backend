import { Field, ObjectType } from 'type-graphql';
import User from './User';

@ObjectType()
class Session {
    @Field()
    user: User;

    @Field()
    token: string;
}

export default Session;
