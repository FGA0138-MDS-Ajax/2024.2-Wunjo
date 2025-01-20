import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import UnbLogo_Home from '@/assets/images/UnbLogo_Home';
import { Input } from '@/components/ui/input';
import Filter from '@/assets/images/Filter';
import SearchIcon from '@/assets/images/SearchIcon';
import Balloon from '@/assets/images/Balloon';
import HelmIcon from '@/assets/images/HelmIcon';
import WoodButton from '@/assets/images/WoodButton';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { QuestionService } from '@/http/services/question';
import { QuestionDificultyLabels } from '@/interfaces/application';
import { IQuestionService } from '@/interfaces/http';

const ForumHome = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [expandedText, setExpandedText] = useState<string | null>(null); // Armazena o ID do item expandido

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleOptionClick = (option: string) => {
    console.log(`Opção selecionada: ${option}`);
    setModalVisible(false);
  };

  const handleReadMore = (id: string) => {
    setExpandedText(id);
  };

  const handleShowLess = () => {
    setExpandedText(null);
  };

  const query = useQuery({
    queryKey: ['forum', 'posts'],
    queryFn: QuestionService.fetch,
  });

  const renderCard = ({
    item,
  }: {
    item: IQuestionService.Fetch.Response['questions'][0];
  }) => {
    const isExpanded = expandedText === item.id;

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <FontAwesome name="user-circle" size={40} color="#173CAC" />
          <View
            style={{
              marginLeft: 10,
              //backgroundColor: "red",
              // minWidth: '90%',
              // maxWidth: '100%',
            }}
          >
            <Text style={styles.registration}>{item.student.registration}</Text>
            <Text style={styles.subject}>{item.subjectId}</Text>
          </View>

          <View
            style={{
              marginLeft: 'auto',
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: 15,
            }}
          >
            {item.urgency === 'HIGH' && (
              <View style={styles.urgentTag}>
                <Text style={styles.urgentText}>Urgente</Text>
              </View>
            )}
            <Balloon />

            <TouchableOpacity onPress={toggleModal}>
              <MaterialIcons
                name="more-vert"
                size={24}
                color="#000"
                style={styles.icon}
              />
            </TouchableOpacity>
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
            <TouchableOpacity onPress={() => handleReadMore(item.id)}>
              <Text style={styles.readMore}>Ler mais...</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleShowLess}>
              <Text style={styles.readMore}>Mostrar menos</Text>
            </TouchableOpacity>
          ))}
        <Text style={styles.difficulty}>
          Dificuldade: {QuestionDificultyLabels[item.difficulty]}
        </Text>
      </View>
    );
  };

  const router = useRouter();

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
        data={query.data?.data.questions || []}
        keyExtractor={(item) => item.id}
        renderItem={renderCard}
        contentContainerStyle={{
          paddingHorizontal: 20,
          // flex: 1,
          // backgroundColor: '#F00',
        }}
      />

      <TouchableOpacity
        onPress={() => router.push('/(app)/(home)/(post)')}
        style={{
          position: 'absolute',
          bottom: '2.5%',
          right: '2.5%',
          elevation: 16,
          shadowOffset: { width: -3, height: 3 },
          shadowOpacity: 0.1,
          shadowRadius: 1,
          borderRadius: '100%',
          width: 70,
          height: 70,
        }}
      >
        <WoodButton
          style={{
            shadowColor: '#000000',
            shadowOffset: { width: -10, height: 10 },
            shadowOpacity: 0.75,
            shadowRadius: 3,
            borderRadius: '100%',
          }}
        />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={toggleModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text
              style={styles.modalOption}
              onPress={() => handleOptionClick('Opção 1')}
            >
              Responder
            </Text>
            <Text
              style={styles.modalOption}
              onPress={() => handleOptionClick('Opção 2')}
            >
              Denunciar
            </Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
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
    marginBottom: 15,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
    //backgroundColor: "red"
  },
  registration: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Itim_400Regular',
  },
  subject: { fontSize: 14, color: '#666', fontFamily: 'Itim_400Regular' },
  urgentTag: {
    backgroundColor: '#FF0000',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 16,
  },
  urgentText: { color: '#fff', fontSize: 13, fontFamily: 'Itim_400Regular' },
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
    marginTop: 5,
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
