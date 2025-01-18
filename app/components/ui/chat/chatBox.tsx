import React, { useState } from 'react';
import ChatOptions from '@/components/ui/chat/chatOption';
import { Button, ButtonText } from '@/components/ui/button';
import { Input, InputField } from "@/components/ui/input";
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TouchableWithoutFeedback } from "react-native";

interface ChatBoxProps {
  username: string;
  message: string;
  userImage: string;
  onPress: () => void; // Função para abrir o chat
}

export default function ChatBox({ username, message, userImage, onPress }: ChatBoxProps) {
  
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
      <Image source={{ uri: userImage }} style={styles.circle} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{username}</Text>
        <Text style={styles.message} numberOfLines={1}>{message}</Text>
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
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chatItems: {
    width: "100%",
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  circle: {
    width: 66,
    height: 66,
    borderRadius: 33,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 24,
    fontFamily: "Itim_400Regular",
    color: "#1a1a2d",
  },
  message: {
    fontSize: 16,
    fontFamily: "Raleway_400Regular",
    color: "#1a1a2d",
  },
  options: {
    fontSize: 24,
    fontFamily: "Itim_400Regular",
    color: "#1a1a2d",
    marginLeft: 10,
  },
});