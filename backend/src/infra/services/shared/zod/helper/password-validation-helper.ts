import { ZodString } from 'zod';

export function validateSecurePassword(password: ZodString) {
  return password
    .min(8, { message: 'O minimo de caracteres deve ser 8' })
    .max(255, { message: 'Maximo de caracteres permitido é 255' })
    .regex(/[A-Z]/, { message: 'Deve conter letra maiuscula' })
    .regex(/[a-z]/, { message: 'Deve conter letra maiuscula' })
    .regex(/\d/, { message: 'Deve conter numero' })
    .regex(/[\W_]/, { message: 'Deve conter caractere especial na senha' });
}
