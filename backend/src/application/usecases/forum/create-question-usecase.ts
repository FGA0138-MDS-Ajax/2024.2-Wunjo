import { randomUUID } from 'node:crypto';
import { QuestionRepository } from '@/application/repositories';
import { Validator } from '@/application/services';
import { Question, QuestionDifficulties, QuestionUrgencies } from '@/domain';

export class CreateQuestionUsecase {
  public static Name = 'CreateQuestionUsecase' as const;

  constructor(
    private readonly questionRepository: QuestionRepository,
    private readonly validator: Validator<CreateQuestionUsecase.Input>,
  ) {}

  async execute(input: CreateQuestionUsecase.Input): Promise<CreateQuestionUsecase.Output> {
    const validatedInput = await this.validator.validate(input);

    const question = await this.questionRepository.create({
      id: randomUUID(),
      subjectId: validatedInput.subjectId,
      title: validatedInput.title,
      description: validatedInput.description,
      points: validatedInput.points,
      difficulty: validatedInput.difficulty,
      urgency: validatedInput.urgency,
      studentId: validatedInput.studentId,
      tutorId: '',
      status: 'OPEN',
      tutors: [],
    });

    return { question };
  }
}

export namespace CreateQuestionUsecase {
  export type Input = {
    subjectId: string;
    title: string;
    description: string;
    points: number;
    difficulty: QuestionDifficulties;
    urgency: QuestionUrgencies;
    studentId: string;
  };

  export type Output = {
    question: Question;
  };
}
