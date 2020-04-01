import { RegistableController } from './controller/RegistableController';
import express from "express";
import bodyParser from 'body-parser';
import TYPES from "./types";
import {Container} from 'inversify';
import "reflect-metadata"


const app = express();
import myContainer from './inversify.config';
app.use(bodyParser()); //* Use body parser to get JSON body




const controllers: RegistableController[] = myContainer.getAll<RegistableController>(TYPES.RegistableController);
controllers.forEach(controller => controller.register(app));
app.listen(3000, () => console.log("Listenging"));