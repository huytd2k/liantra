import { Connection } from 'typeorm';
import { RegistableController } from "./controller/RegistableController";
import express from "express";
import bodyParser from "body-parser";
import TYPES from "./types";
import "reflect-metadata";
import * as dotenv from "dotenv";
import { ApolloServer } from 'apollo-server-express'


const cors = require("cors");
const app = express();
app.use("*", cors());
app.use(bodyParser());
app.options("*", cors()); // include before other routes

dotenv.config();
import myContainer from "./inversify.config";
import { buildSchema } from "type-graphql";




const controllers: RegistableController[] = myContainer.getAll<RegistableController>(TYPES.RegistableController);
controllers.forEach(controller => controller.register(app));

(async () => {
    const apolloServer = new ApolloServer({
        schema: await buildSchema(
            {
                resolvers: ["./resolver/TapeResolver"]
            }
        ),
        context: ({req, res}) => ({req, res})
    });
    apolloServer.applyMiddleware({app});
    app.listen(3000, () => console.log("Listenging"));
})();



