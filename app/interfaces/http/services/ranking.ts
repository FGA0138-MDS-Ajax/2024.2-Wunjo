import { IStudent } from '@/interfaces/application';

export namespace IRankingService {
  export namespace Fetch {
    export type Request = {};

    export type Response = {
      season: {
        id: string;
        name: string;
        period: string;
        createdAt: string;
        updatedAt: string;
      };
      ranking: Array<{
        points: number;
        student: Pick<
          IStudent,
          | 'id'
          | 'name'
          | 'email'
          | 'registration'
          | 'avatar'
          | 'avatarUrl'
          | 'rankingParticipant'
          | 'course'
        >;
      }>;
    };
  }
}
