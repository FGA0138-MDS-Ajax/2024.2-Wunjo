import { ChatRoomRepository } from '@/application/repositories';
import { ChatRoom, Question, Student } from '@/domain';
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
        student: Pick<
          Student,
          'id' | 'avatar' | 'avatarUrl' | 'name' | 'registration' | 'email'
        >;
        tutor: Pick<
          Student,
          'id' | 'avatar' | 'avatarUrl' | 'name' | 'registration' | 'email'
        >;
        question: Pick<
          Question,
          | 'id'
          | 'title'
          | 'description'
          | 'points'
          | 'status'
          | 'difficulty'
          | 'urgency'
          | 'tutorId'
          | 'studentId'
          | 'subjectId'
        >;
      }
    > = await this.prisma.$queryRaw`
      SELECT 
          cr.*,
          json_build_object(
              'name', s1."name",
              'email', s1."email",
              'avatar', s1."avatar",
              'avatarUrl', s1."avatarUrl",
              'registration', s1."registration"
          ) AS "student",
          json_build_object(
              'name', s2."name",
              'email', s2."email",
              'avatar', s2."avatar",
              'avatarUrl', s2."avatarUrl",
              'registration', s2."registration"
          ) AS "tutor",
          json_build_object(
            'title', q."title",
            'description', q."description",
            'points', q."points",
            'status', q."status",
            'difficulty', q."difficulty",
            'urgency', q."urgency",
            'tutorId', q."tutorId",
            'studentId', q."studentId",
            'subjectId', q."subjectId"
          ) AS "question"
      FROM "chat_rooms" cr
      LEFT JOIN "students" s1 ON cr."studentId" = s1."id"
      LEFT JOIN "students" s2 ON cr."tutorId" = s2."id"
      LEFT JOIN "questions" q ON cr."questionId" = q."id"
      WHERE cr."studentId" = ${params.studentId}
        OR cr."tutorId" = ${params.studentId};
    `;

    console.log(chatRooms);

    return chatRooms;
    // return chatRooms.map((chatRoom) => {
    //   return {
    //     id: chatRoom.id,
    //     questionId: chatRoom.questionId,
    //     status: chatRoom.status as ChatRoom['status'],
    //     studentId: chatRoom.studentId,
    //     tutorId: chatRoom.tutorId,
    //     student: {
    //       id: chatRoom.studentId,
    //       name: chatRoom.studentName,
    //       email: chatRoom.studentEmail,
    //       avatar: chatRoom.studentAvatar,
    //       avatarUrl: chatRoom.studentAvatarUrl,
    //       registration: chatRoom.studentRegistration,
    //     },
    //     tutor: {
    //       id: chatRoom.tutorId,
    //       name: chatRoom.tutorName,
    //       email: chatRoom.tutorEmail,
    //       avatar: chatRoom.tutorAvatar,
    //       avatarUrl: chatRoom.tutorAvatarUrl,
    //       registration: chatRoom.tutorRegistration,
    //     },
    //     createdAt: chatRoom.createdAt,
    //     updatedAt: chatRoom.updatedAt,
    //   };
    // });
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
        question: true,
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

  async findBy(
    params: ChatRoomRepository.FindBy.Input,
  ): Promise<ChatRoomRepository.FindBy.Output> {
    const chatRoom = await this.prisma.chatRooms.findUnique({
      where: {
        ...params,
      },
    });

    return chatRoom as ChatRoomRepository.FindBy.Output;
  }
}
