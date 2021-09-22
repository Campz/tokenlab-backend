import 'reflect-metadata';
import express from 'express';
import './database';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import UserResolver from './resolvers/UserResolver';

async function main() {
    const app = express();

    const server = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver],
        }),
    });

    server.applyMiddleware({ app, path: '/graphql' });

    app.listen(3333, () => {
        console.log('Server started on port 3333!');
    });
}

main();
