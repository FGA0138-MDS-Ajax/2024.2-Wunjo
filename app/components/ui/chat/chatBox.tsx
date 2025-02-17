import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import ChatOptions from '@/components/ui/chat/chatOption'; 

interface ChatBoxProps {
  username: string;
  message?: string;
  userImage?: string;
  onPress: () => void; // Função para abrir o chat
  chatId: string;
}

export default function ChatBox({
  username,
  message,
  userImage,
  onPress,
  chatId,
}: ChatBoxProps) {
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
    <TouchableOpacity onPress={onPress} style={styles.chatItems}>
      {userImage ? (
        <Image source={{ uri: userImage }} style={styles.circle} />
      ) : (
        <FontAwesome name="user-circle" size={40} color="#173CAC" className='mr-3' />
      )}
      <View style={styles.textContainer}>
        <Text style={styles.name}>{username}</Text>
        <Text style={styles.message} numberOfLines={1}>
          {message}
        </Text>
      </View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.options}>...</Text>
      </TouchableOpacity>

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
        chatId={chatId}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chatItems: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  circle: {
    width: 66,
    height: 66,
    borderRadius: 33,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 24,
    fontFamily: 'Itim_400Regular',
    color: '#1a1a2d',
  },
  message: {
    fontSize: 16,
    fontFamily: 'Raleway_400Regular',
    color: '#1a1a2d',
  },
  options: {
    fontSize: 24,
    fontFamily: 'Itim_400Regular',
    color: '#1a1a2d',
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '60%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButtonText: {
    color: '#1A1A2D',
    fontFamily: 'Raleway_400Regular',
    fontSize: 16,
    marginVertical: 2,
  },
});
