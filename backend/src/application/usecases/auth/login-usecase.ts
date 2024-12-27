<<<<<<< HEAD
import { UnauthenticatedError } from '@/application/error';
import { NotFoundError } from '@/application/error/not-found-error';
import { StudentRepository } from '@/application/repositories/student-repository';
import { PasswordHash, StudentTokenManager, Validator } from '@/application/services';
import { env } from '@/env';
=======
import { StudentRepository } from '@/application/repositories/student-repository';
import { StudentTokenManager, Validator } from '@/application/services';
import * as bcrypt from 'bcrypt';
>>>>>>> d8c72d7 (refactor(login-usercase): updating login-usercase)

export class LoginUsecase {
  public static Name = 'LoginUsecase' as const;

  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly studentTokenManager: StudentTokenManager,
    private readonly validator: Validator<LoginUsecase.Input>,
<<<<<<< HEAD
    private readonly cryptographyService: PasswordHash,
=======
>>>>>>> d8c72d7 (refactor(login-usercase): updating login-usercase)
  ) {}

  async execute(_input: LoginUsecase.Input): Promise<LoginUsecase.Output> {
    const validateInput = await this.validator.validate(_input);
    const studentExists = await this.studentRepository.findBy({ registration: validateInput.registration });
    if (!studentExists) {
<<<<<<< HEAD
      throw new NotFoundError('User not found', 'STUDENT');
    }
    const authenticatedStudent = await this.cryptographyService.compare(_input.password, studentExists.password);
    if (!authenticatedStudent) {
      throw new UnauthenticatedError();
    }
    const token = await this.studentTokenManager.generate({ studentId: validateInput.registration });
    return { accessToken: token, expiresAt: env.JWT_TOKEN_EXPIRATION };
=======
      throw new Error('Estudante não encontrado!');
    }

    const authenticatedStudent = await bcrypt.compare(_input.password, studentExists.password);
    if (!authenticatedStudent) {
      throw new Error('Senha incorreta!');
      // Ajustar exceção
    }
    // Arrumar BIBILIOTECA!!!
    // Injetar as dependências
    // implementar TOKEN!!
    // Retornar o accessToken e o timestamp de expiração do campo;
>>>>>>> d8c72d7 (refactor(login-usercase): updating login-usercase)
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
