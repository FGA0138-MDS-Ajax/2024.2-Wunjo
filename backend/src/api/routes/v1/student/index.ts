import { authMiddleware } from '@/api/middlewares';
import { Router } from 'express';
import auth from './auth';
import meRoute from './me-route';

const route = Router({ mergeParams: true });

route.get('/me', authMiddleware, meRoute);
route.use('/auth', auth);

export default route;
