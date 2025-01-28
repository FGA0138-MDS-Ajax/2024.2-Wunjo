import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';
import { router } from 'expo-router';
import { BackHeader } from '@/components/ui/backheader';
import { useNavigation } from '@react-navigation/native'; 

export default function ExcluirConta() {
    const [telaFim, setTelaFim] = useState('excluir'); 
    const navigation = useNavigation(); 

    if (telaFim === 'confirmacao') {
        return (
            <View style={styles.container2}>
                <Text style={styles.title}>Sua jornada chegou ao fim :(</Text>
                <Text style={styles.text}>Sua conta foi excluída com sucesso. Todos os seus dados foram apagados de forma permanente. Sentiremos sua falta e esperamos vê-lo novamente em breve!</Text>
                <Button 
                    style={{ marginTop: 20, borderColor: 'red', width: '70%' }}
                    size="lg"
                    variant="solid"
                    action="primary"
                    onPress={() => router.push('/(app)/(home)')} >
                    <ButtonText>Continuar</ButtonText>
                </Button>                    
            </View>
        );
    }

    return (
      <View style={styles.container}>
        <BackHeader
            style={{ marginBottom: 180 }} 
            onPress={() => navigation.goBack()} label="" />

            <Text style={styles.title}>Excluir Conta</Text>
            <Text style={styles.text}>Tem certeza que deseja encerrar sua jornada por aqui? Todos os seus dados serão excluídos</Text>
            <View style={styles.modalButtons}>
                <Button 
                    style={{ marginTop: 20, borderColor: 'red' }}
                    size="lg"
                    variant="outline"
                    action="primary"
                    onPress={() => setTelaFim('confirmacao')} 
                >
                    <ButtonText style={{ color: 'red' }}>Excluir Conta</ButtonText>
                </Button>
                <Button 
                    style={{ marginTop: 20, borderColor: 'gray' }}
                    size="lg"
                    variant="outline"
                    action="primary"
                    onPress={() => router.push('/(app)/(profile)')} 
                >
                    <ButtonText style={{ color: 'gray' }}>Cancelar</ButtonText>
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginTop: 80,
    },
    container2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        fontFamily: 'Itim_400Regular',
    },
    text: {
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
        marginBottom: 20,
    },
    modalButtons: {
        width: '70%',
        flexDirection: 'column',
    },
});
