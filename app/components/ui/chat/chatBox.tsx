import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Button } from "react-native";

interface ChatBoxProps {
  username: string;
  message: string;
  userImage: string;
  onPress: () => void; // Função para abrir o chat
}

export default function ChatBox({ username, message, userImage, onPress }: ChatBoxProps) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <TouchableOpacity onPress={onPress} style={styles.chatItems}>
      <Image source={{ uri: userImage }} style={styles.circle} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{username}</Text>
        <Text style={styles.message} numberOfLines={1}>{message}</Text>
      </View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.options}>...</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Opções</Text>
            <Button title="Fechar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chatItems: {
    width: "100%",
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  circle: {
    width: 66,
    height: 66,
    borderRadius: 33,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 24,
    fontFamily: "Itim_400Regular",
    color: "#1a1a2d",
  },
  message: {
    fontSize: 16,
    fontFamily: "Raleway_400Regular",
    color: "#1a1a2d",
  },
  options: {
    fontSize: 24,
    fontFamily: "Itim_400Regular",
    color: "#1a1a2d",
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
import { View, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback} from "react-native";
import React, { useState } from "react";

export default function ChatBox() {
    const [modalVisible, setModalVisible] = useState(false);
    
    return (
        <>
            <TouchableOpacity onPress={() => console.log("ChatBox clicado")}>
                <View style={styles.chatItems}>
                    <View style={styles.circle}></View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.name}>arthurtopzera</Text>
                        <Text style={styles.message}>Seguinte, voce faz a derivada...</Text>
                    </View>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Text style={styles.options}>...</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>

            <Modal
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.modalOverlay}>
                        <TouchableWithoutFeedback onPress={() => {}}>
                            <View style={styles.modalContent}>
                                    <Text style={styles.modalButtonText}>Encerrar bate papo</Text>
                                    <Text style={styles.modalButtonText}>Ver perfil</Text>
                                    <Text style={styles.modalButtonText}>Denunciar</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30,
    },
    title: {
        fontSize: 32,
        fontFamily: "Itim_400Regular",
        color: "#1E293B",
    },
    scrollContainer: {
        marginTop: 20,
        width: "100%",
    },
    chatItems: {
        width: "100%",
        height: 100,
        flexDirection: "row",
    },
    circle: {
        width: 66,
        height: 66,
        borderRadius: 33,
        backgroundColor: "green",
        marginLeft: 5,
        marginTop: 5,
    },
    name: {
        fontSize: 24,
        fontFamily: "Itim_400Regular",
        color: "#1a1a2d",
        marginLeft: "10%",
    },
    message: {
        fontSize: 16,
        fontFamily: "Raleway_400Regular",
        color: "#1a1a2d",
        marginLeft: "10%",
    },
    options:
    {
        fontSize: 24,
        fontFamily: "Itim_400Regular",
        color: "#1a1a2d",
        marginRight: "5%",
    },
    withBorder: {
        borderBottomWidth: 1, // Linha entre mensagens
        borderBottomColor: '#ddd', // Cor da linha
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        width: "60%", 
        backgroundColor: "#FFF",
        borderRadius: 10,
        padding: 20,
        alignItems:"flex-start",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalButtonText: {
        color: "#1A1A2D",
        fontFamily: "Raleway_400Regular",
        fontSize: 16,
        marginVertical: 2,
    },
});