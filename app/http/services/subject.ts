import { ISubjectService } from '@/interfaces/http/services/subject';
import { api } from '../api';

export async function getAllSubjects(params?: ISubjectService.Fetch.Request) {
  return api.get<ISubjectService.Fetch.Response>('/subject', {
    params,
  });
}
