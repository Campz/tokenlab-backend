import 'reflect-metadata';
import './database';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from 'type-graphql';
import UserResolver from './resolvers/UserResolver';

async function main() {
    const app = express();

    const server = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver],
        }),
    });

    await server.start();

    server.applyMiddleware({ app, path: '/graphql' });

    app.listen(3333, () => {
        console.log('Server started on port 3333!');
    });
}

main();
