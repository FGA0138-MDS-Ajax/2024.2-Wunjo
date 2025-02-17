import {
  ICourse,
  ISeason,
  IStudentSeason,
  IStudentStatus,
} from '@/interfaces/application';
import { IStudent } from '@/interfaces/application';

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
    export type Response = {
      student: Omit<
        IStudent & {
          ranking: Omit<
            IStudentSeason & {
              season: ISeason;
            },
            'studentId'
          >[];
        },
        'password'
      >;
    };
  }

  export namespace RequestRecoveryPasswordCode {
    export type Request = {
      registration: string;
    };

    export type Response = {};
  }

  export namespace ConfirmRecoveryCode {
    export type Request = {
      registration: string;
      code: string;
    };

    export type Response = {
      studentId: string;
      time: string;
    };
  }

  export namespace ChangePassword {
    export type Request = {
      studentId: string;
      code: string;
      password: string;
      confirmPassword: string;
    };

    export type Response = {};
  }
}
