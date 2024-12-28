export const EmailType = {
  REGISTRATION: 'REGISTRATION',
  FORGOT_PASSWORD: 'FORGOT_PASSWORD',
};

export type EmailTypes = keyof typeof EmailType;
