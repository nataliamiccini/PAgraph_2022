import * as express from 'express';
import * as Service from './services/service'
import {Req} from './services/request'
import {MapValue} from './services/map'
import { Request } from "express"
import * as middleware from './auth/middleware';
import logger from 'jet-logger';
import apiRouterJWT from './routes/api-jwt'
import apiRouter from './routes/api'
logger.info(process.env.KEY);

const app = express();

app.use(express.json());
app.use('/apiJWT', apiRouterJWT);
app.use('/api', apiRouter);


app.listen(8080 ,()=> console.log("Listening on port 8080"))