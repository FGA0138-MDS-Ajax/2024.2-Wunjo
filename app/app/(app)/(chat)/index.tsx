import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import ChatBox from '@/components/ui/chat/chatBox';

const chatData = [
  {
    id: '1',
    chatId: 'chat1',
    users: [
      { id: '123', name: 'Você', image: 'https://picsum.photos/96' },
      { id: '456', name: 'Arthur', image: 'https://picsum.photos/96' },
    ],
    lastMessage: 'Olá, como posso te ajudar hoje?',
  },
  {
    id: '2',
    chatId: 'chat2',
    users: [
      { id: '123', name: 'Você', image: 'https://picsum.photos/95' },
      { id: '789', name: 'João', image: 'https://picsum.photos/95' },
    ],
    lastMessage: 'Oi! Estou com dificuldade em entender o conceito de closures em JavaScript.',
  },
  {
    id: '3',
    chatId: 'chat3',
    users: [
      { id: '123', name: 'Você', image: 'https://picsum.photos/98' },
      { id: '122', name: 'Pedro', image: 'https://picsum.photos/92' },
    ],
    lastMessage: 'Oi! Estou com dificuldade em entender o conceito de closures em JavaScript.',
  },
  {
    id: '4',
    chatId: 'chat4',
    users: [
      { id: '123', name: 'Você', image: 'https://picsum.photos/99' },
      { id: '198', name: 'Marcelo', image: 'https://picsum.photos/98' },
    ],
    lastMessage: 'Oi! Estou com dificuldade em entender o conceito de closures em JavaScript.',
  },

];

const ChatList = () => {
  const router = useRouter();
  const currentUserId = '123'; // ID do usuário atual

  const handleChatPress = (chat) => {
    const otherUser = chat.users.find(user => user.id !== currentUserId);
    router.push({
      pathname: '/view',
      params: {
        chatId: chat.chatId,
        username: otherUser.name,
        userImage: otherUser.image,
        otherUserId: otherUser.id,
      },
    });
  };

  const renderChatItem = ({ item }) => {
    const otherUser = item.users.find(user => user.id !== currentUserId);
    return (
      <TouchableOpacity onPress={() => handleChatPress(item)}>
        <ChatBox username={otherUser.name} message={item.lastMessage} userImage={otherUser.image} onPress={() => handleChatPress(item)} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conversas</Text>
      <FlatList
        data={chatData}
        keyExtractor={(item) => item.id}
        renderItem={renderChatItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: "Itim_400Regular",
    color: "#1E293B",
    paddingBottom: 18,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
  },
  listContent: {
    paddingBottom: 16,
  },
});

export default ChatList;