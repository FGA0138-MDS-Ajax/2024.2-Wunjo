import { authMiddleware } from '@/api/middlewares';
import { Router } from 'express';
import auth from './auth';
import meRoute from './me-route';
import updateRoute from './update-route';

const route = Router({ mergeParams: true });

route.get('/me', authMiddleware, meRoute);
route.put('/me', authMiddleware, updateRoute);
route.use('/auth', auth);

export default route;
