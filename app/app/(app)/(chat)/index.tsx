import ChatBox from '@/components/ui/chat/chatBox';
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useChat } from './chat';
import { Box } from '@/components/ui/box';
import { Skeleton } from '@/components/ui/skeleton';
import { useUnBordo } from '@/hooks/unbordo';

//lnha entre as conversas
const ItemSeparator = () => {
  return <View style={styles.separator} />;
};

export default function ChatList() {
  const handleChatPress = (chatId: string) => {
    console.log(`Abrir chat ${chatId}`);
  };

  const { query } = useChat();

  const { auth } = useUnBordo();

  return (
    //o <layout> n ta deixando scrollar
    <View style={styles.container}>
      <Text style={styles.title}>Conversas</Text>
      <FlatList
        data={query.data?.data.chats || []}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() =>
          query.isFetching ? (
            <Box className="min-w-full flex flex-col gap-2 ">
              <Skeleton
                variant="rounded"
                className="h-28 w-full bg-gray-300"
                speed={3}
              />
              <Skeleton
                variant="rounded"
                className="h-28 w-full bg-gray-300"
                speed={3}
              />
              <Skeleton
                variant="rounded"
                className="h-28 w-full bg-gray-300"
                speed={3}
              />
              <Skeleton
                variant="rounded"
                className="h-28 w-full bg-gray-300"
                speed={3}
              />
              <Skeleton
                variant="rounded"
                className="h-28 w-full bg-gray-300"
                speed={3}
              />
            </Box>
          ) : (
            <Text className="font-raleway">
              Você ainda não possui nenhuma conversa
            </Text>
          )
        }
        renderItem={({ item }) => {
          const me = item.studentId === auth.student.id ? 'student' : 'tutor';
          const other = me === 'student' ? 'tutor' : 'student';
          console.log(item[other].name);
          return (
            <ChatBox
              username={item[other].name}
              message={'item[other].name'}
              // userImage={item[other].avatarUrl}
              onPress={() => handleChatPress(item.id)}
            />
          );
        }}
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
    fontFamily: 'Itim_400Regular',
    color: '#1E293B',
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
