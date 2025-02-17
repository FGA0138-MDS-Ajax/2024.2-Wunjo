import { Router } from 'express';
import loginRoute from './login-route';
import registerConfirmRoute from './register-confirm-route';
import registerRoute from './register-route';
import forgotPasswordRoutes from './forgot-password';
import sendToken from './send-token';

const route = Router({ mergeParams: true });

route.post('/login', loginRoute);
route.post('/register', registerRoute);
route.get('/register/confirm/:code', registerConfirmRoute);
route.use('/forgot-password', forgotPasswordRoutes);
route.post('/send-token', sendToken);

export default route;
