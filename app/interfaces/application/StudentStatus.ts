export const StudentStatuses = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
} as const;

export type IStudentStatus = keyof typeof StudentStatuses;
