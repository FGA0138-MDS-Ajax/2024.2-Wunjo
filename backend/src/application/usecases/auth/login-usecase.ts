import { StudentRepository } from '@/application/repositories/student-repository';
<<<<<<< HEAD
import { StudentTokenManager, Validator } from '@/application/services';
import { env } from '@/env';
import { BcryptPasswordHash } from '@/infra/services/password';
=======
import { Validator } from '@/application/services';
import { StudentTokenManager } from '@/application/services/token/token-manager';
import * as bcrypt from 'bcrypt';
>>>>>>> c3d3274 (refactor(login-usercase): updating login-usercase)

export class LoginUsecase {
  public static Name = 'LoginUsecase' as const;

  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly studentTokenManager: StudentTokenManager,
    private readonly validator: Validator<LoginUsecase.Input>,
<<<<<<< HEAD
    private readonly cryptographyService: BcryptPasswordHash,
=======
>>>>>>> c3d3274 (refactor(login-usercase): updating login-usercase)
  ) {}

  async execute(_input: LoginUsecase.Input): Promise<LoginUsecase.Output> {
    const validateInput = await this.validator.validate(_input);
    const studentExists = await this.studentRepository.findBy({ registration: validateInput.registration });
    if (!studentExists) {
      throw new Error('Estudante não encontrado!');
    }
<<<<<<< HEAD
    const authenticatedStudent = await this.cryptographyService.compare(_input.password, studentExists.password);
    if (!authenticatedStudent) {
      throw new Error('Senha incorreta!');
    }
    const token = await this.studentTokenManager.generate({ studentId: validateInput.registration });
    return { accessToken: token, expiresAt: env.JWT_TOKEN_EXPIRATION };
=======

    const authenticatedStudent = await bcrypt.compare(_input.password, studentExists.password);
    if (!authenticatedStudent) {
      throw new Error('Senha incorreta!');
      // Ajustar exceção
    }
    // Arrumar BIBILIOTECA!!!
    // Injetar as dependências 
    // implementar TOKEN!!
    // Retornar o accessToken e o timestamp de expiração do campo;

>>>>>>> c3d3274 (refactor(login-usercase): updating login-usercase)
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
