import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';
import { router } from 'expo-router';
import { BackHeader } from '@/components/ui/backheader';
import { useNavigation } from '@react-navigation/native';
import PirateSad from '@/assets/images/pirate-sad';
import JollyRoger from '@/assets/images/jolly-roger';


export default function ExcluirConta() {
    const [telaFim, setTelaFim] = useState('excluir');
    const navigation = useNavigation();

    const handleExcluirConta = () => {
        console.log('Excluindo dados da pessoa...');
        setTelaFim('confirmacao');
    };

    if (telaFim === 'confirmacao') {
        return (
            <View style={styles.container2}>
                <View style={styles.content2}>
                    <Text style={styles.title2}>Sua jornada chegou ao fim :(</Text>
                    <Text style={styles.text}>Sua conta foi excluída com sucesso. Todos os seus dados foram apagados de forma permanente. Sentiremos sua falta e esperamos vê-lo novamente em breve!</Text>
                    <Button
                        style={{ marginTop: 20, borderColor: 'red', width: 288, height: 50 }}
                        size="lg"
                        variant="solid"
                        action="primary"
                        onPress={() => {
                            while (router.canGoBack())
                                router.back()
                        }} >
                        {/* colocar a rota para a tela inicial, falhei miseravelmente */}

                        <ButtonText>Continuar</ButtonText>
                    </Button></View>
                <JollyRoger style={styles.flag} />

            </View>
        );
    }

    return (
        <View style={styles.container}>
            <BackHeader
                onPress={() => navigation.goBack()} label="" />

            <View style={styles.content}>
                <Text style={styles.title}>Excluir Conta</Text>
                <Text style={styles.text}>Tem certeza que deseja encerrar sua jornada por aqui? Todos os seus dados serão excluídos</Text>
                <View style={styles.modalButtons}>
                    <Button
                        style={{ marginTop: 20, borderColor: 'red', width: 288, height: 50 }}
                        variant="outline"
                        action="primary"
                        onPress={handleExcluirConta}
                    >
                        <ButtonText style={{ color: 'red' }}>Excluir Conta</ButtonText>
                    </Button>
                    <Button
                        style={{ marginTop: 20, borderColor: 'gray', width: 288, height: 50 }}
                        size="lg"
                        variant="outline"
                        action="primary"
                        onPress={() => router.push('/(app)/(profile)')}
                    >
                        <ButtonText style={{ color: 'gray' }}>Cancelar</ButtonText>
                    </Button>
                </View>
            </View>
            <PirateSad style={styles.pirateSad} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 0,
        position: 'relative',
    },
    container2: {
        flex: 1,
        paddingHorizontal: 20,
    },
    content: {
        alignItems: 'center',
        paddingBottom: 70,
    },
    content2: {
        alignItems: 'center',
        paddingBottom: 70,
        marginTop: 160,
    },
    title: {
        fontSize: 30,
        marginBottom: 20,
        fontFamily: 'Itim_400Regular',
    },
    title2:
    {
        textAlign: 'center',
        paddingHorizontal: 50,
        color: '#703111',
        fontSize: 30,
        marginBottom: 20,
        fontFamily: 'Itim_400Regular',
    },
    text: {
        fontSize: 18,
        fontFamily: 'Raleway_400Regular',
        color: 'black',
        textAlign: 'center',
        marginBottom: 20,
    },
    modalButtons: {
        width: '70%',
        flexDirection: 'column',
    },
    pirateSad: {
        left: 0,
        width: '100%',
        marginTop: 50,
        transform: [{ scale: 1.2 }]
    },
    flag: {
        position: 'absolute',
        right: 0,
        bottom: -10,
        width: 100,
        height: 100,
    }
});