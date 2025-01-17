import { ValidationError } from '@/application/error';
import { GetAllQuestionsUsecase } from '@/application/usecases';
import { QuestionDifficulties, QuestionDifficulty, QuestionUrgencies, QuestionUrgency } from '@/domain';
import { ForumGetQuestionUsecaseZodValidator } from '@/infra/services/shared/zod';
import { ForumGetAllQuestionsUsecaseZodValidator } from '@/infra/services/shared/zod/forum/forum-get-all-questions-usecase-zod-validator';
import { faker } from '@faker-js/faker';
import { getError } from '@tests/helper';
import { beforeAll, describe, expect, it } from 'vitest';

describe('Test forum create question zod validator', () => {
  let forumGetAllQuestionsUsecaseValidator: ForumGetAllQuestionsUsecaseZodValidator;

  const input: Partial<GetAllQuestionsUsecase.Input | undefined> = {
    filter: faker.helpers.arrayElement(Object.values(QuestionUrgency)) as QuestionUrgencies,
  };
  beforeAll(() => {
    forumGetAllQuestionsUsecaseValidator = new ForumGetAllQuestionsUsecaseZodValidator();
  });

  it('should validate the get question usecase input data', async () => {
    const output = await forumGetAllQuestionsUsecaseValidator.validate(input);

    expect(output).toEqual({
      urgency: input,
    });
  });

  it('should validate if the get question input data is wrong', async () => {
    const output = await getError<ValidationError>(() =>
      forumGetAllQuestionsUsecaseValidator.validate({
        filter: 'invalid_id-test14322',
      }),
    );

    expect(output).instanceOf(ValidationError);
  });
});
