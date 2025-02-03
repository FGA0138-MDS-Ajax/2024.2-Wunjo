import { ChatRoomRepository } from '@/application/repositories';
import { ChatRoom } from '@/domain';
import { PrismaClient } from '@prisma/client';

export class ChatRoomPrismaRepository implements ChatRoomRepository {
  constructor(private readonly prisma: PrismaClient) {}
  async create(
    params: ChatRoomRepository.Create.Input,
  ): Promise<ChatRoomRepository.Create.Output> {
    const chatRoom = await this.prisma.chatRooms.create({
      data: {
        id: params.id,
        questionId: params.questionId,
        status: params.status,
        studentId: params.studentId,
        tutorId: params.tutorId,
      },
    });

    return chatRoom as ChatRoomRepository.Create.Output;
  }

  async getAll(
    params: ChatRoomRepository.GetAll.Input,
  ): Promise<ChatRoomRepository.GetAll.Output> {
    const chatRooms: Array<
      ChatRoom & {
        studentName: string;
        studentEmail: string;
        studentAvatar: string;
        studentAvatarUrl: string;
        studentRegistration: string;
        tutorName: string;
        tutorEmail: string;
        tutorAvatar: string;
        tutorAvatarUrl: string;
        tutorRegistration: string;
      }
    > = await this.prisma.$queryRaw`
      SELECT 
          cr.*, 
          s1."name" AS "studentName", 
          s1."email" AS "studentEmail", 
          s1."avatar" AS "studentAvatar",
          s1."avatarUrl" AS "studentAvatarUrl",
          s1."registration" AS "studentRegistration",
          s2."name" AS "tutorName",
          s2."email" AS "tutorEmail",
          s2."avatar" AS "tutorAvatar",
          s2."avatarUrl" AS "tutorAvatarUrl",
          s2."registration" AS "tutorRegistration"
      FROM "chat_rooms" cr
      LEFT JOIN "students" s1 ON cr."studentId" = s1."id"
      LEFT JOIN "students" s2 ON cr."tutorId" = s2."id"
      WHERE cr."studentId" = ${params.studentId}
        OR cr."tutorId" = ${params.studentId};
    `;

    return chatRooms.map((chatRoom) => {
      return {
        id: chatRoom.id,
        questionId: chatRoom.questionId,
        status: chatRoom.status as ChatRoom['status'],
        studentId: chatRoom.studentId,
        tutorId: chatRoom.tutorId,
        student: {
          id: chatRoom.studentId,
          name: chatRoom.studentName,
          email: chatRoom.studentEmail,
          avatar: chatRoom.studentAvatar,
          avatarUrl: chatRoom.studentAvatarUrl,
          registration: chatRoom.studentRegistration,
        },
        tutor: {
          id: chatRoom.tutorId,
          name: chatRoom.tutorName,
          email: chatRoom.tutorEmail,
          avatar: chatRoom.tutorAvatar,
          avatarUrl: chatRoom.tutorAvatarUrl,
          registration: chatRoom.tutorRegistration,
        },
        createdAt: chatRoom.createdAt,
        updatedAt: chatRoom.updatedAt,
      };
    });
  }

  async getMessages(
    params: ChatRoomRepository.GetMessages.Input,
  ): Promise<ChatRoomRepository.GetMessages.Output> {
    const chatRoom = await this.prisma.chatRooms.findUnique({
      where: {
        id: params.chatRoomId,
      },
      include: {
        messages: true,
      },
    });

    if (!chatRoom) {
      return null;
    }

    const student = await this.prisma.student.findUnique({
      where: {
        id: chatRoom.studentId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        avatarUrl: true,
        registration: true,
      },
    });

    const tutor = await this.prisma.student.findUnique({
      where: {
        id: chatRoom.tutorId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        avatarUrl: true,
        registration: true,
      },
    });

    if (!student || !tutor) {
      return null;
    }

    return {
      ...chatRoom,
      student,
      tutor,
    } as ChatRoomRepository.GetMessages.Output;
  }

  async update(
    id: string,
    params: ChatRoomRepository.Update.Input,
  ): Promise<ChatRoomRepository.Update.Output> {
    const chatRoom = await this.prisma.chatRooms.update({
      where: {
        id,
      },
      data: {
        ...params,
      },
    });

    return chatRoom as ChatRoomRepository.Update.Output;
  }

  async findBy(params: ChatRoomRepository.FindBy.Input): Promise<ChatRoomRepository.FindBy.Output> {
    const chatRoom = await this.prisma.chatRooms.findUnique({
      where: {
        ...params,
      },
    });

    return chatRoom as ChatRoomRepository.FindBy.Output;
  };
}
