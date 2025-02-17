import { ValidationError } from '@/application/error';
import { Validator } from '@/application/services';
import { UpdateStudentUsecase } from '@/application/usecases';
import { Course } from '@/domain';
import { z } from 'zod';

export class UpdateStudentUsecaseZodValidator implements Validator<UpdateStudentUsecase.Input> {
  private readonly schema = z.object({
    studentId: z.string().uuid(),
    name: z.string().optional(),
    course: z.nativeEnum(Course).optional(),
    rankingParticipant: z.boolean().optional(),
    avatar: z.string().optional(),
  });

  async validate(input: any): Promise<UpdateStudentUsecase.Input> {
    const validateResult = await this.schema.safeParseAsync(input);

    if (!validateResult.success) {
      throw new ValidationError(validateResult.error.issues);
    }

    return validateResult.data as UpdateStudentUsecase.Input;
  }
}
