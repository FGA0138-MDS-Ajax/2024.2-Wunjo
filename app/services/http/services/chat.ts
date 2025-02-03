import { api } from '../api';
import { IChatService } from '@/interfaces/http/services';

const PREFIX = '/chat';

export const ChatService = {
  fetch: async () => {
    return api.get<IChatService.Fetch.Response>(`${PREFIX}`);
  },

  get: async (id: string) => {
    return api.get<IChatService.Get.Response>(`${PREFIX}/${id}`);
  },
};
