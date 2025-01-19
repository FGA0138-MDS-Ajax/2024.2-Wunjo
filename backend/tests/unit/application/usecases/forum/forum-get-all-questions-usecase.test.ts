import { GetAllQuestionsUsecase } from '@/application/usecases';
import { Question, QuestionDifficulty, QuestionUrgency } from '@/domain';
import { container } from '@/infra/container';
import { QuestionPrismaRepository } from '@/infra/orm/prisma/repositories';
import { ForumGetAllQuestionsUsecaseZodValidator } from '@/infra/services/shared/zod/forum/forum-get-all-questions-usecase-zod-validator';
import { faker } from '@faker-js/faker';
import { QuestionBuilder } from '@tests/helper/builders/question-builder';
import Sinon from 'sinon';
import { beforeAll, beforeEach, describe, expect, it } from 'vitest';

describe('GetQuestionUsecase', async () => {
  let sandbox: Sinon.SinonSandbox;
  let usecase: GetAllQuestionsUsecase;
  const input = {
    filter: {
      urgency: faker.helpers.arrayElement(Object.values(QuestionUrgency)),
      difficulty: faker.helpers.arrayElement(Object.values(QuestionDifficulty)),
    },
  };

  beforeAll(() => {
    sandbox = Sinon.createSandbox();
    usecase = container.get(GetAllQuestionsUsecase.Name);
  });

  beforeEach(() => {
    sandbox.restore();
    sandbox.reset();
  });

  it('should be able to get all the questions', async () => {
    const question = QuestionBuilder.aQuestion().get();

    const validateStub = sandbox
      .stub(ForumGetAllQuestionsUsecaseZodValidator.prototype, 'validate')
      .resolves(input);

    const findAllStub = sandbox
      .stub(QuestionPrismaRepository.prototype, 'findAll')
      .resolves([question]);

    const output = await usecase.execute(input);

    expect(output).toEqual({ questions: [question] });
    expect(validateStub.calledOnceWithExactly(input)).toBeTruthy();
    expect(
      findAllStub.calledOnceWithExactly({
        urgency: input.filter.urgency,
        difficulty: input.filter.difficulty,
      }),
    );
  });
});
