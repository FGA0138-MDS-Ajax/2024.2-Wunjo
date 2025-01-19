import { CreateQuestionUsecase } from '@/application/usecases';
import { QuestionDifficulties, QuestionDifficulty, QuestionUrgencies, QuestionUrgency } from '@/domain';
import { container } from '@/infra/container';
import { QuestionPrismaRepository } from '@/infra/orm/prisma/repositories';
import { ForumCreateQuestionUsecaseZodValidator } from '@/infra/services/shared/zod';
import { faker } from '@faker-js/faker';
import { QuestionBuilder } from '@tests/helper/builders/question-builder';
import Sinon from 'sinon';
import { beforeAll, beforeEach, describe, expect, expectTypeOf, it } from 'vitest';

describe('CreateQuestionUsecase', async () => {
  let sandbox: Sinon.SinonSandbox;
  let usecase: CreateQuestionUsecase;
  const input = {
    subjectId: faker.string.uuid(),
    title: faker.string.alpha({ length: { min: 1, max: 25 } }),
    description: faker.string.alpha({ length: { min: 1, max: 250 } }),
    points: faker.number.int({ min: 1, max: 100 }),
    difficulty: faker.helpers.arrayElement(Object.values(QuestionDifficulty)) as QuestionDifficulties,
    urgency: faker.helpers.arrayElement(Object.values(QuestionUrgency)) as QuestionUrgencies,
    studentId: faker.string.uuid(),
  };

  beforeAll(() => {
    sandbox = Sinon.createSandbox();
    usecase = container.get(CreateQuestionUsecase.Name);
  });

  beforeEach(() => {
    sandbox.restore();
    sandbox.reset();
  });

  it('should be able to create a new question', async () => {
    const question = QuestionBuilder.aQuestion().get();

    const createStub = sandbox
      .stub(QuestionPrismaRepository.prototype, 'create')// create e validate
      .resolves(question);

    const validateStub = sandbox
      .stub(ForumCreateQuestionUsecaseZodValidator.prototype, 'validate')
      .resolves(input);

    const output = await usecase.execute(input);

    expect(output).toEqual({ question });
    expect(createStub.calledOnceWithExactly({
      id: Sinon.match.string,
      subjectId: input.subjectId,
      title: input.title,
      description: input.description,
      points: input.points,
      difficulty: input.difficulty,
      urgency: input.urgency,
      studentId: input.studentId,
      tutorId: '',
      status: 'OPEN',
      tutors: [],
    })).toBeTruthy();
    expect(validateStub.calledOnceWithExactly(input)).toBeTruthy();
  });
});
