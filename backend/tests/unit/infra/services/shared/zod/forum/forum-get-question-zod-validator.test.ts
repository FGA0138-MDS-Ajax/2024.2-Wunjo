import { ValidationError } from '@/application/error';
import { GetQuestionUsecase } from '@/application/usecases';
import { ForumGetQuestionUsecaseZodValidator } from '@/infra/services/shared/zod';
import { faker } from '@faker-js/faker';
import { getError } from '@tests/helper';
import { beforeAll, describe, expect, it } from 'vitest';

describe('Test forum create question zod validator', () => {
  let forumGetQuestionUsecaseValidator: ForumGetQuestionUsecaseZodValidator;
  const input: GetQuestionUsecase.Input = {
    questionId: faker.string.uuid(),
  };
  beforeAll(() => {
    forumGetQuestionUsecaseValidator = new ForumGetQuestionUsecaseZodValidator();
  });

  it('should validate the get question usecase input data', async () => {
    const output = await forumGetQuestionUsecaseValidator.validate(input);

    expect(output).toEqual({
      questionId: input.questionId,
    });
  });

  it('should validate if the get question input data is wrong', async () => {
    const output = await getError<ValidationError>(() =>
      forumGetQuestionUsecaseValidator.validate({
        questionId: 'invalid_id-test14322',
      }),
    );

    expect(output).instanceOf(ValidationError);
  });
});
