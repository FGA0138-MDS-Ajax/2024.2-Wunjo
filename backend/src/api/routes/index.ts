import { Router } from 'express';
import auth from '../v1/student/auth';
import health from './health';

const route = Router({ mergeParams: true });

route.get('/health', health);
route.use('/api/v1/student/auth', auth);

export default route;
