import { Router } from 'express';
import getAllRoute from './get-all-route';

const route = Router({ mergeParams: true });

route.get('', getAllRoute);

export default route;
