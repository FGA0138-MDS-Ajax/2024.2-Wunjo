import { ValidationError } from '@/application/error';
import { CreateQuestionUsecase } from '@/application/usecases';
import { QuestionDifficulties, QuestionDifficulty, QuestionUrgencies, QuestionUrgency } from '@/domain';
import { ForumCreateQuestionUsecaseZodValidator } from '@/infra/services/shared/zod/forum/forum-create-question-usecase-zod-validator';
import { faker } from '@faker-js/faker';
import { getError } from '@tests/helper';
import { beforeAll, describe, expect, it } from 'vitest';

describe('Test forum create question zod validator', () => {
  let forumCreateQuestionUsecaseValidator: ForumCreateQuestionUsecaseZodValidator;
  const input: CreateQuestionUsecase.Input = {
    subjectId: faker.string.uuid(),
    title: faker.string.alpha({ length: { min: 1, max: 20 } }),
    description: faker.string.alpha({ length: { min: 1, max: 360 } }),
    points: faker.number.int({
      min: 1,
      max: 100,
    }),
    difficulty: faker.helpers.arrayElement(Object.values(QuestionDifficulty)) as QuestionDifficulties,
    urgency: faker.helpers.arrayElement(Object.values(QuestionUrgency)) as QuestionUrgencies,
  };
  beforeAll(() => {
    forumCreateQuestionUsecaseValidator = new ForumCreateQuestionUsecaseZodValidator();
  });

  it('should validate the create question usecase input data', async () => {
    const output = await forumCreateQuestionUsecaseValidator.validate(input);

    expect(output).toEqual({
      subjectId: input.subjectId,
      title: input.title,
      description: input.description,
      points: input.points,
      difficulty: input.difficulty,
      urgency: input.urgency,
    });
  });

  it('should validate if the create question usecase input data is wrong', async () => {
    const output = await getError<ValidationError>(() =>
      forumCreateQuestionUsecaseValidator.validate({
        subjectId: input.subjectId,
        title: 12,
        description: input.description,
        points: input.points,
        difficulty: 'INVALID DIFF',
        urgency: 'INVALID_DATA_URGENCY',
      }),
    );
    expect(output).instanceOf(ValidationError);
  });
});
