import { api } from '../api';
import { IRankingService } from '@/interfaces/http/services';

const PREFIX = '/ranking';

export const RankingService = {
  fetch: async () => {
    return api.get<IRankingService.Fetch.Response>(`${PREFIX}`);
  },
};
