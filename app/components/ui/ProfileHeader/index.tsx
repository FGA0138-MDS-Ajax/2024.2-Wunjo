import ProfileHeader from '@/assets/images/profile-header';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Image, Text, View, Modal } from 'react-native';
import { Button, ButtonText } from '../button';
import { Ionicons } from '@expo/vector-icons';

interface ProfileHeaderComponentProps {
  photoUri: any; 
  title: string;
  onBackPress: () => void;
}

const avatarList = [
  require("../../../assets/avatars/avatar1.webp"),
  require("../../../assets/avatars/avatar2.webp"),
  require("../../../assets/avatars/avatar3.webp"),
  require("../../../assets/avatars/avatar4.webp"),
  require("../../../assets/avatars/avatar5.webp"),
  require("../../../assets/avatars/avatar6.webp"),
  require("../../../assets/avatars/avatar7.webp"),
  require("../../../assets/avatars/avatar8.webp"),
];

const ProfileHeaderComponent: React.FC<ProfileHeaderComponentProps> = ({ photoUri, title, onBackPress }) => {

  const [AvatarModalVisible, setAvatarModalVisible] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(avatarList[0]);

  //implrementar logica para alterar foto
  const handleAvatarChange = (avatar: any) => {
    setSelectedAvatar(avatar);
    console.log('Avatar selecionado:', avatar);
    setAvatarModalVisible(false); // Fecha o popup após escolher
  };

  const router = useRouter();
  return (
    <View style={styles.container}>
      <ProfileHeader style={styles.headerContainer} />

      {/* Modal para Alterar Foto */}
      <Modal
        transparent={true}
        visible={AvatarModalVisible}
      >
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPressOut={() => setAvatarModalVisible(false)}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Alterar ícone de Perfil</Text>
            <Text style={styles.modalMessage}>Escolha uma novo ícone de perfil.</Text>
            <View style={styles.avatars}>
              {avatarList.map((avatar, index) => (
                <TouchableOpacity key={index} onPress={() => handleAvatarChange(avatar)}>
                  <Image source={avatar} style={styles.avatarOption} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Edição da foto */}
      <Image source={photoUri} style={styles.profilePic} />
      <TouchableOpacity style={styles.editIcon} onPress={() => setAvatarModalVisible(!AvatarModalVisible)}>
        <Ionicons name="pencil" size={24} color="white" />
      </TouchableOpacity>

      {/* título */}
      <View style={styles.titleContainer}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  headerContainer: {
    ...StyleSheet.absoluteFillObject,
    transform: [{ scale: 1.35 }],
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 1,
  },
  profilePic: {
    position: 'absolute',
    top: 64,
    left: '50%',
    transform: [{ translateX: -50 }],
    zIndex: 1,
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIcon: {
    position: 'absolute',
    bottom: 40,
    right: 130,
  },
  titleContainer: {
    position: 'absolute',
    top: 175,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1,
  },
  headerTitle: {
    fontFamily: 'Itim_400Regular',
    fontSize: 24,
    textAlign: 'center', // Centraliza o texto
    color: '#fff',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  avatarOption: { width: 80, height: 80, margin: 5, borderRadius: 40 },
  avatars: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',

  },
});

export default ProfileHeaderComponent; 