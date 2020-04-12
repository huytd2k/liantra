import { customAuthChecker } from './middleware/customAuthChecker';
import { ApolloServer } from 'apollo-server-express';
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from 'typeorm';
import { AuthResoler } from './graphql/resolver/AuthResolver';
import { TapeResolver } from './graphql/resolver/TapeResolver';
import { UserResolver } from './graphql/resolver/UserResolver';
import myContainer from "./inversify.config";
import redis from 'redis';
import redisConnector from 'connect-redis';
import session from 'express-session';
import { User } from './model/User';
import { Tape } from './model/Tape';
import { Tag } from './model/Tag';

const cors = require("cors");
const app = express();
const RedisClient = redis.createClient();
const RedisStore = redisConnector(session);
RedisClient.on("error", function(error : any) {
  console.error(error);
});

app.use("*", cors());
app.use(bodyParser());
app.options("*", cors()); // include before other routes
app.use(
    session(
        {
            store: new RedisStore({ client: RedisClient }),
            secret: "Secret",
            resave: false,
        }
    )
)
dotenv.config();

(async () => {
    await createConnection(
        {
            "type": "postgres",
            "host": "localhost",
            "port": 5432,
            "username": "postgres",
            "password": "huy221100",
            "database": "liantra",
            "entities": [User, Tape, Tag],
            "synchronize": true
         }
    );
    const apolloServer = new ApolloServer({
        schema: await buildSchema(
            {
                resolvers: [TapeResolver, UserResolver, AuthResoler],
                container: myContainer,
                authChecker: customAuthChecker,             // globalMiddlewares: [ErrorBlocking],
            }
        ),
        context: ({req, res}) => ({req, res})
    });
    apolloServer.applyMiddleware({app});
    app.listen(3000, () => console.log("Listenging"));
})();



