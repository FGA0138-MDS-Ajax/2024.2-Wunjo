export const EmailType = {
  REGISTRATION: 'REGISTRATION',
  FORGOT_PASSWORD: 'FORGOT_PASSWORD',
} as const;

export type EmailTypes = keyof typeof EmailType;
