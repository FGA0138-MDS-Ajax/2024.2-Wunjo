import { NotFoundError, UnauthenticatedError } from '@/application/error';
import { StudentRepository } from '@/application/repositories';
import { StudentTokenManager } from '@/application/services';
import { Student } from '@/domain';

export class AuthUsecase {
  public static Name = 'AuthUsecase' as const;

  constructor(
    private readonly studentTokenManager: StudentTokenManager,
    private readonly studentRepository: StudentRepository,
  ) {}

  async execute(input: AuthUsecase.Input): Promise<AuthUsecase.Output> {
    try {
      const decrypt = await this.studentTokenManager.decrypt(input.token);

      const studentExists = await this.studentRepository.findBy({
        where: {
          id: decrypt.studentId,
        },
      });

      if (!studentExists) {
        throw new NotFoundError('Estudante não encontrado', 'STUDENT');
      }

      return studentExists;
    } catch (err) {
      if (err instanceof NotFoundError) {
        throw err;
      }

      throw new UnauthenticatedError();
    }
  }
}

export namespace AuthUsecase {
  export type Input = {
    token: string;
  };

  export type Output = Student;
}
