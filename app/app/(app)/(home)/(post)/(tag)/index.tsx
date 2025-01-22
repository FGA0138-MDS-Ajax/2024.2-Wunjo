import React, { useState } from 'react';
import { Template } from '@/app/(app)/(home)/(filter)';
import TreasureChest from '@/assets/images/Treasure-chest';
import { useRouter } from 'expo-router';
import { usePostQuestion } from '../post';
import SafeAreaView from '@/components/SafeAreaView';
import { BackHeader } from '@/components/ui/backheader';
import { Text } from '@/components/ui/text';
import { Keyboard, Pressable, View } from 'react-native';
import { FormErrorMessage } from '@/components/ui/FormErrorMessage';
import { Input } from '@/components/ui/input2';
import { Select } from '@/components/ui/select';
import { Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button2';
import Layout from '@/components/Layout';
import { useKeyboardVisible } from '@/components/KeyboardListener';
import {
  QuestionDifficulties,
  QuestionDificultyLabels,
  QuestionUrgencies,
  QuestionUrgencyLabels,
} from '@/interfaces/application';

export default function Screen() {
  const router = useRouter();
  const [dificultyVisible, setDificultyVisible] = useState(false);
  const [urgencyVisible, setUrgencyVisible] = useState(false);

  const {
    form: {
      control,
      handleSubmit,
      formState: { errors },
    },
    handleSubmit: submit,
    mutation: { isPending },
  } = usePostQuestion();

  const keyboardIsOpen = useKeyboardVisible();

  return (
    <SafeAreaView
      style={{
        // flex: 1,
        height: '100%',
        // alignItems: 'center',
      }}
    >
      <Layout className="items-center h-full">
        {!keyboardIsOpen && (
          <TreasureChest
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
            }}
          />
        )}
        {/* Botão de voltar */}
        <BackHeader onPress={() => router.back()} label=""></BackHeader>

        {/* Título */}
        <Text
          style={{
            // flex: 1,
            marginBottom: 24,
            paddingTop: 10,
            fontSize: 28,
            color: '#8B0000',
            textAlign: 'center',
          }}
          className="font-itim"
        >
          Espalhe o tesouro!{'\n'}Compartilhe a sua dúvida!
        </Text>

        <View
          style={{
            flex: 4,
            width: '100%',
            //backgroundColor: "#8B0000",
            flexDirection: 'column',
            rowGap: 20,
            alignItems: 'center',
          }}
        >
          <FormErrorMessage errors={errors} path="root" />

          <View className="w-full">
            <Controller
              control={control}
              name="title"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Digite um título para sua dúvida"
                  placeholder="Preciso de ajuda com..."
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            <FormErrorMessage errors={errors} path="subjectId" />
          </View>

          <View className="w-full">
            <Controller
              control={control}
              name="subjectId"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Sua dúvida pertence a qual disciplina?"
                  placeholder="Digite aqui.."
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            <FormErrorMessage errors={errors} path="subjectId" />
          </View>

          {/* Colocar Dificuldade */}
          <View>
            <Controller
              control={control}
              name="difficulty"
              render={({ field: { onChange, value } }) => (
                <Select
                  modalVisible={dificultyVisible}
                  setModalVisible={setDificultyVisible}
                  label={'Dificuldade da sua dúvida'}
                  placeholder="Selecione..."
                  value={
                    QuestionDificultyLabels[
                      value as keyof typeof QuestionDifficulties
                    ]
                  }
                  modalHeight={3}
                >
                  {Object.keys(QuestionDifficulties).map((item) => (
                    <Pressable
                      key={item}
                      onPress={() => {
                        setDificultyVisible(false);
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
                        {
                          QuestionDificultyLabels[
                            item as keyof typeof QuestionDifficulties
                          ]
                        }
                      </Text>
                    </Pressable>
                  ))}
                </Select>
              )}
            />
            <FormErrorMessage errors={errors} path="difficulty" />
          </View>
          <View>
            <Controller
              control={control}
              name="urgency"
              render={({ field: { onChange, value } }) => (
                <Select
                  modalVisible={urgencyVisible}
                  setModalVisible={setUrgencyVisible}
                  label={'Urgencia da sua dúvida'}
                  placeholder="Selecione..."
                  value={
                    QuestionUrgencyLabels[
                      value as keyof typeof QuestionUrgencies
                    ]
                  }
                  modalHeight={3}
                >
                  {Object.keys(QuestionUrgencies).map((item) => (
                    <Pressable
                      key={item}
                      onPress={() => {
                        setUrgencyVisible(false);
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
                        {
                          QuestionUrgencyLabels[
                            item as keyof typeof QuestionUrgencies
                          ]
                        }
                      </Text>
                    </Pressable>
                  ))}
                </Select>
              )}
            />
            <FormErrorMessage errors={errors} path="urgency" />
          </View>

          <Button
            onPress={handleSubmit(submit)}
            label="Publicar"
            style={{
              width: '90%',
            }}
            isLoading={isPending}
          />
        </View>
      </Layout>
    </SafeAreaView>
  );
}
