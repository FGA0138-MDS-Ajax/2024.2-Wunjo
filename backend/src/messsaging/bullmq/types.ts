export const bullMQQueueNames = {
  SEND_EMAIL: 'SEND_EMAIL',
} as const;

export type BullMQueueNames =
  (typeof bullMQQueueNames)[keyof typeof bullMQQueueNames];
