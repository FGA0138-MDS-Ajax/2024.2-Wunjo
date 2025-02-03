import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import ChatHeader from '@/components/ui/chat/chatHeader';
import MessageInput from '@/components/ui/chat/messageInput';
import MessageBalloon from '@/components/ui/chat/message';


type Messages = {
  [key: string]: { id: string; text: string; senderId: string; receiverId: string; timestamp: string }[];
};

const mockMessages: Messages = {
  chat1: [
    { id: '1', text: 'Olá, como você está?', senderId: '123', receiverId: '456', timestamp: '2023-10-01T12:00:00Z' },
    { id: '2', text: 'Estou bem, obrigado! E você?', senderId: '456', receiverId: '123', timestamp: '2023-10-01T12:01:00Z' },
    { id: '3', text: 'Também estou bem!', senderId: '123', receiverId: '456', timestamp: '2023-10-01T12:02:00Z' },
    { id: '4', text: 'Que bom!', senderId: '456', receiverId: '123', timestamp: '2023-10-01T12:03:00Z' },
    { id: '5', text: 'Você pode me ajudar com um problema?', senderId: '123', receiverId: '456', timestamp: '2023-10-01T12:04:00Z' },
    { id: '6', text: 'Claro, qual é o problema?', senderId: '456', receiverId: '123', timestamp: '2023-10-01T12:05:00Z' },
    { id: '7', text: 'Estou com dificuldade em entender o conceito de closures em JavaScript.', senderId: '123', receiverId: '456', timestamp: '2023-10-01T12:06:00Z' },
    { id: '8', text: 'Muito obrigado pela explicação!', senderId: '123', receiverId: '456', timestamp: '2023-10-01T12:07:00Z' },
    { id: '9', text: 'De nada! Se precisar de mais alguma coisa, estarei aqui.', senderId: '456', receiverId: '123', timestamp: '2023-10-01T12:08:00Z' },
  ],
  chat2: [
    { id: '1', text: 'Olá, você está disponível para uma reunião?', senderId: '456', receiverId: '123', timestamp: '2023-10-01T12:00:00Z' },
    { id: '2', text: 'Sim, estou disponível. Quando seria?', senderId: '123', receiverId: '456', timestamp: '2023-10-01T12:01:00Z' },
  ],
};

export default function ChatView() {
  const {
    auth: { student },
  } = useUnBordo();

    const [messages, setMessages] = useState<Messages[keyof Messages]>([]);
    const [inputMessage, setInputMessage] = useState('');

    useEffect(() => {
        // Carregar mensagens específicas do chat
        if (chatId && mockMessages[chatId]) {
            setMessages(mockMessages[chatId]);
        }
    }, [chatId]);

  const handleSendMessage = (message: string, imageUri: string | null) => {
    if (message.trim() || imageUri) {
      const newMessage = {
        id: Date.now().toString(),
        chatId,
        message,
        senderId: student.id,
      } as IChatMessage;

      if (!channel.current) return;

      // channel.current.send({
      //   type: 'broadcast',
      //   event: 'message',
      //   payload: newMessage,
      // });

      channel.current.send({
        type: 'postgres_changes',
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        payload: newMessage,
      });
      // setMessages([...messages, newMessage]);
      setInputMessage('');
    }
  };

  const renderMessageItem = ({ item }: { item: IChatMessage }) => (
    <MessageBalloon
      text={item.message}
      sender={item.senderId === student.id ? 'me' : 'them'}
      // image={item.image}
    />
  );

  useEffect(() => {
    const supabaseUrl = 'https://ylixvluhizkjgiicfghz.supabase.co';
    const supabaseKey =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsaXh2bHVoaXpramdpaWNmZ2h6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ0NzY4NDcsImV4cCI6MjA1MDA1Mjg0N30.rGTSslIh2XwYh-LRqq6gTnAEcGVygSliNW_NOTM0_40';

    if (!channel.current) {
      const client = createClient(supabaseUrl, supabaseKey);

      channel.current = client.channel(`chat:${chatId}`, {
        config: {
          broadcast: {
            self: true,
          },
        },
      });

      // channel.current
      //   .on('broadcast', { event: 'message' }, (event: {
      //     event: string;
      //     type: string;
      //     payload: IChatMessage;
      //   }) => {
      //     console.log('New message:', JSON.stringify(event.payload, null, 2));

      //     setMessages((prev) => [...prev, event.payload]);
      //   })
      //   .subscribe();

      channel.current
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'messages' },
          (payload) => {
            console.log('New message', JSON.stringify(payload, null, 2));
          },
          // (event: { event: string; type: string; payload: IChatMessage }) => {
          //   console.log('New message:', JSON.stringify(event.payload, null, 2));

          //   setMessages((prev) => [...prev, event.payload]);
          // },
        )
        .subscribe();

      // channel.current.subscribe((msg) => {
      //   console.log('New message:', msg)
      //   // setMessages((prev) => [...prev, msg])
      // })
    }

    return () => {
      channel.current?.unsubscribe();
      channel.current = null;
    };
  }, []);

    const renderMessageItem = ({ item }) => (
        <MessageBalloon text={item.text} sender={item.senderId === currentUserId ? 'me' : 'them'} image={item.image} />
    );

  const chat = query.data?.data;

  const me = query.data?.data.studentId === student.id ? 'student' : 'tutor';
  const them = chat[me === 'student' ? 'tutor' : 'student'];

  return (
    <View style={styles.container}>
      {/* username e userImage são dados simulados da pasta anterior*/}
      <ChatHeader
        username={them?.name || ''}
        userImage={chat?.student.avatarUrl || ''}
      />
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessageItem}
        contentContainerStyle={styles.messagesContainer}
      />
      <MessageInput
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        handleSendMessage={handleSendMessage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },
  messagesContainer: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 80, // Adiciona paddingBottom para evitar que o conteúdo fique atrás do campo de entrada
  },
});
