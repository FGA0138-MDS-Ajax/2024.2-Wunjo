import { Router } from 'express';
import health from './health';
import question from './v1/question';
import student from './v1/student';

const route = Router({ mergeParams: true });

route.get('/health', health);
route.use('/api/v1/student', student);
route.use('/api/v1/question', question);

export default route;
