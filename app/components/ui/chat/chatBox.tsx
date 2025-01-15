import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Button, TouchableWithoutFeedback } from "react-native";

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
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={() => { }}>
              <View style={styles.modalContent}>
                <Text style={styles.modalButtonText}>Encerrar bate papo</Text>
                <Text style={styles.modalButtonText}>Ver perfil</Text>
                <Text style={styles.modalButtonText}>Denunciar</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
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
    alignItems: "flex-start",
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
