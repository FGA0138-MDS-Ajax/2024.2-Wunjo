import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AuthService } from '@/http/services/auth';
import { useRouter } from 'expo-router';
import { Courses, ICourse } from '@/interfaces/application';

export type IFormInputs = {
  registration: string;
  password: string;
  name: string;
  course: ICourse;
  terms: boolean;
};

const schema = z.object({
  registration: z
    .string()
    .min(1)
    .max(9)
    .refine(
      (value) => {
        return /^\d+$/.test(value);
      },
      {
        message: 'A matrícula deve conter apenas números',
      },
    ),
  name: z.string().min(1).max(255),
  password: z.string().min(8).max(255),
  course: z.nativeEnum(Courses, {
    message: 'Selecione um curso',
  }),
  terms: z.boolean().refine((value) => !value, {
    message: 'Marque a caixa para continuar',
  }),
});

export const useRegister = () => {
  const router = useRouter();

  // const { auth } = useUnBordo();

  const form = useForm<IFormInputs>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: AuthService.register,
  });

  const handleSubmit = async (data: IFormInputs) => {
    console.log(data);
    mutation.mutate(
      {
        registration: data.registration,
        password: data.password,
        course: data.course,
        name: data.name,
      },
      {
        onSuccess: async () => {
          router.push('/(register)/(complete)');
        },
        onError: (error: any) => {
          console.log(JSON.stringify(error?.response?.data, null, 2));

          switch (error?.response?.data?.type) {
            case 'AlreadyExistsError':
              form.setError('root', {
                type: 'manual',
                message: '*Estudante já cadastrado com essa matrícula',
              });
              break;
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
            case 'NotFoundError':
              form.setError('root', {
                type: 'manual',
                message: '*Aluno não encontrado',
              });
              break;
            case 'PendingRegistrationError':
              form.setError('root', {
                type: 'PendingRegistrationError',
                message:
                  '*Matrícula pendente de confirmação, verifique seu email institucional e clique no link de confirmação',
              });
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

  return {
    form,
    handleSubmit,
    mutation,
  };
};
