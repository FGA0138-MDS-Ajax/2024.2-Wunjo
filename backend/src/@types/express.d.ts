import { Student } from '@/domain';

declare global {
  declare namespace Express {
    export interface Request {
      user?: Student;
    }
  }
}
