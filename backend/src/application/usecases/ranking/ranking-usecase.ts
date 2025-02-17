import { NotFoundError } from '@/application/error';
import {
  SeasonRepository,
  StudentSeasonRepository,
} from '@/application/repositories';
import { Season, Student } from '@/domain';

export class RankingUsecase {
  constructor(
    private readonly seasonRepository: SeasonRepository,
    private readonly studentSeasonRepository: StudentSeasonRepository,
  ) {}

  async execute(_input: RankingUsecase.Input): Promise<RankingUsecase.Output> {
    const season = await this.seasonRepository.getLatest();

    if (!season) {
      throw new NotFoundError('Temporada não encontrada', 'SEASON');
    }

    const seasonStudent = await this.studentSeasonRepository.getAll({
      where: {
        seasonId: season.id,
      },
      orderBy: {
        points: 'desc',
      },
    });

    const ranking = seasonStudent.map((studentSeason) => ({
      points: studentSeason.points,
      student: {
        id: studentSeason.student.id,
        name: studentSeason.student.name,
        avatar: studentSeason.student.avatar,
        course: studentSeason.student.course,
        avatarUrl: studentSeason.student.avatarUrl,
        registration: studentSeason.student.registration,
        rankingParticipant: studentSeason.student.rankingParticipant,
      },
    }));

    return {
      season,
      ranking,
    };
  }
}

export namespace RankingUsecase {
  export const Name = 'RankingUsecase';

  export type Input = void;

  export type Output = {
    season: Season;
    ranking: Array<{
      points: number;
      student: Pick<
        Student,
        | 'id'
        | 'name'
        | 'avatar'
        | 'avatarUrl'
        | 'registration'
        | 'rankingParticipant'
        | 'course'
      >;
    }>;
  };
}
