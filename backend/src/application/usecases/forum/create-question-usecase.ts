import { randomUUID } from 'node:crypto';
import { QuestionRepository } from '@/application/repositories';
import { Validator } from '@/application/services';
import {
  Question,
  QuestionDifficulties,
  QuestionDifficulty,
  QuestionStatus,
  QuestionUrgencies,
  QuestionUrgency,
} from '@/domain';

export class CreateQuestionUsecase {
  public static Name = 'CreateQuestionUsecase' as const;

  constructor(
    private readonly questionRepository: QuestionRepository,
    private readonly validator: Validator<CreateQuestionUsecase.Input>,
  ) {}

  async execute(
    input: CreateQuestionUsecase.Input,
  ): Promise<CreateQuestionUsecase.Output> {
    const validatedInput = await this.validator.validate(input);

    const question = await this.questionRepository.create({
      id: randomUUID(),
      subjectId: validatedInput.subjectId,
      title: validatedInput.title,
      description: validatedInput.description,
      points: this.generateQuestionPoints(
        validatedInput.difficulty,
        validatedInput.urgency,
      ),
      difficulty: validatedInput.difficulty,
      urgency: validatedInput.urgency,
      studentId: validatedInput.studentId,
      tutorId: '',
      status: QuestionStatus.OPEN,
      tutors: [],
    });

    return { question };
  }

  private generateQuestionPoints(
    difficulty: QuestionDifficulties,
    urgency: QuestionUrgencies,
  ) {
    const basePoint = 5;

    const difficultyMultiplier = Object.keys(QuestionDifficulty).indexOf(difficulty) + 1;

    const urgencyMultiplier = Object.keys(QuestionUrgency).indexOf(urgency) + 1;

    return basePoint * difficultyMultiplier * urgencyMultiplier;
  }
}

export namespace CreateQuestionUsecase {
  export type Input = {
    subjectId: string;
    title: string;
    description: string;
    difficulty: QuestionDifficulties;
    urgency: QuestionUrgencies;
    studentId: string;
  };

  export type Output = {
    question: Question;
  };
}
