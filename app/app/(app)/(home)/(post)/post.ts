import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AuthService } from '@/http/services/auth';
import { useRouter } from 'expo-router';
import {
  IQuestionDifficulty,
  IQuestionUrgency,
  QuestionDifficulties,
  QuestionUrgencies,
} from '@/interfaces/application';

export type IFormInputs = {
  subjectId: string;
  title: string;
  description: string;
  difficulty: IQuestionDifficulty;
  urgency: IQuestionUrgency;
};

const schema = z.object({
  subjectId: z.string().min(1).max(255),
  title: z.string().min(1).max(255).default('default'),
  description: z.string().min(1).max(255),
  difficulty: z.nativeEnum(QuestionDifficulties, {
    message: 'Selecione uma dificuldade',
  }),
  urgency: z.nativeEnum(QuestionUrgencies, {
    message: 'Selecione uma urgência',
  }),
});

export const usePostQuestion = () => {
  const router = useRouter();

  const form = useForm<IFormInputs>({
    resolver: zodResolver(schema),
    // defaultValues
  });

  const mutation = useMutation({
    mutationFn: AuthService.register,
  });

  const handleSubmit = async (data: IFormInputs) => {
    console.log(data);
    // mutation.mutate(
    //   {
    //     registration: data.registration,
    //     password: data.password,
    //     course: data.course,
    //     name: data.name,
    //   },
    //   {
    //     onSuccess: async () => {
    //       router.push('/(register)/(complete)');
    //     },
    //     onError: (error: any) => {
    //       console.log(JSON.stringify(error?.response?.data, null, 2));

    //       switch (error?.response?.data?.type) {
    //         case 'AlreadyExistsError':
    //           form.setError('root', {
    //             type: 'manual',
    //             message: '*Estudante já cadastrado com essa matrícula',
    //           });
    //           break;
    //         case 'ValidationError':
    //           const errors = error.response.data.errors;

    //           errors.map(
    //             (error: { code: string; message: string; path: string[] }) => {
    //               form.setError(error.path.join('.') as unknown as any, {
    //                 type: 'manual',
    //                 message: error.message,
    //               });
    //             },
    //           );
    //           break;
    //         case 'NotFoundError':
    //           form.setError('root', {
    //             type: 'manual',
    //             message: '*Aluno não encontrado',
    //           });
    //           break;
    //         case 'PendingRegistrationError':
    //           form.setError('root', {
    //             type: 'PendingRegistrationError',
    //             message:
    //               '*Matrícula pendente de confirmação, verifique seu email institucional e clique no link de confirmação',
    //           });
    //           break;
    //         default:
    //           form.setError('root', {
    //             type: 'manual',
    //             message: 'Erro inesperado',
    //           });
    //           break;
    //       }
    //     },
    //   },
    // );
  };

  return {
    form,
    handleSubmit,
    mutation,
  };
};
