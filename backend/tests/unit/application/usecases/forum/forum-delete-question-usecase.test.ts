import { CreateQuestionUsecase, DeleteQuestionUsecase } from '@/application/usecases';
import { QuestionDifficulties, QuestionDifficulty, QuestionUrgencies, QuestionUrgency } from '@/domain';
import { container } from '@/infra/container';
import { QuestionPrismaRepository } from '@/infra/orm/prisma/repositories';
import { ForumCreateQuestionUsecaseZodValidator, ForumDeleteQuestionUsecaseZodValidator } from '@/infra/services/shared/zod';
import { faker } from '@faker-js/faker';
import { QuestionBuilder } from '@tests/helper/builders/question-builder';
import Sinon from 'sinon';
import { beforeAll, beforeEach, describe, expect, expectTypeOf, it } from 'vitest';

describe('CreateQuestionUsecase', async () => {
  let sandbox: Sinon.SinonSandbox;
  let usecase: DeleteQuestionUsecase;
  const input = {
    questionId: faker.string.uuid(),
  };

  beforeAll(() => {
    sandbox = Sinon.createSandbox();
    usecase = container.get(DeleteQuestionUsecase.Name);
  });

  beforeEach(() => {
    sandbox.restore();
    sandbox.reset();
  });

  it('should be able to create a new question', async () => {
    const question = QuestionBuilder.aQuestion().get();

    const validateStub = sandbox
      .stub(ForumDeleteQuestionUsecaseZodValidator.prototype, 'validate')
      .resolves(input);

    const findByStub = sandbox
      .stub(QuestionPrismaRepository.prototype, 'findBy')
      .resolves(question);

    const deleteStub = sandbox
      .stub(QuestionPrismaRepository.prototype, 'delete')
      .resolves(true);

    const output = await usecase.execute(input);

    expect(output).toEqual({ question: true });
    expect(deleteStub.calledOnceWithExactly({
      id: input.questionId,
    })).toBeTruthy();
    expect(validateStub.calledOnceWithExactly(input)).toBeTruthy();
    expect(findByStub.calledOnceWithExactly({ id: input.questionId }));
  });
});
