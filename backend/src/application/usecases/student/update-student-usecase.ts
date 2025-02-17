import { NotFoundError } from '@/application/error';
import { StudentRepository } from '@/application/repositories';
import { Validator } from '@/application/services';
import { Courses, Student } from '@/domain';

export class UpdateStudentUsecase {
  public static Name = 'UpdateStudentUsecase' as const;

  constructor(
    private readonly validator: Validator<UpdateStudentUsecase.Input>,
    private readonly studentRepository: StudentRepository,
  ) {}

  async execute(
    input: UpdateStudentUsecase.Input,
  ): Promise<UpdateStudentUsecase.Output> {
    const validatedInput = await this.validator.validate(input);

    const student = await this.studentRepository.findBy({
      where: {
        id: validatedInput.studentId,
      },
    });

    if (!student) {
      throw new NotFoundError('Aluno não encontrado', 'STUDENT');
    }

    const updateObj = Object.assign({}, validatedInput);
    const updatedStudent = await this.studentRepository.update(
      validatedInput.studentId,
      updateObj,
    );

    if (!updatedStudent) {
      throw new NotFoundError('Aluno não encontrado', 'STUDENT');
    }

    return {
      id: updatedStudent.id,
      name: updatedStudent.name,
      email: updatedStudent.email,
      course: updatedStudent.course,
      rankingParticipant: updatedStudent.rankingParticipant,
      avatar: updatedStudent.avatar,
      avatarUrl: updatedStudent.avatarUrl,
      registration: updatedStudent.registration,
      status: updatedStudent.status,
      createdAt: updatedStudent.createdAt,
      updatedAt: updatedStudent.updatedAt,
    };
  }
}

export namespace UpdateStudentUsecase {
  export type Input = {
    studentId: string;
    name?: string;
    course?: Courses;
    rankingParticipant?: boolean;
    avatar?: string;
  };

  export type Output = Omit<Student, 'password'>;
}
