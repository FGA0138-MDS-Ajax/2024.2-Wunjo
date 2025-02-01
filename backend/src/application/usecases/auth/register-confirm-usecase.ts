import { EmailRepository, StudentRepository } from '@/application/repositories';
import { EmailType, StudentRegistrationStatus } from '@/domain';

export class RegisterConfirmUsecase {
  public static Name = 'RegisterConfirmUsecase' as const;

  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly emailRepository: EmailRepository,
  ) {}

  async execute(
    input: RegisterConfirmUsecase.Input,
  ): Promise<RegisterConfirmUsecase.Output> {
    const registration = input.code.slice(0, 9);

    const studentExists = await this.studentRepository.findBy({
      where: {
        registration,
      },
    });

    if (!studentExists) {
      return false;
    }

    const cacheData = await this.emailRepository.get({
      studentId: studentExists.id,
      type: EmailType.REGISTRATION,
    });

    if (!cacheData) {
      return false;
    }

    const parsedData = JSON.parse(cacheData.data) as {
      code: string;
    };

    if (parsedData.code !== input.code) {
      return false;
    }

    await Promise.all([
      this.studentRepository.update(studentExists.id, {
        status: StudentRegistrationStatus.APPROVED,
      }),

      this.emailRepository.del({
        studentId: studentExists.id,
        type: EmailType.REGISTRATION,
      }),
    ]);

    return true;
  }
}

export namespace RegisterConfirmUsecase {
  export type Input = {
    code: string;
  };

  export type Output = boolean;
}
