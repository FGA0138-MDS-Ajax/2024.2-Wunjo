import type { Question } from './Question';

export const Course = {
  ENG: 'ENGENHARIAS',
  SOFTWARE: 'ENGENHARIA DE SOFTWARE',
  AEROSPACE: 'ENGENHARIA AEROESPACIAL',
  ENERGY: 'ENGENHARIA DE ENERGIA',
  AUTOMOTIVE: 'ENGENHARIA AUTOMOTIVA',
  ELETRONIC: 'ENGENHARIA ELETRONICA',
};
export type Courses = keyof typeof Course;

export type Season = {
  id: string;
  name: string;
  period: string;
};

export const StudentRegistrationStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
};

export type StudentRegistrationStatuses = keyof typeof StudentRegistrationStatus;

export type Student = {
  id: string;
  registration: string;
  status: StudentRegistrationStatuses;
  course: Courses;
  name: string;
  email: string;
  avatar: string;
  avatarUrl: string;
  rankingParticipant: boolean;
  seasons: Array<Season>;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  questions: Array<Question>;
};
