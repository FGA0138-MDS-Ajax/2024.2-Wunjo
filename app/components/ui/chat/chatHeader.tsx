import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import ChatOptions from '@/components/ui/chat/chatOption'; // Certifique-se de que o caminho está correto
import { BackButton } from '@/components/ui/backheader'; // Certifique-se de que o caminho está correto

interface ChatHeaderProps {
  username: string;
  userImage: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ username, userImage }) => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [EndChatConfirmation, setEndChatConfirmation] = useState(false);
  const [endChatQuestion, setEndChatQuestion] = useState(false);
  const [rateChatResponse, setRateChatResponse] = useState(false);
  const [rateChatNotResponse, setRateChatNotResponse] = useState(false);
  const [ChatEndResponse, setChatEndResponse] = useState(false);
  const [ChatEndNotResponse, setChatEndNotResponse] = useState(false);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [reportQuestionVisible, setReportQuestionVisible] = useState(false);
  const [reportEndVisible, setReportEndVisible] = useState(false);

    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
                <BackButton onPress={() => router.back()} label="" />
            </TouchableOpacity>
            <Image source={{ uri: userImage }} style={styles.userImage} />
            <Text style={styles.title}>{username}</Text>
          </Box>
        </Box>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.options}>...</Text>
        </TouchableOpacity>
      </Box>
      <ChatOptions
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        EndChatConfirmation={EndChatConfirmation}
        setEndChatConfirmation={setEndChatConfirmation}
        endChatQuestion={endChatQuestion}
        setEndChatQuestion={setEndChatQuestion}
        rateChatResponse={rateChatResponse}
        setRateChatResponse={setRateChatResponse}
        rateChatNotResponse={rateChatNotResponse}
        setRateChatNotResponse={setRateChatNotResponse}
        ChatEndResponse={ChatEndResponse}
        setChatEndResponse={setChatEndResponse}
        ChatEndNotResponse={ChatEndNotResponse}
        setChatEndNotResponse={setChatEndNotResponse}
        reportModalVisible={reportModalVisible}
        setReportModalVisible={setReportModalVisible}
        reportQuestionVisible={reportQuestionVisible}
        setReportQuestionVisible={setReportQuestionVisible}
        reportEndVisible={reportEndVisible}
        setReportEndVisible={setReportEndVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 100,
    backgroundColor: '#173CAC',
    paddingHorizontal: 20,
    paddingTop: 20, // Adiciona paddingTop para evitar que o conteúdo fique atrás do cabeçalho
  },
  userImage: {
    width: 48,
    height: 48,
    borderRadius: 33,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#1A1A2D', // Adiciona borda branca à imagem
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Itim_400Regular',
    color: '#F5F6FA', // Cor da fonte do título
  },
  options: {
    fontSize: 40,
    fontFamily: 'Itim_400Regular',
    color: '#FFF',
    transform: [{ rotate: '90deg' }], // Rotaciona o texto
  },
});

export default ChatHeader;
