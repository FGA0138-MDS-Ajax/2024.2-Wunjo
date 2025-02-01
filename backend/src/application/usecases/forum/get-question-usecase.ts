import { NotFoundError } from '@/application/error';
import { QuestionRepository } from '@/application/repositories';
import { Validator } from '@/application/services';
import { Question, Student } from '@/domain';

export class GetQuestionUsecase {
  public static Name = 'GetQuestionUsecase' as const;

  constructor(
    private readonly questionRepository: QuestionRepository,
    private readonly validator: Validator<GetQuestionUsecase.Input>,
  ) {}

  async execute(
    input: GetQuestionUsecase.Input,
  ): Promise<GetQuestionUsecase.Output> {
    const validatedInput = await this.validator.validate(input);

    const question = await this.questionRepository.findBy({
      id: validatedInput.questionId,
      include: {
        student: true,
      },
    });

    if (!question) {
      throw new NotFoundError('Question not found', 'QUESTION');
    }

    return {
      question: {
        ...question,
        student: {
          id: question.student!.id,
          email: question.student!.email,
          avatar: question.student!.avatar,
          avatarUrl: question.student!.avatarUrl,
          course: question.student!.course,
          registration: question.student!.registration,
          createdAt: question.student!.createdAt,
          updatedAt: question.student!.updatedAt,
        },
      },
    };
  }
}

export namespace GetQuestionUsecase {
  export type Input = {
    questionId: string;
  };

  export type Output = {
    question: (Question & {
      student: Omit<Student, 'status' | 'name' | 'password' | 'rankingParticipant'>;
    }) | null;
  };
}
