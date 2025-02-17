import { authMiddleware } from '@/api/middlewares';
import { Router } from 'express';
import getAllRoute from './get-all-route';

const route = Router({ mergeParams: true });

route.get('', authMiddleware, getAllRoute);

export default route;
