import { GetQuestionUsecase } from '@/application/usecases';
import { container } from '@/infra/container';
import { QuestionPrismaRepository } from '@/infra/orm/prisma/repositories';
import { ForumGetQuestionUsecaseZodValidator } from '@/infra/services/shared/zod';
import { faker } from '@faker-js/faker';
import { QuestionBuilder } from '@tests/helper/builders/question-builder';
import { StudentBuilder } from '@tests/helper/builders/student-builder';
import Sinon from 'sinon';
import { beforeAll, beforeEach, describe, expect, it } from 'vitest';

describe('GetQuestionUsecase', async () => {
  let sandbox: Sinon.SinonSandbox;
  let usecase: GetQuestionUsecase;
  const input = {
    questionId: faker.string.uuid(),
  };

  beforeAll(() => {
    sandbox = Sinon.createSandbox();
    usecase = container.get(GetQuestionUsecase.Name);
  });

  beforeEach(() => {
    sandbox.restore();
    sandbox.reset();
  });
  it('should be able to get a question', async () => {
    const question = QuestionBuilder.aQuestion().get();

    const validateStub = sandbox
      .stub(ForumGetQuestionUsecaseZodValidator.prototype, 'validate')
      .resolves(input);

    const outputFindBy = {
      ...question,
      student: StudentBuilder.aStudent().get(),
    };

    const findByStub = sandbox
      .stub(QuestionPrismaRepository.prototype, 'findBy')
      .resolves(outputFindBy);

    const output = await usecase.execute(input);

    expect(output).toEqual({
      question: {
        ...question,
        student: {
          id: outputFindBy.student.id,
          avatar: outputFindBy.student.avatar,
          avatarUrl: outputFindBy.student.avatarUrl,
          course: outputFindBy.student.course,
          createdAt: outputFindBy.student.createdAt,
          updatedAt: outputFindBy.student.updatedAt,
          email: outputFindBy.student.email,
          registration: outputFindBy.student.registration,
        },
      },
    });
    expect(validateStub.calledOnceWithExactly(input)).toBeTruthy();
    expect(findByStub.calledOnceWithExactly({ id: input.questionId }));
  });
});
