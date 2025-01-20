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
    return api.post<IQuestionService.Create.Response>('/create', body);
  },
};
