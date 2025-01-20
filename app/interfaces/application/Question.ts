export const QuestionStatuses = {
  OPEN: 'OPEN',
  IN_PROGRESS: 'IN_PROGRESS',
  FINISHED: 'FINISHED',
} as const;

export type IQuestionStatus = keyof typeof QuestionStatuses;

export const QuestionUrgencies = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
} as const;

export const QuestionUrgencyLabels = {
  [QuestionUrgencies.LOW]: 'Baixo',
  [QuestionUrgencies.MEDIUM]: 'Médio',
  [QuestionUrgencies.HIGH]: 'Alto',
};

export type IQuestionUrgency = keyof typeof QuestionUrgencies;

export const QuestionDifficulties = {
  EASY: 'EASY',
  MEDIUM: 'MEDIUM',
  HARD: 'HARD',
} as const;

export const QuestionDificultyLabels = {
  [QuestionDifficulties.EASY]: 'Fácil',
  [QuestionDifficulties.MEDIUM]: 'Médio',
  [QuestionDifficulties.HARD]: 'Difícil',
};

export type IQuestionDifficulty = keyof typeof QuestionDifficulties;

export type ITutor = {
  id: string;
  avaliation: number;
  chatRoomId: string;
};

export type IQuestion = {
  id: string;
  subjectId: string;
  studentId: string;
  tutorId: string;
  title: string;
  description: string;
  points: number;
  status: IQuestionStatus;
  difficulty: IQuestionDifficulty;
  urgency: IQuestionUrgency;
  tutors: Array<ITutor>;
};
