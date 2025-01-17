import { ValidationError } from '@/application/error';
import { DeleteQuestionUsecase } from '@/application/usecases';
import { ForumDeleteQuestionUsecaseZodValidator } from '@/infra/services/shared/zod/forum/forum-delete-question-usecase-zod-validator';
import { faker } from '@faker-js/faker';
import { getError } from '@tests/helper';
import { beforeAll, describe, expect, it } from 'vitest';

describe('Test forum create question zod validator', () => {
  let forumDeleteQuestionUsecaseValidator: ForumDeleteQuestionUsecaseZodValidator;
  const input: DeleteQuestionUsecase.Input = {
    questionId: faker.string.uuid(),
  };
  beforeAll(() => {
    forumDeleteQuestionUsecaseValidator = new ForumDeleteQuestionUsecaseZodValidator();
  });

  it('should validate the delete question usecase input data', async () => {
    const output = await forumDeleteQuestionUsecaseValidator.validate(input);

    expect(output).toEqual({
      questionId: input.questionId,
    });
  });

  it('should validate if the delete question input data is wrong', async () => {
    const output = await getError<ValidationError>(() =>
      forumDeleteQuestionUsecaseValidator.validate({
        questionId: 'invalid_id-test14322',
      }),
    );

    expect(output).instanceOf(ValidationError);
  });
});
