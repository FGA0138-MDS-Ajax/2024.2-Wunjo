import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { BackButton } from '@/components/ui/backheader';
import ChatOptions from '@/components/ui/chat/chatOption';

interface ChatHeaderProps {
    username: string;
    userImage: string;
    userId: string;
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
        height: 130,
        backgroundColor: '#173CAC',
        paddingHorizontal: 20,
        paddingTop: 40, // Adiciona paddingTop para evitar que o conteúdo fique atrás do cabeçalho
    },
    userImage: {
        width: 66,
        height: 66,
        borderRadius: 33,
        marginRight: 8,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        fontFamily: 'Itim_400Regular',
        color: '#F5F6FA', // Cor da fonte do título
    },
    options: {
        fontSize: 40,
        fontFamily: "Itim_400Regular",
        color: "#FFF",
        marginLeft: 10,
        transform: [{ rotate: '90deg' }], // Rotaciona o texto
    },
});

export default ChatHeader;