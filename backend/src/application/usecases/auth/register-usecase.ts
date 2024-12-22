import { Courses, StudentRegistrationStatuses } from '@/domain';

export class RegisterUsecase {
  public static Name = 'RegisterUsecase' as const;

  constructor() {}
  async execute(
    _input: RegisterUsecase.Input,
  ): Promise<RegisterUsecase.Output> {
    throw new Error('Not implemented.');
  }
}

export namespace RegisterUsecase {
  export type Input = {
    name: string;
    registration: string;
    course: Courses;
    password: string;
  };

  export type Output = {
    studentId: string;
    status: StudentRegistrationStatuses;
    createdAt: Date;
  };
}
