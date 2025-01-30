import ProfileHeader from '@/assets/images/profile-header';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Image, Text, View, Modal } from 'react-native';
import { BackHeader } from '../backheader';
import { Button, ButtonText } from '../button';
import { Ionicons } from '@expo/vector-icons';

interface ProfileHeaderComponentProps {
    photoUri: string;
    title: string;
    onBackPress: () => void;
}

const ProfileHeaderComponent: React.FC<ProfileHeaderComponentProps> = ({ photoUri, title, onBackPress }) => {

    const [photoModalVisible, setPhotoModalVisible] = useState(false);

    
      const handleClosePhotoModal = () => {
        setPhotoModalVisible(false);
      };

    const handleEditPhoto = () => {
        setPhotoModalVisible(true);
      };

    const router = useRouter();
    return (
        <View style={styles.container}>
            <ProfileHeader style={styles.headerContainer} />

    {/* Modal para Alterar Foto */}
      <Modal
        transparent={true}
        visible={photoModalVisible}
        onRequestClose={handleClosePhotoModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Alterar ícone de Perfil</Text>
            <Text style={styles.modalMessage}>Escolha uma novo ícone de perfil.</Text>
            <Button
              size="lg"
              variant="solid"
              action="primary"
              onPress={handleClosePhotoModal}
              style={{ marginTop: 20, height: 50 }}
            >
              <ButtonText>Cancelar</ButtonText>
            </Button>
          </View>
        </View>
      </Modal>
            
    {/* Edição da foto */}
            <TouchableOpacity style={styles.backButton} onPress={onBackPress}> {/*aqui nao precisa de botao de voltar, tirar*/}
                <BackHeader onPress={onBackPress} label="" />
            </TouchableOpacity>
            <Image source={{ uri: photoUri }} style={styles.profilePic} />
            <TouchableOpacity style={styles.editIcon} onPress={handleEditPhoto}>
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
        height: 200, // Ajuste conforme necessário
        marginBottom: 20,
    },
    headerContainer: {
        ...StyleSheet.absoluteFillObject,
        transform: [{ scale: 1.35}],
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
        transform: [{ translateX: -50 }], // Centraliza a imagem
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
});

export default ProfileHeaderComponent;