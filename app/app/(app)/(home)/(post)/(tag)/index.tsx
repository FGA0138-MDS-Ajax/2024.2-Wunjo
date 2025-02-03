import React, { useCallback, useEffect, useState } from 'react';
import TreasureChest from '@/assets/images/Treasure-chest';
import { useRouter } from 'expo-router';
import { usePostQuestion } from '../post';
import SafeAreaView from '@/components/SafeAreaView';
import { BackHeader } from '@/components/ui/backheader';
import { Text } from '@/components/ui/text';
import { FlatList, Keyboard, Pressable, ScrollView, View } from 'react-native';
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
import { getAllSubjects } from '@/services/http/services/subject';
import { Box } from '@/components/ui/box';
import colors from 'tailwindcss/colors';
import debounce from 'lodash.debounce';

export default function Screen() {
  const router = useRouter();
  const [dificultyVisible, setDificultyVisible] = useState(false);
  const [urgencyVisible, setUrgencyVisible] = useState(false);
  const [subjectsVisible, setSubjectsVisible] = useState(false);
  const [subjects, setSetSubjects] = useState<
    Array<{ id: string; code: string; name: string }>
  >([]);
  const [inputSearch, setInputSearch] = useState<string>('');

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

  async function pegarDados(search: string) {
    try {
      const response = await getAllSubjects({
        search: search,
      });

      setSetSubjects(response.data.subjects);
    } catch (err) {
      console.log(err);
    }
  }

  const requestData = useCallback(debounce(pegarDados, 500), []);
  useEffect(() => {
    requestData(inputSearch);
  }, [inputSearch]);

  return (
    <SafeAreaView
      style={{
        height: '100%',
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
                <Select
                  label="Sua dúvida pertence a qual disciplina?"
                  modalVisible={subjectsVisible}
                  setModalVisible={setSubjectsVisible}
                  placeholder="Selecione..."
                  value={
                    (subjects.find((item: any) => item.id === value) as any)
                      ?.name
                  }
                >
                  <Box className="mx-4 mb-4">
                    <Input
                      placeholder="Pesquise aqui..."
                      style={{
                        backgroundColor: colors.gray[100],
                      }}
                      value={inputSearch}
                      onChangeText={setInputSearch}
                    />
                  </Box>

                  <FlatList
                    data={subjects}
                    renderItem={({ item }) => (
                      <Pressable
                        key={item.id}
                        onPress={() => {
                          onChange(item.id);
                          setSubjectsVisible(false);
                        }}
                        style={{
                          height: 48,
                          display: 'flex',
                          justifyContent: 'center',
                          paddingLeft: 16,
                          backgroundColor:
                            (value === item.id && '#F0F0F0') || 'white',
                        }}
                      >
                        <Text
                          className="font-raleway"
                          style={{
                            color: 'black',
                            fontSize: 15,
                          }}
                        >
                          {item.code} - {item.name}
                        </Text>
                      </Pressable>
                    )}
                  />
                </Select>
                // <Input
                //   label="Sua dúvida pertence a qual disciplina?"
                //   placeholder="Digite aqui.."
                //   value={value}
                //   onChangeText={onChange}
                // />
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
