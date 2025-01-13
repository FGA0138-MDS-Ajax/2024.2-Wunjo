import ChatBox from '@/components/ui/chat/chatBox';
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

// Dados de exemplo
const chatData = [
  {
    id: '1',
    username: 'arthurtopzera',
    message: 'Seguinte, voce faz aeweufbouwbc',
    userImage: 'https://picsum.photos/66',
  },
  {
    id: '2',
    username: 'johndoe',
    message: 'Hello, how are you?',
    userImage: 'https://picsum.photos/67',
  },
  {
    id: '3',
    username: 'yanxbao',
    message: 'fala meu peixe',
    userImage: 'https://picsum.photos/68',
  },
  {
    id: '4',
    username: 'desalmado',
    message: 'então parceiro, voce faz aewufbouwbc',
    userImage: 'https://picsum.photos/69',
  },
  {
    id: '5',
    username: 'john textor',
    message: 'eu ein',
    userImage: 'https://picsum.photos/65',
  },
  {
    id: '6',
    username: 'jao das neves',
    message: 'nunca na minha vida eu vi alguem tao',
    userImage: 'https://picsum.photos/676',
  },
  {
    id: '7',
    username: 'nepo baby',
    message: 'chuchuuuu',
    userImage: 'https://picsum.photos/96',
  },
];

//lnha entre as conversas
const ItemSeparator = () => {
  return <View style={styles.separator} />;
};

export default function ChatList() {
  const handleChatPress = (username) => {
    // logica para abrir o chat
    console.log(`Abrir chat com ${username}`);
  };

  return (
    //o layout n ta deixando scrollar
    <View style={styles.container}>
      <Text style={styles.title}>Conversas</Text>
      <FlatList
        data={chatData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatBox
            username={item.username}
            message={item.message}
            userImage={item.userImage}
            onPress={() => handleChatPress(item.username)}
          />
        )}
        ItemSeparatorComponent={ItemSeparator}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: "Itim_400Regular",
    color: "#1E293B",
    paddingBottom: 18,
  },
  listContent: {
    paddingBottom: 20,
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 5,
  },
});