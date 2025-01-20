import Layout from '@/components/Layout';
import SafeAreaView from '@/components/SafeAreaView';
import { Button } from '@/components/ui/button2';
import { Input } from '@/components/ui/input2';
import { useRouter } from 'expo-router';
import { Text } from '@/components/ui/text';
import { Box } from '@/components/ui/box';
import { View } from 'react-native';

import Logo from '../assets/images/logo';
import Island from '../assets/images/island';
import Snowflake from '../assets/images/snowflake';
import { useLogin } from './login';
import { Controller } from 'react-hook-form';
import { useKeyboardVisible } from '@/components/KeyboardListener';
import { FormErrorMessage } from '@/components/ui/FormErrorMessage';

export default function Screen() {
  const router = useRouter();

  const {
    form: {
      control,
      handleSubmit,
      formState: { errors },
    },
    handleSubmit: submit,
    mutation: { isPending },
  } = useLogin();

  const hasKeyboard = useKeyboardVisible();

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#F5F6FA',
      }}
    >
      <Layout>
        <View className="h-full" style={{}}>
          <View
            className="flex items-center justify-center"
            style={{
              // backgroundColor: "rgba(0, 0, 0, 0.05)",
              flex: 1.3,
            }}
          >
            <Logo />
          </View>
          <Box
            style={{
              flex: 3,
              display: 'flex',
              // backgroundColor: "rgba(0, 255, 0, 0.1)",
              rowGap: 24,
            }}
          >
            {errors.root?.message && (
              <>
                <Text
                  className="font-raleway"
                  style={{
                    color: '#C90000',
                    fontSize: 15,
                  }}
                >
                  {errors.root.message}
                </Text>
                {errors.root.type === 'PendingRegistrationError' && (
                  <Text
                    className="font-raleway"
                    style={{
                      color: '#C90000',
                      fontSize: 15,
                    }}
                  >
                    Não recebeu o e-mail de confirmação?{' '}
                    <Text
                      onPress={() => {}}
                      className="font-raleway-bold text-primary-500"
                    >
                      Clique aqui para enviar novamente
                    </Text>
                  </Text>
                )}
              </>
            )}

            <Box className="gap-2">
              <Controller
                control={control}
                name="registration"
                render={({ field: { onChange, value } }) => (
                  <Input
                    keyboardType="numeric"
                    label="Matrícula"
                    placeholder="Digite aqui..."
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              <FormErrorMessage errors={errors} path="registration" />
            </Box>

            <Box className="gap-2">
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <Input
                    secureTextEntry={true}
                    label="Senha"
                    placeholder="Digite aqui..."
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              <FormErrorMessage errors={errors} path="password" />
            </Box>

            <Button label="Entrar" onPress={handleSubmit(submit)} isLoading={isPending}>
              <Snowflake
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  width: '13.5%',
                  height: '100%',
                }}
              />
            </Button>

            <View>
              <Text
                onPress={() => router.push('/(register)')}
                style={{
                  color: '#703111',
                  textAlign: 'center',
                  textDecorationLine: 'underline',
                  fontSize: 12,
                }}
              >
                Criar conta
              </Text>
              <Text
                onPress={() => router.push('/(register)/(recover)')}
                style={{
                  textAlign: 'center',
                  textDecorationLine: 'underline',
                  fontSize: 12,
                }}
              >
                Esqueci minha senha
              </Text>
            </View>
          </Box>
        </View>
      </Layout>
      <Box
        style={{
          position: 'absolute',
          flex: 1,
          left: -25,
          bottom: hasKeyboard ? -200 : 0,
          width: '100%',
          height: '25%',
          pointerEvents: 'none',
        }}
      >
        <Island width={446} height={251} />
      </Box>
    </SafeAreaView>
  );
}
