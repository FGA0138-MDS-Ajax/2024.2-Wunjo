import { NotFoundError, UnauthenticatedError } from '@/application/error';
import { StudentRepository } from '@/application/repositories';
import {
  PasswordHash,
  StudentTokenManager,
  Validator,
} from '@/application/services';
import { StudentRegistrationStatus } from '@/domain';
import { env } from '@/env';

export class LoginUsecase {
  public static Name = 'LoginUsecase' as const;

  constructor(
    private readonly validator: Validator<LoginUsecase.Input>,
    private readonly studentRepository: StudentRepository,
    private readonly cryptographyService: PasswordHash,
    private readonly studentTokenManager: StudentTokenManager,
  ) {}

  async execute(input: LoginUsecase.Input): Promise<LoginUsecase.Output> {
    const validateInput = await this.validator.validate(input);

    const studentExists = await this.studentRepository.findBy({
      where: {
        registration: validateInput.registration,
      },
    });

    if (!studentExists) {
      throw new NotFoundError('User not found', 'STUDENT');
    }

    const authenticatedStudent = await this.cryptographyService.compare(
      input.password,
      studentExists.password,
    );

    if (!authenticatedStudent) {
      throw new UnauthenticatedError();
    }

    if (studentExists.status === StudentRegistrationStatus.PENDING) {
      throw new UnauthenticatedError(
        'Registro pendente de aprovação',
        'PENDING_REGISTRATION',
      );
    }

    const token = await this.studentTokenManager.generate({
      studentId: studentExists.id,
    });

    return {
      accessToken: token,
      expiresAt: env.JWT_TOKEN_EXPIRATION,
    };
  }
}

export namespace LoginUsecase {
  export type Input = {
    registration: string;
    password: string;
  };

  export type Output = {
    accessToken: string;
    expiresAt: string;
  };
}
