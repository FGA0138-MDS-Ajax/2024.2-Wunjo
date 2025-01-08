import { StudentRepository } from '@/application/repositories/student-repository';
import { Validator } from '@/application/services';
import { StudentTokenManager } from '@/application/services/token/token-manager';
import * as bcrypt from 'bcrypt';
import { response } from 'express';

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
    }
    const token = await this.studentTokenManager.generate({ studentId: validateInput.registration });
    response.json({ accessToken: token });
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
