import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Input } from "@/components/ui/input2";
import { BackHeader } from '@/components/ui/backheader';
import PirateClosedEyes from '@/assets/images/pirate-closed-eyes';
import PirateWalking from '@/assets/images/pirate-walking';
import { Button, ButtonText } from '@/components/ui/button';
import { useRouter } from 'expo-router';


export default function AlterarSenha() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [successScreen, setsuccessScreen] = useState('alterar');
    const router = useRouter();
    const handleChangePassword = () => {
        //colocar as condicoes de senha
        if (newPassword !== confirmPassword) {
            alert('As novas senhas não coincidem');
            return;
        }
        // Lógica para alterar a senha
        console.log('Senha alterada');
        setsuccessScreen('confirmacao');
    };
    if (successScreen === 'confirmacao') {
        return (
            <View style={[styles.container, { paddingHorizontal: 40 }]}>
                <Text style={styles.title}>Senha alterada com sucesso!</Text>
                <Text style={styles.text}>Sua senha foi atualizada. Agora você pode acessar sua conta com segurança usando a nova senha cadastrada.</Text>
                <Button variant='solid' style={{ width: 288, height: 50 }} onPress={() => router.back()}>
                    <ButtonText>Continuar</ButtonText>
                </Button>
                <PirateWalking style={styles.pirateWalking} />
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <BackHeader style={styles.customBackHeader}
                onPress={() => router.back()} label="" />
            <Text style={styles.title}>Alterar Senha</Text>
            <Input style={styles.input} label="Senha Atual" placeholder="Digite aqui..." />
            <Input style={styles.input} label="Nova Senha" placeholder="Digite aqui..." />
            <Input style={styles.input} label="Confirmar Nova Senha" placeholder="Digite aqui..." />
            <Button variant='solid' style={{ width: 288, height: 50 }} onPress={handleChangePassword}>
                <ButtonText>Alterar</ButtonText>
            </Button>

            <PirateClosedEyes style={styles.piratePosition} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 145,
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        marginBottom: 42,
        textAlign: 'center',
        fontFamily: 'Itim_400Regular',
        color: '#703111'
    },
    input: {
        marginBottom: 24,
    },
    customBackHeader: {
        position: 'absolute',
        top: 60,
        left: 20,
        zIndex: 1,
    },
    piratePosition: {
        position: 'absolute',
        bottom: -22,
        right: -25,
    },
    text: {
        fontFamily: 'Raleway_400Regular',
        fontSize: 18,
        marginBottom: 40,
        marginTop: 30,
    },
    pirateWalking: {
        position: 'absolute',
        bottom: -5,
    }
});