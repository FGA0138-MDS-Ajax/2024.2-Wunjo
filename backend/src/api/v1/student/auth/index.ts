import { Router } from 'express';
import loginRoute from './login-route';

const route = Router({ mergeParams: true });

route.post('/login', loginRoute);

export default route;
