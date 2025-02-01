import { ZodString } from 'zod';

export function validateStudentRegistration(zod: ZodString) {
  return zod.refine(
    (data) => {
      if (
        Number(data[0]) > 2 || Number(data[0]) < 1
      ) {
        return false;
      }

      return true;
    },
    {
      message: 'A matrícula deve começar com 1 ou 2',
    },
  );
}
