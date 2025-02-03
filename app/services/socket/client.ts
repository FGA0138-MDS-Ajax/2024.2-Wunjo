import { io, Socket } from 'socket.io-client';

export const connectToSocket = (token: string): Socket => {
  return io(`ws://${process.env.EXPO_PUBLIC_API_URL!.replace(/(^\w+:|^)\/\//, '')}`, {
    reconnectionDelayMax: 10000,
    auth: {
      token,
    },
  });
};
