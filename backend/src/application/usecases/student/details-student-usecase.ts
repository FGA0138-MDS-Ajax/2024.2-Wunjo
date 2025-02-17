import { NotFoundError } from '@/application/error';
import { StudentRepository } from '@/application/repositories';
import { Validator } from '@/application/services';
import { Student, StudentSeason } from '@/domain';

export class DetailsStudentUsecase {
  public static Name = 'DetailsStudentUsecase' as const;

  constructor(
    private readonly validator: Validator<DetailsStudentUsecase.Input>,
    private readonly studentRepository: StudentRepository,
  ) {}

  async execute(
    input: DetailsStudentUsecase.Input,
  ): Promise<DetailsStudentUsecase.Output> {
    const validatedInput = await this.validator.validate(input);

    const student = await this.studentRepository.findBy({
      where: {
        id: validatedInput.studentId,
      },
      relations: {
        seasons: true,
      },
    });

    if (!student) {
      throw new NotFoundError('Aluno não encontrado', 'STUDENT');
    }

    return {
      id: student.id,
      name: student.name,
      email: student.email,
      course: student.course,
      rankingParticipant: student.rankingParticipant,
      avatar: student.avatar,
      avatarUrl: student.avatarUrl,
      registration: student.registration,
      status: student.status,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt,
      ranking: student.seasons!,
    };
  }
}

export namespace DetailsStudentUsecase {
  export type Input = {
    studentId: string;
  };

  export type Output = Omit<Student & {
    ranking: Omit<StudentSeason, 'studentId'>[];
  }, 'password'>;
}
