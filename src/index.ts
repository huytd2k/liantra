import { TagToTape } from './model/TagToTape';
import { createTagsLoader } from './util/createDataLoader';
import { customAuthChecker } from './middleware/customAuthChecker';
import { ApolloServer } from 'apollo-server-express';
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from 'typeorm';
import { AuthResolver } from './graphql/resolver/AuthResolver';
import { TapeResolver } from './graphql/resolver/TapeTagResolver';
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
const corsOption = {
    origin: "http://localhost:3000",
    credentials: true,
}
app.use(cors(corsOption));
app.use(bodyParser());
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
            "entities": [User, Tape, Tag, TagToTape],
            "synchronize": true
         }
    );

    const apolloServer = new ApolloServer({
        schema: await buildSchema(
            {
                resolvers: [TapeResolver, UserResolver, AuthResolver],
                container: myContainer,
                authChecker: customAuthChecker,   
                 // globalMiddlewares: [ErrorBlocking],
            }
        ),
        context: ({req, res}) => ({req, res, tagsLoader: createTagsLoader()}),
        
    });

    apolloServer.applyMiddleware({app, cors: corsOption});
    app.listen(8000, () => console.log("Listening"));
})();



