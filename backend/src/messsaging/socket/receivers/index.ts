import { Socket } from 'socket.io';
import { sendMessageReceiver } from './send-message-receiver';
import { joinReceiver } from './join-receiver';

export const receivers: {
  [key: string]: (socket: Socket) => (data: any) => Promise<void>;
} = {
  'send-message': sendMessageReceiver,
  join: joinReceiver,
};
