export const Course = {
  ENG: 'ENG',
  SOFTWARE: 'SOFTWARE',
  AEROSPACE: 'AEROSPACE',
  ENERGY: 'ENERGY',
  AUTOMOTIVE: 'AUTOMOTIVE',
  ELETRONIC: 'ELETRONIC',
} as const;
export type Courses = keyof typeof Course;

export type StudentSeason = {
  id: string;
  seasonId: string;
  studentId: string;
  points: number;
  createdAt: Date;
  updatedAt: Date;
};

export const StudentRegistrationStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
} as const;

export const PersonTypes = {
  STUDENT: 'STUDENT',
  TUTOR: 'TUTOR',
} as const;

export type PersonType = keyof typeof PersonTypes;

export type StudentRegistrationStatuses =
  keyof typeof StudentRegistrationStatus;

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
  password: string;
  createdAt: Date;
  updatedAt: Date;
};
