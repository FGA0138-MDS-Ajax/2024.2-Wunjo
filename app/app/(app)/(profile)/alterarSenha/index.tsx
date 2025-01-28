import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AlterarSenha() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigation = useNavigation();

    const handleChangePassword = () => {
        if (newPassword !== confirmPassword) {
            alert('As novas senhas não coincidem');
            return;
        }
        // Lógica para alterar a senha
        console.log('Senha alterada');
        // Navegar de volta para a tela de perfil ou outra tela
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Alterar Senha</Text>
            <TextInput
                style={styles.input}
                placeholder="Senha Atual"
                secureTextEntry
                value={currentPassword}
                onChangeText={setCurrentPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="Nova Senha"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirmar Nova Senha"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
                <Text style={styles.buttonText}>Alterar Senha</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#3b82f6',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    cancelButton: {
        backgroundColor: '#cccccc',
        padding: 15,
        borderRadius: 5,
    },
    cancelButtonText: {
        color: '#000',
        fontSize: 16,
    },
});