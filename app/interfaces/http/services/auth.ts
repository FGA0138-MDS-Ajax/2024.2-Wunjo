import { ICourse, IStudentStatus } from '@/interfaces/application';
import { IStudent } from '@/interfaces/application/Student';

export namespace IAuthService {
  export namespace Login {
    export type Request = {
      registration: string;
      password: string;
    };

    export type Response = {
      accessToken: string;
      expiresAt: string;
    };
  }

  export namespace Register {
    export type Request = {
      registration: string;
      name: string;
      password: string;
      course: ICourse;
    };

    export type Response = {
      studentId: string;
      status: IStudentStatus;
      expiresAt: string;
    };
  }

  export namespace Me {
    export type Response = { student: Omit<IStudent, 'password'> };
  }
}
