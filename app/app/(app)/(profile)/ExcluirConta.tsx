import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'next/router';

const ExcluirConta = () => {
    const router = useRouter();

    const handleDeleteAccount = () => {
        // Lógica para excluir a conta
        console.log('Conta excluída');
        router.push('/'); // Redireciona para a página inicial após excluir a conta
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Excluir Conta</Text>
            <Text style={styles.warning}>Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.</Text>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
                <Text style={styles.deleteButtonText}>Excluir Conta</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F6FA',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    warning: {
        fontSize: 16,
        color: '#FF0000',
        textAlign: 'center',
        marginBottom: 20,
    },
    deleteButton: {
        backgroundColor: '#FF0000',
        padding: 10,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});

export default ExcluirConta;