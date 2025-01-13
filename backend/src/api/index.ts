import 'express-async-errors';
// eslint-disable-next-line perfectionist/sort-imports
import setupSwagger from '@/infra/docs/swagger';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { errorHandler } from './middlewares/error-handler';
import route from './routes';

const api = express();

api.use(cors({ origin: '*' }));
api.use(helmet());
api.use(express.json());
api.use(express.urlencoded({ extended: true }));

api.use(route);

setupSwagger(api);

api.use(errorHandler);

export { api };
