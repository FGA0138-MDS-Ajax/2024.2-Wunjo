import { IQuestionService } from '@/interfaces/http';
import { api } from '../api';

const PREFIX = '/question';

export const QuestionService = {
  fetch: async (filter: IQuestionService.Fetch.Request) => {
    return api.get<IQuestionService.Fetch.Response>(`${PREFIX}`, {
      params: filter,
    });
  },

  get: async (params: IQuestionService.Get.Request) => {
    return api.get(`${PREFIX}/${params.id}`);
  },

  create: async (body: IQuestionService.Create.Request) => {
    return api.post<IQuestionService.Create.Response>(`${PREFIX}/create`, body);
  },

  reply: async (params: IQuestionService.Reply.Request) => {
    return api.post<IQuestionService.Reply.Response>(`${PREFIX}/reply/${params.questionId}`);
  }
};
