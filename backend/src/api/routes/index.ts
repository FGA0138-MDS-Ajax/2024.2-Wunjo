import { Router } from 'express';
import health from './health';
import question from './v1/question';
import student from './v1/student';
import subject from './v1/subject';

const route = Router({ mergeParams: true });

route.get('/health', health);
route.use('/api/v1/student', student);
route.use('/api/v1/question', question);
route.use('/api/v1/subject', subject);

export default route;
