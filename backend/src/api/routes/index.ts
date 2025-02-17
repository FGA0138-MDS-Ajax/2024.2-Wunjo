import { Router } from 'express';
import health from './health';
import chat from './v1/chat';
import question from './v1/question';
import ranking from './v1/ranking';
import student from './v1/student';
import subject from './v1/subject';

const route = Router({ mergeParams: true });

route.get('/health', health);
route.use('/api/v1/student', student);
route.use('/api/v1/question', question);
route.use('/api/v1/chat', chat);
route.use('/api/v1/subject', subject);
route.use('/api/v1/ranking', ranking);

export default route;
