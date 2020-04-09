import { ApolloServer } from 'apollo-server-express';
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { AuthResoler } from './graphql/resolver/AuthResolver';
import { TapeResolver } from './graphql/resolver/TapeResolver';
import { UserResolver } from './graphql/resolver/UserResolver';
import myContainer from "./inversify.config";

const cors = require("cors");
const app = express();
app.use("*", cors());
app.use(bodyParser());
app.options("*", cors()); // include before other routes

dotenv.config();




(async () => {
    const apolloServer = new ApolloServer({
        schema: await buildSchema(
            {
                resolvers: [TapeResolver, UserResolver, AuthResoler],
                container: myContainer
            }
        ),
        context: ({req, res}) => ({req, res})
    });
    apolloServer.applyMiddleware({app});
    app.listen(3000, () => console.log("Listenging"));
})();



