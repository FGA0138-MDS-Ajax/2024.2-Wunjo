// ChatOptions.tsx
import React, { useState } from 'react';
import {
  Modal,
  TouchableWithoutFeedback,
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';
import { Input, InputField } from '@/components/ui/input';
import { StyleSheet, Image } from 'react-native';
import PlayerProfile from '../player-profile';
import { Select } from '../select';
import StarRating from './StarRating';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { ChatService } from '@/http/services/chat';

//simulacao usuario
const user = {
  id: '1',
  name: 'Renan V. Guedes',
  avatar: require('@/assets/avatars/avatar1.webp'),
  email: '21012345@aluno.unb.br',
  title: 'Marujo',
  course: 'Engenharia Aeroespacial',
  matricula: '21012345',
  ranking: 1,
  gamification: true,
  answers: 42,
  questions: 10,
  average: 4.5,
  points: 121,
};

interface ChatOptionsProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  EndChatConfirmation: boolean;
  setEndChatConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
  endChatQuestion: boolean;
  setEndChatQuestion: React.Dispatch<React.SetStateAction<boolean>>;
  rateChatResponse: boolean;
  setRateChatResponse: React.Dispatch<React.SetStateAction<boolean>>;
  rateChatNotResponse: boolean;
  setRateChatNotResponse: React.Dispatch<React.SetStateAction<boolean>>;
  ChatEndResponse: boolean;
  setChatEndResponse: React.Dispatch<React.SetStateAction<boolean>>;
  ChatEndNotResponse: boolean;
  setChatEndNotResponse: React.Dispatch<React.SetStateAction<boolean>>;
  reportModalVisible: boolean;
  setReportModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  reportQuestionVisible: boolean;
  setReportQuestionVisible: React.Dispatch<React.SetStateAction<boolean>>;
  reportEndVisible: boolean;
  setReportEndVisible: React.Dispatch<React.SetStateAction<boolean>>;
  chatId?: string;
}

interface ICloseChatForm {
  hasAnswered: boolean;
  avaliation: number;
}

const ChatOptions: React.FC<ChatOptionsProps> = ({
  modalVisible,
  setModalVisible,
  EndChatConfirmation,
  setEndChatConfirmation,
  endChatQuestion,
  setEndChatQuestion,
  rateChatResponse,
  setRateChatResponse,
  rateChatNotResponse,
  setRateChatNotResponse,
  ChatEndResponse,
  setChatEndResponse,
  ChatEndNotResponse,
  setChatEndNotResponse,
  reportModalVisible,
  setReportModalVisible,
  reportQuestionVisible,
  setReportQuestionVisible,
  reportEndVisible,
  setReportEndVisible,
  chatId,
}) => {
  const [modalDenunciaVisible, setModalDenunciaVisible] = useState(false);
  const [denuncia, setDenuncia] = useState('');

  const {
    handleSubmit,
    setValue,
  } = useForm<ICloseChatForm>();

  const mutation = useMutation({
    mutationFn: ChatService.close,
  });

  const handleRequestCloseChat = (data: ICloseChatForm) => {
    if(!chatId) throw new Error('ChatId is required');
    console.log('closing', chatId, data);
    mutation.mutate({
      id: chatId,
      hasBeenAnswered: data.hasAnswered,
      avaliation: data.avaliation,
    }, {
      onSuccess: () => {
        console.log("Sucess!");
        setRateChatResponse(false);
        setChatEndResponse(true);
      },
      onError: () => {
        console.log("err!");
        setRateChatResponse(false);
        setChatEndResponse(true);
      }
    });

  };

  const [showProfile, setShowProfile] = useState(false);
  const handleSeeProfile = () => {
    setShowProfile(true);
  };
  return (
    <>
      {/* Modal de opcoes */}
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.modalContent}>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                    setEndChatConfirmation(true);
                  }}
                >
                  <Text style={styles.modalButtonText}>Encerrar bate papo</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleSeeProfile()}>
                  <Text style={styles.modalButtonText}>Ver perfil</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                    setReportModalVisible(true);
                  }}
                >
                  <Text style={styles.modalButtonText}>Denunciar</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Cancelamento de chat */}
      <Modal
        transparent={true}
        visible={EndChatConfirmation}
        onRequestClose={() => setEndChatConfirmation(false)}
      >
        <TouchableWithoutFeedback onPress={() => setEndChatConfirmation(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={[styles.modalContent]}>
                <Text style={styles.textReport}>
                  Deseja realmente encerrar?
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'center',
                  }}
                >
                  <Button
                    size="lg"
                    action="primary"
                    variant="solid"
                    style={{
                      marginBottom: 10,
                      width: '50%',
                      marginTop: 10,
                      marginRight: 10,
                    }}
                    onPress={() => {
                      setEndChatConfirmation(false);
                      setEndChatQuestion(true);
                    }}
                  >
                    <ButtonText>Sim</ButtonText>
                  </Button>
                  <Button
                    size="lg"
                    action="primary"
                    variant="outline"
                    style={{ marginBottom: 10, width: '50%', marginTop: 10 }}
                    onPress={() => {
                      setEndChatConfirmation(false);
                    }}
                  >
                    <ButtonText>Não</ButtonText>
                  </Button>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Duvida respondida chat */}
      <Modal
        transparent={true}
        visible={endChatQuestion}
        onRequestClose={() => setEndChatQuestion(false)}
      >
        <TouchableWithoutFeedback onPress={() => setEndChatQuestion(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={[styles.modalContent]}>
                <Text style={styles.textReport}>
                  Sua dúvida foi respondida?
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'center',
                  }}
                >
                  <Button
                    size="lg"
                    action="primary"
                    variant="solid"
                    style={{
                      marginBottom: 10,
                      width: '50%',
                      marginTop: 10,
                      marginRight: 10,
                    }}
                    onPress={() => {
                      setEndChatQuestion(false);
                      setRateChatResponse(true);
                      setValue('hasAnswered', true);
                    }}
                  >
                    <ButtonText>Sim</ButtonText>
                  </Button>
                  <Button
                    size="lg"
                    action="primary"
                    variant="outline"
                    style={{ marginBottom: 10, width: '50%', marginTop: 10 }}
                    onPress={() => {
                      setEndChatQuestion(false);
                      setRateChatNotResponse(true);
                      setValue('hasAnswered', false);
                    }}
                  >
                    <ButtonText>Não</ButtonText>
                  </Button>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Avaliação respondida */}
      <Modal
        transparent={true}
        visible={rateChatResponse}
        onRequestClose={() => setRateChatResponse(false)}
      >
        <TouchableWithoutFeedback onPress={() => setRateChatResponse(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View
                style={[
                  styles.modalContent,
                  { height: '32%', justifyContent: 'center' },
                ]}
              >
                <Text style={styles.textReport}>Deixe aqui sua avaliação!</Text>
                <Text style={styles.modalText}>
                  Avalie de acordo com a qualidade da resposta
                </Text>
                <StarRating
                  onRatingChange={(rating) => setValue('avaliation', rating)}
                />
                <Button
                  size="lg"
                  action="primary"
                  variant="solid"
                  style={{ marginTop: 5, marginBottom: 5, width: '90%' }}
                  onPress={handleSubmit(handleRequestCloseChat)}
                >
                  <ButtonText>Enviar</ButtonText>
                </Button>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Avaliação não respondida */}
      <Modal
        transparent={true}
        visible={rateChatNotResponse}
        onRequestClose={() => setRateChatNotResponse(false)}
      >
        <TouchableWithoutFeedback onPress={() => setRateChatNotResponse(false)}>
          <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
              <View
                style={[
                  styles.modalContent,
                  { height: '32%', justifyContent: 'center' },
                ]}
              >
                <Text style={styles.textReport}>Deixe aqui sua avaliação!</Text>
                <Text style={styles.modalText}>
                  Avalie de acordo com a qualidade da resposta
                </Text>
                <StarRating
                  onRatingChange={(rating) => setValue('avaliation', rating)}
                />
                <Button
                  size="lg"
                  action="primary"
                  variant="solid"
                  style={{ marginTop: 5, marginBottom: 5, width: '90%' }}
                  onPress={handleSubmit(handleRequestCloseChat)}
                >
                  <ButtonText>Enviar</ButtonText>
                </Button>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Chat encerrado com resposta */}
      <Modal
        transparent={true}
        visible={ChatEndResponse}
        onRequestClose={() => setChatEndResponse(false)}
      >
        <TouchableWithoutFeedback onPress={() => setChatEndResponse(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View
                style={[
                  styles.modalContent,
                  { height: '30%', justifyContent: 'center' },
                ]}
              >
                <Text style={styles.textReport}>Chat encerrado</Text>
                <Text style={styles.modalText}>
                  Avaliação concluída, agradecemos o feedback!
                </Text>
                <Button
                  size="lg"
                  action="primary"
                  variant="solid"
                  style={{ marginTop: 30, width: '100%' }}
                  onPress={() => {
                    setChatEndResponse(false);
                  }}
                >
                  <ButtonText>Concluir</ButtonText>
                </Button>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Chat encerrado sem resposta */}
      <Modal
        transparent={true}
        visible={ChatEndNotResponse}
        onRequestClose={() => setChatEndNotResponse(false)}
      >
        <TouchableWithoutFeedback onPress={() => setChatEndNotResponse(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View
                style={[
                  styles.modalContent,
                  { height: '30%', justifyContent: 'center' },
                ]}
              >
                <Text style={styles.textReport}>Chat encerrado</Text>
                <Text style={styles.modalText}>
                  Sua pergunta voltará a ser exibida para todos!
                </Text>
                <Button
                  size="lg"
                  action="primary"
                  variant="solid"
                  style={{ marginTop: 30, width: '100%' }}
                  onPress={() => {
                    setChatEndNotResponse(false);
                  }}
                >
                  <ButtonText>Concluir</ButtonText>
                </Button>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Modal de report - Denuncia 1 e 2 */}
      <Modal
        transparent={true}
        visible={reportModalVisible}
        onRequestClose={() => setReportModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setReportModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={[styles.modalContent, { height: '40%' }]}>
                <Text style={{ ...styles.textReport, marginBottom: 40 }}>
                  Por qual motivo deseja denunciar?
                </Text>
                <Select
                  label=""
                  placeholder="Selecione o motivo"
                  value={denuncia}
                  modalVisible={modalDenunciaVisible}
                  setModalVisible={setModalDenunciaVisible}
                >
                  {/* Lista de opções */}
                  <TouchableOpacity
                    onPress={() => {
                      setDenuncia('Abuso');
                      setModalDenunciaVisible(false);
                    }}
                  >
                    <Text style={styles.optionText}>Abuso</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setDenuncia('Comunicação Imprópria');
                      setModalDenunciaVisible(false);
                    }}
                  >
                    <Text style={styles.optionText}>Comunicação imprópria</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setDenuncia('Preconceito');
                      setModalDenunciaVisible(false);
                    }}
                  >
                    <Text style={styles.optionText}>Preconceito</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setDenuncia('Uso indevido da plataforma');
                      setModalDenunciaVisible(false);
                    }}
                  >
                    <Text style={styles.optionText}>
                      Uso indevido da plataforma
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setDenuncia('Outros...');
                      setModalDenunciaVisible(false);
                    }}
                  >
                    <Text style={styles.optionText}>Outros...</Text>
                  </TouchableOpacity>
                </Select>
                <Button
                  size="lg"
                  action="primary"
                  variant="solid"
                  style={{ marginBottom: 10, width: '100%', marginTop: 40 }}
                  onPress={() => {
                    setReportModalVisible(false);
                    setReportQuestionVisible(true);
                  }}
                >
                  <ButtonText>Continuar</ButtonText>
                </Button>

                <Button
                  size="lg"
                  action="primary"
                  variant="outline"
                  style={{ marginBottom: 10, width: '100%' }}
                  onPress={() => {
                    setReportModalVisible(false);
                  }}
                >
                  <ButtonText>Cancelar</ButtonText>
                </Button>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Modal de report - Denuncia 3 */}
      <Modal
        transparent={true}
        visible={reportQuestionVisible}
        onRequestClose={() => setReportQuestionVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={{ flex: 1, width: '100%' }}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback onPress={() => {}}>
                <View
                  style={[
                    styles.modalContent,
                    { height: 350, justifyContent: 'center' },
                  ]}
                >
                  <Text style={styles.textReport}>
                    Discorra sobre o acontecimento
                  </Text>
                  <Text
                    style={{
                      textAlign: 'left',
                      fontSize: 12,
                      marginTop: 10,
                      fontFamily: 'Raleway_400Regular',
                      marginLeft: -10,
                    }}
                  >
                    Descreva o motivo da denúncia
                  </Text>
                  <Input
                    variant="outline"
                    style={{
                      borderColor: 'black',
                      marginBottom: 20,
                      height: '15%',
                      width: '100%',
                      paddingLeft: 15,
                    }}
                  >
                    <InputField
                      placeholder="Digite o motivo aqui"
                      multiline={true} // Permite múltiplas linhas
                      numberOfLines={4} // Número de linhas
                    />
                  </Input>
                  <Button
                    size="lg"
                    action="primary"
                    variant="solid"
                    style={{ marginBottom: 10, width: '100%', marginTop: 20 }}
                    onPress={() => {
                      setReportQuestionVisible(false);
                      setReportEndVisible(true);
                    }}
                  >
                    <ButtonText>Continuar</ButtonText>
                  </Button>

                  <Button
                    size="lg"
                    action="primary"
                    variant="outline"
                    style={{ marginBottom: 10, width: '100%' }}
                    onPress={() => {
                      setReportQuestionVisible(false);
                      setReportModalVisible(true);
                    }}
                  >
                    <ButtonText>Voltar</ButtonText>
                  </Button>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Modal de report - Denuncia 4 */}
      <Modal
        transparent={true}
        visible={reportEndVisible}
        onRequestClose={() => setReportEndVisible(false)}
      >
        <TouchableWithoutFeedback
          onPress={() => setReportQuestionVisible(false)}
        >
          <View style={[styles.modalOverlay, { justifyContent: 'center' }]}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={[styles.modalContent, { height: '30%' }]}>
                <Text style={styles.textReport}>Agradecemos seu feedback!</Text>
                <Text style={styles.modalText}>
                  Iremos analisar sua denúncia
                </Text>
                <Button
                  size="lg"
                  action="primary"
                  variant="solid"
                  style={{ marginTop: 30, width: '100%' }}
                  onPress={() => {
                    setReportEndVisible(false);
                  }}
                >
                  <ButtonText>Concluir</ButtonText>
                </Button>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {/* Modal de perfil */}
      <Modal
        transparent={true}
        visible={showProfile}
        onRequestClose={() => setShowProfile(false)}
      >
        <View style={styles.fullScreenModal}>
          <PlayerProfile user={user} />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '65%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButtonText: {
    color: '#1A1A2D',
    fontFamily: 'Raleway_400Regular',
    fontSize: 15,
    marginVertical: 2,
  },
  textReport: {
    color: '#1A1A2D',
    fontFamily: 'Raleway_700Bold',
    fontSize: 20,
    marginVertical: 2,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    fontFamily: 'Raleway_400Regular',
    marginTop: 10,
    marginBottom: 5,
    textAlign: 'center',
  },
  optionText: {
    padding: 15,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  fullScreenModal: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

export default ChatOptions;
