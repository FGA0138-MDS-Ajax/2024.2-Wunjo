import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';
import CameraIcon from '@/assets/images/camera'; 
import * as ImagePicker from 'expo-image-picker';
import ImageViewing from 'react-native-image-viewing';

interface MessageInputProps {
    inputMessage: string;
    setInputMessage: (text: string) => void;
    handleSendMessage: (message: string, imageUri: string | null) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ inputMessage, setInputMessage, handleSendMessage }) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isImageViewerVisible, setImageViewerVisible] = useState(false);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images , //ver dps se tem outro jeito de pegar só imagens
            allowsEditing: true, 
            quality: 1,
        });

        if (!result.canceled) {
            console.log(result.assets[0].uri);
            setSelectedImage(result.assets[0].uri); // armazenar a imagem selecionada
        }
    };

    const takePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            console.log(result.assets[0].uri);
            setSelectedImage(result.assets[0].uri); // Armazenar a imagem tirada
        }
    };

    // Função para exibir um alerta com as opcoes de pegar a imagem, talvez criar um popup mais bonito dps
    const handleCameraPress = () => {
        Alert.alert(
            "Enviar Imagem",
            "Escolha uma opção",
            [
                { text: "Tirar Foto", onPress: takePhoto },
                { text: "Escolher da Galeria", onPress: pickImage },
                { text: "Cancelar", style: "cancel" }
            ]
        );
    };

    const onSendMessage = () => {
        handleSendMessage(inputMessage, selectedImage);
        setInputMessage('');
        setSelectedImage(null);
    };

    return (
        <View style={styles.inputContainer}>
            {selectedImage && (
                <TouchableOpacity onPress={() => setImageViewerVisible(true)}>
                    <Image source={{ uri: selectedImage }} style={styles.previewImage} />
                </TouchableOpacity>
            )}
            <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.input}
                    value={inputMessage}
                    onChangeText={setInputMessage}
                    placeholder="Digite sua mensagem..."
                />
                <TouchableOpacity style={styles.cameraButton} onPress={handleCameraPress}>
                    <CameraIcon width={24} height={24} />
                </TouchableOpacity>
            </View>
            <Button style={styles.sendButton} action="primary" variant="solid" onPress={onSendMessage}>
                <ButtonText>Enviar</ButtonText>
            </Button>
            {/*deixa a imagem clicavel, para os usuarios olharem ela em tela cheia*/}
            <ImageViewing
                images={selectedImage ? [{ uri: selectedImage }] : []}
                imageIndex={0}
                visible={isImageViewerVisible}
                onRequestClose={() => setImageViewerVisible(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        backgroundColor: '#F5F6FA',
    },
    inputWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#173CAC',
        borderRadius: 20,
        paddingHorizontal: 10,
        marginRight: 10, 
    },
    input: {
        flex: 1,
        paddingHorizontal: 10,
    },
    cameraButton: {
        marginLeft: 8,
    },
    sendButton: {
        paddingHorizontal: 20,
    },
    previewImage: {
        width: 50,
        height: 50,
        borderRadius: 4,
        marginRight: 4,
    },
});

export default MessageInput;