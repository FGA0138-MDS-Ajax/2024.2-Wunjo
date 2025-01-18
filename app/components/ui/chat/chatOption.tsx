// ChatOptions.tsx
import React from 'react';
import { Modal, TouchableWithoutFeedback, View, Text, TouchableOpacity} from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';
import { Input, InputField } from "@/components/ui/input";
import { StyleSheet } from 'react-native';

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
}

const ChatOptions: React.FC<ChatOptionsProps> = ({
  modalVisible, setModalVisible,
  EndChatConfirmation, setEndChatConfirmation,
  endChatQuestion, setEndChatQuestion,
  rateChatResponse, setRateChatResponse,
  rateChatNotResponse, setRateChatNotResponse,
  ChatEndResponse, setChatEndResponse,
  ChatEndNotResponse, setChatEndNotResponse,
  reportModalVisible, setReportModalVisible,
  reportQuestionVisible, setReportQuestionVisible,
  reportEndVisible, setReportEndVisible
}) => {
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
            <TouchableWithoutFeedback onPress={() => { }}>
              <View style={styles.modalContent}>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                    setEndChatConfirmation(true);
                  }}>
                  <Text style={styles.modalButtonText}>Encerrar bate papo</Text>
                </TouchableOpacity>
                <Text style={styles.modalButtonText}>Ver perfil</Text>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                    setReportModalVisible(true);
                  }}>
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
        onRequestClose={() => setEndChatConfirmation(false)}>
        <TouchableWithoutFeedback onPress={() => setEndChatConfirmation(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={() => { }}>
              <View style={[styles.modalContent]}>
                <Text style={styles.textReport}>Deseja realmente encerrar?</Text>
                <View style={{ flexDirection: "row", width: "100%", justifyContent: "center" }}>
                  <Button
                    size="lg"
                    action="primary"
                    variant="solid"
                    style={{ marginBottom: 10, width: "50%", marginTop: 10, marginRight: 10 }}
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
                    style={{ marginBottom: 10, width: "50%", marginTop: 10 }}
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
        onRequestClose={() => setEndChatQuestion(false)}>
        <TouchableWithoutFeedback onPress={() => setEndChatQuestion(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={() => { }}>
              <View style={[styles.modalContent]}>
                <Text style={styles.textReport}>Sua dúvida foi respondida?</Text>
                <View style={{ flexDirection: "row", width: "100%", justifyContent: "center" }}>
                  <Button
                    size="lg"
                    action="primary"
                    variant="solid"
                    style={{ marginBottom: 10, width: "50%", marginTop: 10, marginRight: 10 }}
                    onPress={() => {
                      setEndChatQuestion(false);
                      setRateChatResponse(true);
                    }}
                  >
                    <ButtonText>Sim</ButtonText>
                  </Button>
                  <Button
                    size="lg"
                    action="primary"
                    variant="outline"
                    style={{ marginBottom: 10, width: "50%", marginTop: 10 }}
                    onPress={() => {
                      setEndChatQuestion(false);
                      setRateChatNotResponse(true);
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
            <TouchableWithoutFeedback onPress={() => { }}>
              <View style={[styles.modalContent, { height: "30%", justifyContent: "center" }]}>
                <Text style={styles.textReport}>Deixe aqui sua avaliação!</Text>
                <Text style={styles.modalText}>Avalie de acordo com a qualidade da resposta</Text>
                <Button
                  size="lg"
                  action="primary"
                  variant="solid"
                  style={{ marginTop: 30, width: "100%" }}
                  onPress={() => {
                    setRateChatResponse(false);
                    setChatEndResponse(true);
                  }}
                >
                  <ButtonText>Continuar</ButtonText>
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
            <TouchableWithoutFeedback onPress={() => { }}>
              <View style={[styles.modalContent, { height: "30%", justifyContent: "center" }]}>
                <Text style={styles.textReport}>Deixe aqui sua avaliação!</Text>
                <Text style={styles.modalText}>Avalie de acordo com a qualidade da resposta</Text>
                <Button
                  size="lg"
                  action="primary"
                  variant="solid"
                  style={{ marginTop: 30, width: "100%" }}
                  onPress={() => {
                    setRateChatNotResponse(false);
                    setChatEndNotResponse(true);
                  }}
                >
                  <ButtonText>Continuar</ButtonText>
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
            <TouchableWithoutFeedback onPress={() => { }}>
              <View style={[styles.modalContent, { height: "30%", justifyContent: "center" }]}>
                <Text style={styles.textReport}>Chat encerrado</Text>
                <Text style={styles.modalText}>Avaliação concluída, agradecemos o feedback!</Text>
                <Button
                  size="lg"
                  action="primary"
                  variant="solid"
                  style={{ marginTop: 30, width: "100%" }}
                  onPress={() => { setChatEndResponse(false); }}
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
            <TouchableWithoutFeedback onPress={() => { }}>
              <View style={[styles.modalContent, { height: "30%", justifyContent: "center" }]}>
                <Text style={styles.textReport}>Chat encerrado</Text>
                <Text style={styles.modalText}>Sua pergunta voltará a ser exibida para todos!</Text>
                <Button
                  size="lg"
                  action="primary"
                  variant="solid"
                  style={{ marginTop: 30, width: "100%" }}
                  onPress={() => { setChatEndNotResponse(false); }}
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
            <TouchableWithoutFeedback onPress={() => { }}>
              <View style={[styles.modalContent, { height: "40%" }]}>
                <Text style={styles.textReport}>Por qual motivo deseja denunciar?</Text>
                <Button
                  size="lg"
                  action="primary"
                  variant="solid"
                  style={{ marginBottom: 10, width: "100%" }}
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
                  style={{ marginBottom: 10, width: "100%" }}
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
        <TouchableWithoutFeedback onPress={() => setReportModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={() => { }}>
              <View style={[styles.modalContent, { height: "30%" }]}>
                <Text style={styles.textReport}>Por qual motivo deseja denunciar?</Text>
                <Input variant="outline" size="lg">
                  <InputField placeholder="Discorra sobre o ocorrido" />
                </Input>
                <Button
                  size="lg"
                  action="primary"
                  variant="solid"
                  style={{ marginBottom: 10, width: "100%" }}
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
                  style={{ marginBottom: 10, width: "100%" }}
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
        </TouchableWithoutFeedback>
      </Modal>

      {/* Modal de report - Denuncia 4 */}
      <Modal
        transparent={true}
        visible={reportEndVisible}
        onRequestClose={() => setReportEndVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setReportQuestionVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={() => { }}>
              <View style={[styles.modalContent, { height: "30%" }]}>
                <Text style={styles.textReport}>Agradecemos seu feedback!</Text>
                <Text style={styles.modalText}>Iremos analisar sua denúncia</Text>
                <Button
                  size="lg"
                  action="primary"
                  variant="solid"
                  style={{ marginTop: 30, width: "100%" }}
                  onPress={() => { setReportEndVisible(false); }}
                >
                  <ButtonText>Concluir</ButtonText>
                </Button>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "60%",
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButtonText: {
    color: "#1A1A2D",
    fontSize: 15,
    marginVertical: 2,
  },
  textReport: {
    color: "#1A1A2D",
    fontFamily: "Raleway_700Bold",
    fontSize: 20,
    marginVertical: 2,
    textAlign: "center",
  },
  modalText: {
    fontSize: 16,
    fontFamily: "Raleway_400Regular",
    marginTop: 10,
    textAlign: "center",
  },
});

export default ChatOptions;