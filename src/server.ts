import 'reflect-metadata';
import './database';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from 'type-graphql';
import ensureAuthenticated from './middlewares/ensureAuthenticated';

import UserResolver from './resolvers/UserResolver';
import SessionResolve from './resolvers/SessionResolver';
import EventResolver from './resolvers/EventResolver';

async function main() {
    const app = express();

    const server = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver, SessionResolve, EventResolver],
            authChecker: ensureAuthenticated,
        }),
        context: ({ req }) => {
            const context = {
                req,
                token: req?.headers?.authorization,
            };

            return context;
        },
    });

    await server.start();

    server.applyMiddleware({ app, path: '/graphql' });

    app.listen(3333, () => {
        console.log('Server started on port 3333!');
    });
}

main();
