import { ChatService } from '@/services/http/services/chat';
import { useQuery } from '@tanstack/react-query';
import { useNavigation } from 'expo-router';
import { useEffect } from 'react';

export const useChat = () => {
  const navigation = useNavigation();

  const query = useQuery({
    queryKey: ['chat-rooms'],
    queryFn: ChatService.fetch,
  });

  useEffect(() => {
    query.refetch();
  }, [navigation.isFocused()]);

  return {
    query,
  };
};
