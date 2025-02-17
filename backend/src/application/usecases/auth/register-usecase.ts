import { randomUUID } from 'node:crypto';
import {
  AlreadyExistsError,
  AlreadyExistsErrorType,
} from '@/application/error';
import {
  EmailRepository,
  SeasonRepository,
  StudentRepository,
} from '@/application/repositories';
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
  StudentSeason,
} from '@/domain';

export class RegisterUsecase {
  public static Name = 'RegisterUsecase' as const;

  constructor(
    private readonly validator: Validator<RegisterUsecase.Input>,
    private readonly studentRepository: StudentRepository,
    private readonly passwordHash: PasswordHash,
    private readonly dispatchEmailService: DispatchEmailService,
    private readonly emailRepository: EmailRepository,
    private readonly seasonRepository: SeasonRepository,
  ) {}

  async execute(input: RegisterUsecase.Input): Promise<RegisterUsecase.Output> {
    const validatedInput = await this.validator.validate(input);

    const studentExists = await this.studentRepository.findBy({
      where: {
        registration: validatedInput.registration,
      },
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

    const lastSeason = await this.seasonRepository.getLatest();

    let seasons: Omit<StudentSeason, 'studentId'>[] = [];
    if (lastSeason) {
      seasons = [
        {
          id: randomUUID(),
          seasonId: lastSeason.id,
          points: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
    }

    const student = await this.studentRepository.create({
      id: randomUUID(),
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
      seasons,
      updatedAt: new Date(),
      createdAt: new Date(),
    });

    const code = `${student.registration}${new Date().getTime()}`;

    await Promise.all([
      this.dispatchEmailService.dispatch({
        data: {
          studentId: student.id,
          type: EmailType.REGISTRATION,
          data: {
            code,
          },
        },
      }),
      this.emailRepository.create({
        studentId: student.id,
        email: {
          data: JSON.stringify({
            code,
          }),
          type: EmailType.REGISTRATION,
          to: student.email,
        },
      }),
    ]);

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
