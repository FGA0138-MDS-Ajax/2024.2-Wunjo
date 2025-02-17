import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Pressable,
  Dimensions,
  SafeAreaView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
} from '@/components/ui/modal';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import UnbLogo_Home from '@/assets/images/UnbLogo_Home';
import { Input } from '@/components/ui/input';
import Filter from '@/assets/images/Filter';
import SearchIcon from '@/assets/images/SearchIcon';
import Balloon from '@/assets/images/Balloon';
import HelmIcon from '@/assets/images/HelmIcon';
import WoodButton from '@/assets/images/WoodButton';
import { useNavigation, useRouter } from 'expo-router';
import { useMutation, useQuery } from '@tanstack/react-query';
import { QuestionService } from '@/services/http/services/question';
import {
  QuestionDificultyLabels,
  QuestionStatuses,
  QuestionUrgencies,
} from '@/interfaces/application';
import { IQuestionService } from '@/interfaces/http';
import { Skeleton } from '@/components/ui/skeleton';
import { Box } from '@/components/ui/box';
import { useUnBordo } from '@/hooks/unbordo';
import { Text } from '@/components/ui/text';
import { useDisclose } from '@/hooks/use-disclose';
import { queryClient } from '@/hooks/react-query';
import ChatOptions from '@/components/ui/chat/chatOption';

const ForumHome = () => {
  const navigation = useNavigation();
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

  const query = useQuery({
    queryKey: ['forum', 'posts'],
    queryFn: QuestionService.fetch,
  });

  const router = useRouter();

  useEffect(() => {
    query.refetch();
  }, [navigation.isFocused()]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <UnbLogo_Home style={styles.title} />
        <HelmIcon
          style={{
            position: 'absolute',
            right: 0,
          }}
        />
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

      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: '5%',
        }}
      >
        <Input style={styles.searchBar}>
          <SearchIcon />
          <TextInput placeholder="Pesquisar" style={styles.searchInput} />
        </Input>
        <Pressable onPress={() => router.push('/(app)/(home)/(filter)')}>
          <Filter />
        </Pressable>
      </View>

      <FlatList<IQuestionService.Fetch.Response['questions'][0]>
        data={
          query.data?.data?.questions.filter(
            (q) => q.status === QuestionStatuses.OPEN,
          ) || []
        }
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CardItem item={item} setReportModalVisible={setReportModalVisible} />
        )}
        ListEmptyComponent={() =>
          query.isFetching ? (
            <Box className="min-w-full flex flex-col gap-2 ">
              <Skeleton
                variant="rounded"
                className="h-40 w-full bg-gray-300"
                speed={3}
              />
              <Skeleton
                variant="rounded"
                className="h-40 w-full bg-gray-300"
                speed={3}
              />
              <Skeleton
                variant="rounded"
                className="h-40 w-full bg-gray-300"
                speed={3}
              />
              <Skeleton
                variant="rounded"
                className="h-40 w-full bg-gray-300"
                speed={3}
              />
              <Skeleton
                variant="rounded"
                className="h-40 w-full bg-gray-300"
                speed={3}
              />
              <Skeleton
                variant="rounded"
                className="h-40 w-full bg-gray-300"
                speed={3}
              />
            </Box>
          ) : (
            <Text className="font-raleway">
              Nenhum pirata abordo tem dúvidas, que ótimo, podemos seguir nossa
              viagem!
            </Text>
          )
        }
        contentContainerStyle={{
          paddingHorizontal: 20,
        }}
      />

      <TouchableOpacity
        onPress={() => router.push('/(app)/(home)/(post)')}
        style={{
          position: 'absolute',
          bottom: Platform.OS === 'ios' ? '12%' : '2.5%',
          right: Platform.OS === 'ios' ? '5%' : '2.5%',
          elevation: 16,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.01,
          shadowRadius: 1,
          borderRadius: '100%',
          width: 70,
          height: 70,
        }}
      >
        <WoodButton
          style={{
            shadowColor: '#000000',
            shadowOffset: { width: -2, height: 5 },
            shadowOpacity: 0.3,
            shadowRadius: 3,
            borderRadius: '100%',
          }}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const CardItem = ({
  item,
  setReportModalVisible,
}: {
  item: IQuestionService.Fetch.Response['questions'][0];
  setReportModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [error, setError] = useState<string | null>(null);

  const { auth } = useUnBordo();

  const router = useRouter();

  const {
    isOpen: modalOpen,
    onClose: onModalClose,
    onOpen: onOpenModal,
  } = useDisclose();
  const { isOpen: isExpanded, onToggle: handleExpand } = useDisclose();

  const replyChatMutation = useMutation({
    mutationFn: QuestionService.reply,
  });

  const handleReply = () => {
    replyChatMutation.mutate(
      { questionId: item.id },
      {
        onSuccess: () => {
          onModalClose();
          queryClient.invalidateQueries({
            queryKey: ['forum', 'posts'],
          });
          router.push('/(app)/(chat)');
        },
        onError: (err: any) => {
          console.log(JSON.stringify(err.response, null, 2));
          setError(err.response.data.message);
        },
      },
    );
  };

  return (
    <>
      <View style={styles.card}>
        {item.urgency === QuestionUrgencies.HIGH && (
          <View className="absolute -top-4 right-2 bg-red-200 rounded-full p-2">
            <Text className='text-sm font-itim text-red-400'>URGENTE</Text>
          </View>
        )}
        <View style={styles.cardHeader}>
          <FontAwesome name="user-circle" size={40} color="#173CAC" />
          <View
            style={{
              marginLeft: 10,
            }}
            className="flex-1"
          >
            <Text style={styles.registration}>{item.student.registration}</Text>
            <Text style={styles.subject} numberOfLines={2}>
              {item.subject.name}
            </Text>
          </View>

          <View
            style={{
              marginLeft: 'auto',
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: 15,
            }}
            className="min-w-[20%] justify-end"
          >
            {auth.student.id !== item.student.id && (
              <>
                <TouchableOpacity onPress={handleReply}>
                  <Balloon />
                </TouchableOpacity>

                <TouchableOpacity onPress={onOpenModal}>
                  <MaterialIcons
                    name="more-vert"
                    size={24}
                    color="#000"
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
        <Text style={styles.text} numberOfLines={isExpanded ? undefined : 3}>
          {item.title}
          {'\n'}
          {item.description}
        </Text>
        {(item.description.length > 100 ||
          item.description.split('\n').length > 3) &&
          (!isExpanded ? (
            <TouchableOpacity onPress={handleExpand}>
              <Text style={styles.readMore}>Ler mais...</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleExpand}>
              <Text style={styles.readMore}>Mostrar menos</Text>
            </TouchableOpacity>
          ))}
        <Box className="flex flex-row items-center justify-between mt-4">
          {auth.student.id === item.student.id && (
            <Text className="font-itim text-gray-500 font-xs">
              Você postou essa dúvida
            </Text>
          )}

          <Text style={styles.difficulty}>
            {item.points} pontos | Dificuldade:{' '}
            {QuestionDificultyLabels[item.difficulty]}
          </Text>
        </Box>
      </View>
      <Modal isOpen={modalOpen} onClose={onModalClose} closeOnOverlayClick>
        <ModalBackdrop />
        <ModalContent className="bg-white py-2">
          <ModalBody>
            <Box>
              {error && <Text className="text-red-400">{error}</Text>}
              <TouchableOpacity
                className="w-full p-4 items-center"
                onPress={() => handleReply()}
              >
                {replyChatMutation.isPending ? (
                  <ActivityIndicator size="small" color="#000" />
                ) : (
                  <Text size="lg" className="font-raleway-bold">
                    Responder
                  </Text>
                )}
              </TouchableOpacity>
              <Box className="w-full h-px bg-gray-300" />
              <TouchableOpacity
                onPress={() => {
                  setReportModalVisible(true);
                  onModalClose();
                }}
                className="w-full p-4 items-center"
              >
                <Text size="lg" className="font-raleway-bold">
                  Denunciar
                </Text>
              </TouchableOpacity>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
    height: Dimensions.get('screen').height,
  },
  header: {
    backgroundColor: '#173CAC',
    padding: 20,
    height: 103,
    width: '100%',
    justifyContent: 'flex-end',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    paddingLeft: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: 15,
    height: 46,
    width: '90%',
    paddingHorizontal: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#969696',
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#969696',
    fontFamily: 'Itim_400Regular',
  },
  card: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 8,
    padding: 15,
    marginBottom: 30,
    elevation: 2,
    maxWidth: '100%',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
    // padding: 4,
    //backgroundColor: "red"
  },
  registration: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Itim_400Regular',
  },
  subject: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Itim_400Regular',
    maxWidth: '65%',
  },
  urgentTag: {
    backgroundColor: '#F5F6FA',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 16,
  },
  urgentText: { color: '#FF0000', fontSize: 20, fontFamily: 'Itim_400Regular' },
  text: {
    fontSize: 14,
    color: '#333',
    marginVertical: 10,
    fontFamily: 'Raleway_400Regular',
  },
  readMore: {
    fontSize: 13,
    color: '#173CAC',
    fontWeight: 'bold',
    fontFamily: 'Itim_400Regular',
    textDecorationLine: 'underline',
  },
  difficulty: {
    fontSize: 12,
    color: '0000',
    fontFamily: 'Itim_400Regular',
    alignSelf: 'flex-end',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#1e4ba8',
    width: 77,
    height: 77,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  icon: {
    marginLeft: 'auto',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 200,
  },
  modalOption: {
    fontSize: 16,
    padding: 10,
    textAlign: 'center',
  },
});

export default ForumHome;
