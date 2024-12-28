export const QuestionStatus = {
  OPEN: 'OPEN',
  IN_PROGRESS: 'IN_PROGRESS',
  FINISHED: 'FINISHED',
} as const;

export type QuestionStatuses = keyof typeof QuestionStatus;

export const QuestionUrgency = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
};
export type QuestionUrgencies = keyof typeof QuestionUrgency;

export const QuestionDifficulty = {
  EASY: 'EASY',
  MEDIUM: 'MEDIUM',
  HARD: 'HARD',
};

export type QuestionDifficulties = keyof typeof QuestionDifficulty;

export type Tutor = {
  id: string;
  avaliation: number;
  chatRoomId: string;
};

export type Question = {
  id: string;
  subjectId: string;
  studentId: string;
  tutorId: string;
  title: string;
  description: string;
  points: number;
  status: QuestionStatuses;
  difficulty: QuestionDifficulties;
  urgency: QuestionUrgencies;
  tutors: Array<Tutor>;
};
