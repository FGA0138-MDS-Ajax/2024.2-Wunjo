import { Router } from 'express';
import loginRoute from './login-route';
import registerConfirmRoute from './register-confirm-route';
import registerRoute from './register-route';

const route = Router({ mergeParams: true });

route.post('/login', loginRoute);
route.post('/register', registerRoute);
route.get('/register/confirm/:code', registerConfirmRoute);

export default route;
