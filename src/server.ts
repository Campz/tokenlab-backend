import 'reflect-metadata';
import express from 'express';
import './database';
import { ApolloServer } from 'apollo-server-express';

async function main() {
  const app = express();

  const server = new ApolloServer({
  });

  server.applyMiddleware({ app, path: '/graphql' });

  app.listen(3333, () => {
    console.log('Server started on port 3333!');
  });
}

main();
