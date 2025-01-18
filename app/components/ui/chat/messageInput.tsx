import CameraIcon from '@/assets/images/camera';
import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';

interface MessageInputProps {
    inputMessage: string;
    setInputMessage: (text: string) => void;
    handleSendMessage: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ inputMessage, setInputMessage, handleSendMessage }) => {
    return (
        <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.input}
                    value={inputMessage}
                    onChangeText={setInputMessage}
                    placeholder="Digite sua mensagem..."
                />
                <TouchableOpacity>
                    <CameraIcon width={24} height={24} />
                </TouchableOpacity>
            </View>
            <Button action="primary" variant="solid" onPress={handleSendMessage} >
                <ButtonText>Enviar</ButtonText>
            </Button>
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
        backgroundColor: '#fff', // Adiciona cor de fundo para o campo de entrada
    },
    inputWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#173CAC',
        borderRadius: 20,
        paddingHorizontal: 10,
        marginRight: 8,
    },
    input: {
        flex: 1,
        paddingHorizontal: 10,
    },
    cameraButton: {
        marginLeft: 8,
    },
    cameraButtonText: {
        fontSize: 24,
    },
});

export default MessageInput;