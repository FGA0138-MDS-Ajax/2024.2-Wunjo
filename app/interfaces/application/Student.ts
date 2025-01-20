import { ICourse } from './Course';
import { IStudentStatus } from './StudentStatus';

export type IStudent = {
  id: string;
  registration: string;
  status: IStudentStatus;
  course: ICourse;
  name: string;
  email: string;
  avatar: string;
  avatarUrl: string;
  rankingParticipant: boolean;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};
