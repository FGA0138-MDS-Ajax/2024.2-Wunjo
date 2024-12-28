import { Router } from 'express';
import loginRoute from './login-route';
import registerRoute from './register-route';

const route = Router({ mergeParams: true });

route.post('/login', loginRoute);
route.post('/register', registerRoute);

export default route;
