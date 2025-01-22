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
import { useUnBordo } from '@/hooks/unbordo';
import { QuestionService } from '@/http/services/question';

export type IQuestionFormInputs = {
  subjectId: string;
  title: string;
  description: string;
  difficulty: IQuestionDifficulty;
  urgency: IQuestionUrgency;
};

const schema = z.object({
  subjectId: z.string().min(1).max(255),
  title: z.string().min(1).max(255).default('default'),
  description: z.string(),
  difficulty: z.nativeEnum(QuestionDifficulties, {
    message: 'Selecione uma dificuldade',
  }),
  urgency: z.nativeEnum(QuestionUrgencies, {
    message: 'Selecione uma urgência',
  }),
});

export const usePostQuestion = () => {
  const router = useRouter();

  const { forms } = useUnBordo();
  const form = useForm<IQuestionFormInputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...forms.question,
    },
  });

  const mutation = useMutation({
    mutationFn: QuestionService.create,
  });

  const handleSubmit = async (data: IQuestionFormInputs) => {
    console.log(data);
    mutation.mutate(
      {
        description: data.description,
        difficulty: data.difficulty,
        subjectId: data.subjectId,
        title: data.title,
        urgency: data.urgency,
      },
      {
        onSuccess: async (response) => {
          console.log(JSON.stringify(response.data, null, 2));
          router.push('/(app)/(home)/(post)/(success)');
          forms.setQuestion({
            subjectId: '',
            title: '',
            description: '',
            difficulty: '' as any,
            urgency: '' as any,
          });
        },
        onError: (error: any) => {
          console.log(JSON.stringify(error?.response?.data, null, 2));

          switch (error?.response?.data?.type) {
            case 'ValidationError':
              const errors = error.response.data.errors;

              errors.map(
                (error: { code: string; message: string; path: string[] }) => {
                  form.setError(error.path.join('.') as unknown as any, {
                    type: 'manual',
                    message: error.message,
                  });
                },
              );
              break;
            default:
              form.setError('root', {
                type: 'manual',
                message: 'Erro inesperado',
              });
              break;
          }
        },
      },
    );
  };

  const handleNextPage = () => {
    if (form.getValues('description').trim() === '') {
      form.setError('description', {
        type: 'required',
        message: 'Digite sua dúvida',
      });
      return;
    }

    form.setValue('description', form.getValues('description').trim());
    forms.setQuestion(form.getValues());
    router.push('/(app)/(home)/(post)/(tag)');
  };

  return {
    form,
    handleSubmit,
    mutation,
    handleNextPage,
  };
};
