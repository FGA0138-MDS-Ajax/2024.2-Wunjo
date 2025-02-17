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

export type IStudentSeason = {
  id: string;
  seasonId: string;
  studentId: string;
  points: number;
  createdAt: string;
  updatedAt: string;
};

export type ISeason = {
  id: string;
  name: string;
  period: string;
  createdAt: string;
  updatedAt: string;
};
