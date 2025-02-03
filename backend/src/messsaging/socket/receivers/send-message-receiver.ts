import { Socket as IoSocket } from 'socket.io';
import { Socket } from '..';
import { SendMessageUsecase } from '@/application/usecases';
import { container } from '@/infra/container';

export function sendMessageReceiver(socket: IoSocket) {
  return async (data: { chatId: string; message: string }) => {
    const studentSocket = Socket.getStudentBySocketId(socket.id);

    const usecase: SendMessageUsecase = container.get(SendMessageUsecase.Name);

    const output = await usecase.execute({
      chatId: data.chatId,
      message: data.message,
      senderId: studentSocket.student.id,
    });

    Socket.emit(output.message.chatId, output.message);
  };
}
