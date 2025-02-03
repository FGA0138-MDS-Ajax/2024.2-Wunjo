import logger from '@/infra/logger';
import { Server } from 'socket.io';
import { receivers } from './receivers';

export class Socket {
  private static instance: Socket;
  private io: Server;
  private students: any = {};
  private socketIdToStudent: any = {};

  private constructor(server: Server) {
    // private constructor
    this.io = server;

    // console.log(this.io);
    logger.info('Socket is up!!!');

    this.io.on('connection', (socket) => {
      logger.info('a user connected');

      // socket.on('join', (student: any) => {
      //   console.log(socket.handshake.auth);

      //   this.students[student.id] = {
      //     socketId: socket.id,
      //     socket,
      //     student,
      //   };

      //   this.socketIdToStudent[socket.id] = student.id;

      //   // this.users[user.id] = {
      //   //   socketId: socket.id,
      //   //   socket: socket,
      //   //   user,
      //   // };

      //   // this.socketIdUserId[socket.id] = user.id;
      // });

      Object.keys(receivers).forEach((receiver) => {
        socket.on(receiver, receivers[receiver](socket));
      });
      // socket.on('send-message', (message) => {
      //   console.log(message);

      //   const studentId = this.socketIdToStudent[socket.id];

      //   if (studentId) {
      //     const student = this.students[studentId];

      //     if (student) {
      //       student.socket.emit('message', message);
      //     }
      //   }
      // });

      socket.on('disconnect', () => {
        const userId = this.socketIdToStudent[socket.id];

        if (userId) {
          delete this.students[userId];
          delete this.socketIdToStudent[socket.id];
        }
        console.log('user disconnected');
      });
    });
  }

  static async getInstance(server: Server): Promise<Socket> {
    if (!Socket.instance) {
      Socket.instance = new Socket(server);
    }

    return Socket.instance;
  }

  public static sendMessageToStudents(studentsId: string[], message: any) {
    studentsId.forEach((studentId) => {
      const student = this.instance.students[studentId];

      if (student) {
        student.socket.emit('message', message);
      }
    });
  }

  public static notifyStudentOnConversationCreate(
    studentId: string[],
    message: any,
  ) {
    studentId.forEach((studentId) => {
      const student = this.instance.students[studentId];

      if (student) {
        student.socket.emit('conversation', message);
      }
    });
  }

  public static addNewStudent(student: any, socket: any) {
    this.instance.students[student.id] = {
      socketId: socket.id,
      socket,
      student,
    };

    this.instance.socketIdToStudent[socket.id] = student.id;

    console.log(this.instance.students);
    console.log(this.instance.socketIdToStudent);
  }

  public static removeStudent(socket: any) {
    const userId = this.instance.socketIdToStudent[socket.id];

    if (userId) {
      delete this.instance.students[userId];
      delete this.instance.socketIdToStudent[socket.id];
    }
  }

  public static getStudent(studentId: string) {
    return this.instance.students[studentId];
  }

  public static getStudentBySocketId(socketId: string) {
    return this.instance.students[this.instance.socketIdToStudent[socketId]];
  }

  public static emit(event: string, data: any) {
    this.instance.io.emit(event, data);
  }
}
