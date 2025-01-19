import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Modal } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import UnbLogo_Home from "@/assets/images/UnbLogo_Home";
import { Input } from "@/components/ui/input";
import Filter from "@/assets/images/Filter";
import SearchIcon from "@/assets/images/SearchIcon";

const ForumHome = () => {
  const Forumdata = [
    {
      id: 1,
      registration: "251012345",
      subject: "Introdução à Algebra Linear",
      text: "Odeiooo ESPAÇO VETORIALLL",
      urgency: false,
      difficulty: "Média",
    },
    {
      id: 2,
      registration: "241087099",
      subject: "Cálculo 1",
      text: "Estou com bastante dúvida nessa questão de Derivadas, por favorrrr, me ajudemmmm",
      urgency: true,
      difficulty: "Baixa",
    },
    {
      id: 3,
      registration: "252010966",
      subject: "Cálculo 2",
      text: "ALGUÉM ME AJUDA COM ESSE SOMATÓRIOOO, POR FAVORRRR",
      urgency: true,
      difficulty: "Alta",
    },
    {
      id: 4,
      registration: "252010333",
      subject: "Felicidade",
      text: "Como pode a máteria se chamar Felicidade e eu só ficar triste quando assisto à ela?",
      urgency: true,
      difficulty: "Alta",
    },
    {
      id: 5,
      registration: "251010553",
      subject: "Felicidade",
      text: "Como pode a máteria se chamar Felicidade e eu só ficar triste quando assisto à ela?",
      urgency: true,
      difficulty: "Alta",
    },
  ];

  const [modalVisible, setModalVisible] = useState(false);
  const [expandedText, setExpandedText] = useState<number | null>(null); // Armazena o ID do item expandido

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleOptionClick = (option: string) => {
    console.log(`Opção selecionada: ${option}`);
    setModalVisible(false); 
  };

  const handleReadMore = (id: number) => {
    setExpandedText(id);
  };

  const handleShowLess = () => {
    setExpandedText(null);
  };

  const renderCard = ({ item }: { item: CardItem }) => {
    const isExpanded = expandedText === item.id;

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <FontAwesome name="user-circle" size={40} color="#173CAC" />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.registration}>{item.registration}</Text>
            <Text style={styles.subject}>{item.subject}</Text>
          </View>
          {item.urgency && (
            <View style={styles.urgentTag}>
              <Text style={styles.urgentText}>Urgente</Text>
            </View>
          )}
          <TouchableOpacity onPress={toggleModal}>
            <MaterialIcons
              name="more-vert"
              size={24}
              color="#000"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.text} numberOfLines={isExpanded ? undefined : 3}>
          {item.text}
        </Text>
        {!isExpanded ? (
          <TouchableOpacity onPress={() => handleReadMore(item.id)}>
            <Text style={styles.readMore}>Ler mais...</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleShowLess}>
            <Text style={styles.readMore}>Mostrar menos</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.difficulty}>Dificuldade: {item.difficulty}</Text>
      </View>
    );
  };

  type CardItem = {
    id: number;
    registration: string;
    subject: string;
    urgency?: boolean;
    text: string;
    difficulty: string;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <UnbLogo_Home style={styles.title}></UnbLogo_Home>
      </View>

      <View style={styles.searchBar}>
        <Input>
          <TextInput placeholder="Pesquisar" style={styles.searchInput} />
          <SearchIcon></SearchIcon>
        </Input>
        <Filter></Filter>
      </View>

      <FlatList
        data={Forumdata}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCard}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      />

      <TouchableOpacity style={styles.fab}>
        <MaterialIcons name="add" size={30} color="#fff" />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={toggleModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalOption} onPress={() => handleOptionClick("Opção 1")}>
              Responder
            </Text>
            <Text style={styles.modalOption} onPress={() => handleOptionClick("Opção 2")}>
              Denunciar
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F6FA" },
  header: { 
    backgroundColor: "#173CAC", 
    padding: 20, 
    height: 103,
    width: 375,
},
  title: { color: "#FFFFFF", fontSize: 24, fontWeight: "bold", paddingLeft: 20 },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 15,
    height: 46,
    width: 289,
    paddingHorizontal: 10,
    borderRadius: 8,
    elevation: 3,
  },
  searchInput: { 
    flex: 1, 
    marginLeft: 10, 
    fontSize: 16, 
    color: "969696", 
    fontFamily: 'Itim_400Regular'
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
  },
  cardHeader: { flexDirection: "row", alignItems: "center" },
  registration: { fontSize: 16, fontWeight: "bold", fontFamily: 'Itim_400Regular' },
  subject: { fontSize: 14, color: "#666", fontFamily: 'Itim_400Regular'},
  urgentTag: {
    backgroundColor: "#FF0000",
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 16,
  },
  urgentText: { color: "#fff", fontSize: 13,  fontFamily: 'Itim_400Regular'},
  text: { fontSize: 14, color: "#333", marginVertical: 10, fontFamily: "Raleway_400Regular" },
  readMore: { fontSize: 13, color: "#173CAC", fontWeight: "bold",fontFamily: 'Itim_400Regular', textDecorationLine: 'underline' },
  difficulty: { fontSize: 12, color: "0000", marginTop: 5, fontFamily: 'Itim_400Regular', alignSelf: "flex-end" },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#1e4ba8",
    width: 77,
    height: 77,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  icon: {
    marginLeft: 45,
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