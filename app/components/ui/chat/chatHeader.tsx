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
import ChatOptions from '@/components/ui/chat/chatOption'; 
import SVGBackButton from '@/assets/images/back-button';

import { Box } from '../box';

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
    <View className="z-10">
      <View style={styles.header}>
        <Box className="flex flex-row justify-between w-full items-center">
          <Box className="flex flex-row w-full items-center gap-2">
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                backgroundColor: '#DDE4EE',
                zIndex: 10,
                borderRadius: 12,
                width: 36,
                aspectRatio: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <SVGBackButton />
            </TouchableOpacity>
            <Box className="items-center flex flex-row">
              <Image source={{ uri: userImage }} style={styles.userImage} />
              <Text style={styles.title}>{username}</Text>
            </Box>
          </Box>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.options}>...</Text>
          </TouchableOpacity>
        </Box>
      </View>
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
    height: 120,
    backgroundColor: '#173CAC',
    paddingLeft: 20,
    paddingRight: 40,
    paddingTop: 30, // Adiciona paddingTop para evitar que o conteúdo fique atrás do cabeçalho
  },
  userImage: {
    width: 66,
    height: 66,
    borderRadius: 33,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#1A1A2D', // Adiciona borda branca à imagem
  },
  title: {
    marginLeft: 10,
    fontSize: 24, 
    fontWeight: 'bold',
    fontFamily: 'Itim_400Regular',
    color: '#F5F6FA',
    flexWrap: 'wrap', 
    maxWidth: 198, 
    overflow: 'hidden', 
    textOverflow: 'ellipsis', 
  },
  options: {
    marginRight: 10,
    fontSize: 40,
    fontFamily: 'Itim_400Regular',
    color: '#FFF',
    transform: [{ rotate: '90deg' }], // Rotaciona o texto
  },
});

export default ChatHeader;
