import {
  AlreadyExistsError,
  AlreadyExistsErrorType,
} from '@/application/error';
import { StudentRepository } from '@/application/repositories';
import {
  DispatchEmailService,
  PasswordHash,
  Validator,
} from '@/application/services';
import {
  Courses,
  EmailType,
  StudentRegistrationStatus,
  StudentRegistrationStatuses,
} from '@/domain';

export class RegisterUsecase {
  public static Name = 'RegisterUsecase' as const;

  constructor(
    private readonly validator: Validator<RegisterUsecase.Input>,
    private readonly studentRepository: StudentRepository,
    private readonly passwordHash: PasswordHash,
    private readonly dispatchEmailService: DispatchEmailService,
  ) {}

  async execute(input: RegisterUsecase.Input): Promise<RegisterUsecase.Output> {
    const validatedInput = await this.validator.validate(input);

    const studentExists = await this.studentRepository.findBy({
      registration: validatedInput.registration,
    });

    if (studentExists) {
      throw new AlreadyExistsError(AlreadyExistsErrorType.ESTUDANTE);
    }

    const studentEmail = String().concat(
      validatedInput.registration,
      '@aluno.unb.br',
    );

    const hashedPassword = await this.passwordHash.hash(
      validatedInput.password,
    );

    const student = await this.studentRepository.create({
      name: validatedInput.name,
      email: studentEmail,
      registration: validatedInput.registration,
      course: validatedInput.course,
      status: StudentRegistrationStatus.PENDING,
      password: hashedPassword,
      rankingParticipant: false,
      avatar: '',
      avatarUrl: '',
      questions: [],
      seasons: [], // TODO: Register user in active season
      updatedAt: new Date(),
      createdAt: new Date(),
    });

    await this.dispatchEmailService.dispatch({
      data: {
        studentId: student.id,
        type: EmailType.REGISTRATION,
      },
    });

    return {
      studentId: student.id,
      status: student.status,
      createdAt: student.createdAt,
    };
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
