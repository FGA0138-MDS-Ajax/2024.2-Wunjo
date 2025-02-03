import { authMiddleware } from '@/api/middlewares';
import { Router } from 'express';
import getAllRoute from './get-all-route';
import getRoute from './get-route';

const route = Router({ mergeParams: true });

route.get('', authMiddleware, getAllRoute);
route.get('/:id', authMiddleware, getRoute);

export default route;
