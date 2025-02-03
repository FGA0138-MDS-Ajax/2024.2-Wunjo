import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AuthService } from '@/services/http/services/auth';
import { useRouter } from 'expo-router';
import { useUnBordo } from '@/hooks/unbordo';
import { api } from '@/services/http/api';

export type IFormInputs = {
  registration: string;
  password: string;
};

const loginSchema = z.object({
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
  password: z.string().min(8).max(255),
});

export const useLogin = () => {
  const router = useRouter();

  const { auth } = useUnBordo();

  const form = useForm<IFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: AuthService.login,
  });

  const handleSubmit = async (data: IFormInputs) => {
    // console.log(data);
    // try {
    //   console.log('TRY LOGIN');
    //   const response = await api.get('http://10.0.2.2:3001/api/v1/subject');
    //   console.log(response);
    //   return;
    // } catch (err) {
    //   console.log(JSON.stringify(err, null, 2));
    //   return;
    // }

    mutation.mutate(
      {
        registration: data.registration,
        password: data.password,
      },
      {
        onSuccess: async (response) => {
          console.log(response.data);
          await auth.authenticate(response.data.accessToken);
          router.replace('/(app)/(home)');
        },
        onError: (error: any) => {
          console.log(JSON.stringify(error, null, 2));
          console.log(JSON.stringify(error?.response?.data, null, 2));

          switch (error?.response?.data?.type) {
            case 'UnauthenticatedError':
              form.setError('root', {
                type: 'manual',
                message: '*Matrícula ou senha inválida',
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
