import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useChat } from './chat';
import { Box } from '@/components/ui/box';
import { Skeleton } from '@/components/ui/skeleton';
import { useUnBordo } from '@/hooks/unbordo';

const ChatList = () => {
  const router = useRouter();
  const currentUserId = '123'; // ID do usuário atual

export default function ChatList() {
  const router = useRouter();

  const handleChatPress = (chatId: string) => {
    router.push({
      pathname: '/(app)/(chat)/view',
      params: {
        chatId: chatId,
      },
    });
  };

  const { query } = useChat();

  const { auth } = useUnBordo();

  return (
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

          return (
            <ChatBox
              username={item[other].name}
              // message={'item[other].name'}
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
    fontFamily: 'Itim_400Regular',
    color: '#1E293B',
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
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 5,
  },
});
