import { z } from 'zod';

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  console.log(issue);

  if (issue.code === z.ZodIssueCode.invalid_type) {
    if (['string', 'boolean'].includes(issue.expected)) {
      return { message: 'Campo obrigatório' };
    }
  }

  if (issue.code === z.ZodIssueCode.too_small) {
    return {
      message: `O conteúdo deve ter pelo menos ${issue.minimum} caracteres`,
    };
  }

  if (issue.code === z.ZodIssueCode.too_big) {
    return {
      message: `O conteúdo não deve ultrapassar ${issue.maximum} caracteres`,
    };
  }

  return { message: ctx.defaultError };
};

z.setErrorMap(customErrorMap);
