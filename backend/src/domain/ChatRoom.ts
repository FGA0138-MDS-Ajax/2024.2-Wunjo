import { Message } from './Message';

export type ChatRoom = {
  id: string;
  studentId: string;
  tutorId: string;
  messages: Message[];
};
