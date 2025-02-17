import { StudentRepository } from '@/application/repositories';
import { container } from '@/infra/container';
import { Socket as IoSocket } from 'socket.io';
import { Socket } from '..';

export function joinReceiver(socket: IoSocket) {
  return async () => {
    const studentTokenManager = container.get('StudentTokenManager');

    const tokenIsValid = await studentTokenManager.verify(
      socket.handshake.auth.token,
    );

    if (!tokenIsValid) {
      socket.disconnect();
      return;
    }

    const tokenResult = await studentTokenManager.decrypt(
      socket.handshake.auth.token,
    );

    const repo = container.get(StudentRepository.Name);

    const student = await repo.findBy({
      where: {
        id: tokenResult.studentId,
      },
    });

    if (!student) {
      socket.disconnect();
      return;
    }

    Socket.addNewStudent(
      {
        id: student.id,
        name: student.name,
        registration: student.registration,
      },
      socket,
    );
  };
}
