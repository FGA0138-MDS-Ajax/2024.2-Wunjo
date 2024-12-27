import { StudentRepository } from '@/application/repositories/student-repository';
import { Validator } from '@/application/services';
import { StudentTokenManager } from '@/application/services/token/token-manager';
import * as bcrypt from 'bcrypt';

export class LoginUsecase {
  public static Name = 'LoginUsecase' as const;

  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly studentTokenManager: StudentTokenManager,
    private readonly validator: Validator<LoginUsecase.Input>,
  ) {}

  async execute(_input: LoginUsecase.Input): Promise<LoginUsecase.Output> {
    const validateInput = await this.validator.validate(_input);
    const studentExists = await this.studentRepository.findBy({ registration: validateInput.registration });
    if (!studentExists) {
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
