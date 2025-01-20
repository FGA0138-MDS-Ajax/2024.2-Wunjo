import { useState } from 'react';
import { View, Pressable, Keyboard, ScrollView } from 'react-native';

import Layout from '@/components/Layout';
import SafeAreaView from '@/components/SafeAreaView';
import { Button } from '@/components/ui/button2';
import { Input } from '@/components/ui/input2';
import { VStack } from '@/components/ui/vstack';
import { useRouter } from 'expo-router';
import { Text } from '@/components/ui/text';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { useKeyboardVisible } from '@/components/KeyboardListener';
import { BackHeader } from '@/components/ui/backheader';
import { Select } from '@/components/ui/select';

import SVGPirate from '../../assets/images/pirate';
import SVGSnowflake from '../../assets/images/snowflake-complete';
import SVGCheck from '../../assets/images/check';
import { useRegister } from './register';
import { Controller } from 'react-hook-form';
import { Courses, CoursesLabels } from '@/interfaces/application';
import { FormErrorMessage } from '@/components/ui/FormErrorMessage';

function Link({ children }: { children: React.ReactNode }) {
  return (
    <Text
      style={{
        color: '#0019BE',
      }}
    >
      {children}
    </Text>
  );
}

function CheckBox({ onPress }: { onPress: (checked: boolean) => void }) {
  const [checked, setChecked] = useState(false);

  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 3,
      }}
    >
      <Pressable
        onPress={() => {
          setChecked(!checked);
          onPress(checked);
        }}
        style={{
          borderRadius: 4,
          width: 14,
          aspectRatio: 1,
          backgroundColor: '#D9D9D9',
          borderWidth: 1,
          borderColor: '#9B9797',
        }}
      >
        {checked ? <SVGCheck size={10} color="black" /> : ''}
      </Pressable>
    </View>
  );
}

export default function Register() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  const keyboardVisible = useKeyboardVisible();

  const {
    form: {
      control,
      handleSubmit,
      formState: { errors },
    },
    mutation,
    handleSubmit: submit,
  } = useRegister();

  return (
    <SafeAreaView>
      <Layout className="h-full min-h-full">
        <BackHeader onPress={() => router.back()} label="Criar conta" />
        <Box
          style={{
            flex: 6,
            display: 'flex',
            rowGap: 25,
          }}
        >
          <VStack
            style={{
              rowGap: 10,
            }}
          >
            <FormErrorMessage errors={errors} path="root" />

            <Controller
              control={control}
              name="name"
              render={({ field: { value, onChange } }) => (
                <Input
                  label="Nome"
                  placeholder="Digite aqui..."
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            <FormErrorMessage errors={errors} path="name" />

            <Controller
              control={control}
              name="registration"
              render={({ field: { value, onChange } }) => (
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

            <Controller
              control={control}
              name="course"
              render={({ field: { value, onChange } }) => (
                <Select
                  modalVisible={modalVisible}
                  setModalVisible={setModalVisible}
                  label="Curso"
                  placeholder="Selecione..."
                  value={CoursesLabels[value as keyof typeof Courses]}
                >
                  {Object.keys(Courses).map((item) => (
                    <Pressable
                      key={item}
                      onPress={() => {
                        setModalVisible(false);
                        onChange(item);
                        Keyboard.dismiss();
                      }}
                      style={{
                        height: 48,
                        display: 'flex',
                        justifyContent: 'center',
                        paddingLeft: 16,
                        backgroundColor:
                          (value === item && '#F0F0F0') || 'white',
                      }}
                    >
                      <Text
                        className="font-raleway"
                        style={{
                          color: 'black',
                          fontSize: 15,
                        }}
                      >
                        {CoursesLabels[item as keyof typeof Courses]}
                      </Text>
                    </Pressable>
                  ))}
                </Select>
              )}
            />
            <FormErrorMessage errors={errors} path="course" />

            <Controller
              control={control}
              name="password"
              render={({ field: { value, onChange } }) => (
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
          </VStack>
          <HStack
            style={{
              columnGap: 5,
            }}
          >
            <Controller
              control={control}
              name="terms"
              render={({ field: { onChange } }) => (
                <CheckBox
                  onPress={(checked) => {
                    onChange(checked);
                  }}
                />
              )}
            />
            <Text
              style={{
                color: 'black',
              }}
            >
              Aceito os <Link>Termos de Uso</Link> e{' '}
              <Link>Políticas de Privacidade</Link>
            </Text>
          </HStack>
          <FormErrorMessage errors={errors} path="terms" />
          <Button
            onPress={handleSubmit(submit)}
            label="Criar conta"
            isLoading={mutation.isPending}
          >
            {!mutation.isPending && (
              <SVGSnowflake
                size={28}
                style={{
                  position: 'absolute',
                  height: '50%',
                  aspectRatio: 1,
                  left: '30%',
                }}
              />
            )}
          </Button>
        </Box>
        {!keyboardVisible && (
          <Box
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: '100%',
            }}
          >
            <SVGPirate />
          </Box>
        )}
      </Layout>
    </SafeAreaView>
  );
}
