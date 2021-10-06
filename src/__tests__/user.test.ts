import { graphql, GraphQLSchema } from 'graphql';
import { Connection, createConnection } from 'typeorm';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import { buildSchema } from 'type-graphql';

describe('testing users resolver', () => {
    let connection: Connection;
    let schema: GraphQLSchema;

    beforeAll(async () => {
        connection = await createConnection({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'docker',
            database: 'tokenlab_test',
            entities: [__dirname + '/../models/*.ts'],
        });
        schema = await buildSchema({
            resolvers: [__dirname + '/../resolvers/*.ts'],
            authChecker: ensureAuthenticated,
        });
    });

    afterAll(async () => {
        await connection.close();
    });

    it('create user', async () => {
        const createUser = `
          mutation {
              createUser(
                  name: "user",
                  email: "user@mail.com",
                  password: "user123"
              ) {
                  id
              }
          }`;
        const response = await graphql(schema, createUser);
        console.log(response);
    });
});
