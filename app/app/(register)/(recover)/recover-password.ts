import { AuthService } from '@/services/http/services/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export type IFormInputs = {
  stepOne: {
    registration: string;
  };
  stepTwo: {
    code: string;
  };
  stepThree: {
    password: string;
    confirmPassword: string;
  };
};

const recoveryPasswordSchema = {
  stepOne: z.object({
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
  }),
  stepTwo: z.object({
    code: z.string().length(4),
  }),
  stepThree: z
    .object({
      password: z.string().min(8).max(255),
      confirmPassword: z.string().min(8).max(255),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'As senhas não coincidem',
      path: ['confirmPassword'],
    }),
};

export const useStepOneRecoveryPassword = () => {
  const form = useForm<IFormInputs['stepOne']>({
    resolver: zodResolver(recoveryPasswordSchema.stepOne),
  });

  const router = useRouter();

  const requestCodeMutation = useMutation({
    mutationFn: AuthService.requestRecoveryPasswordCode,
  });

  const handleSubmit = async (data: IFormInputs['stepOne']) => {
    requestCodeMutation.mutate(
      {
        registration: data.registration,
      },
      {
        onSuccess: () => {
          router.push({
            pathname: '/(register)/(recover)/(input)',
            params: {
              registration: data.registration,
            },
          });
        },
        onError: (error: any) => {
          switch (error?.response?.data?.type) {
            case 'NotFoundError':
              form.setError('registration', {
                type: 'manual',
                message: 'Matrícula não encontrada',
              });
              break;
            default:
              form.setError('root', {
                type: 'manual',
                message: '*Erro inesperado',
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
    mutation: requestCodeMutation,
  };
};

export const useTwoRecoveryPassword = () => {
  const form = useForm<IFormInputs['stepTwo']>({
    resolver: zodResolver(recoveryPasswordSchema.stepTwo),
    defaultValues: {
      code: '',
    },
  });

  const router = useRouter();
  const { registration } = useLocalSearchParams<{ registration: string }>();

  const mutation = useMutation({
    mutationFn: AuthService.confirmRecoveryCode,
  });

  const handleSubmit = async (data: IFormInputs['stepTwo']) => {
    mutation.mutate(
      {
        code: data.code,
        registration,
      },
      {
        onSuccess: (response) => {
          router.push({
            pathname: '/(register)/(recover)/(password)',
            params: {
              studentId: response.data.studentId,
              code: data.code,
            },
          });
        },
        onError: (error: any) => {
          console.log(error?.response?.data);
          switch (error?.response?.data?.type) {
            case 'ValidationError':
              form.setError('code', {
                type: 'manual',
                message: error.response.data.message,
              });
              break;
            case 'NotFoundError':
              form.setError('code', {
                type: 'manual',
                message: error.response.data.message,
              });
              break;
            default:
              form.setError('root', {
                type: 'manual',
                message: '*Erro inesperado',
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

export const useThreeRecoveryPassword = () => {
  const form = useForm<IFormInputs['stepThree']>({
    resolver: zodResolver(recoveryPasswordSchema.stepThree),
  });

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: AuthService.changePassword,
  });

  const params = useLocalSearchParams<{ studentId: string; code: string }>();

  const handleSubmit = async (data: IFormInputs['stepThree']) => {
    console.log(data, params);

    mutation.mutate(
      {
        code: params.code,
        studentId: params.studentId,
        confirmPassword: data.confirmPassword,
        password: data.password,
      },
      {
        onSuccess: () => {
          router.push('/(register)/(recover)/(success)');
        },
        onError: (error: any) => {
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
            case 'NotFoundError':
              form.setError('root', {
                type: 'manual',
                message: error.response.data.message,
              });
              break;
            default:
              form.setError('root', {
                type: 'manual',
                message: '*Erro inesperado',
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
