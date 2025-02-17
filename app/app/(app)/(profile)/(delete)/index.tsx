import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '@/components/ui/button2';
import { router } from 'expo-router';
import { BackHeader } from '@/components/ui/backheader';
import { useNavigation } from '@react-navigation/native';
import PirateSad from '@/assets/images/pirate-sad';
import JollyRoger from '@/assets/images/jolly-roger';
import { useUnBordo } from '@/hooks/unbordo';

export default function ExcluirConta() {
    const [endScreen, setEndScreen] = useState(false);

    const { auth } = useUnBordo();

    const delete_account = () => {
        console.log('Excluindo dados da pessoa...');
        // setModalLogoutVisible(false);
        console.log(auth)
        setEndScreen(true);
    };

    if (endScreen){
        return (
            <View style={{
                flex: 1,
                paddingHorizontal: 20,        
                justifyContent: 'center'
            }}>
                <Text className='font-itim' style={{
                    textAlign: 'center',
                    paddingHorizontal: 50,
                    color: '#703111',
                    fontSize: 30,
                    marginBottom: 20,
                }}>
                    Sua jornada chegou ao fim :(
                </Text>
                <Text className='font-raleway' style={{
                    fontSize: 18,
                    color: 'black',
                    textAlign: 'center',
                    marginBottom: 20,
                }}>
                    Sua conta foi excluída com sucesso.
                    Todos os seus dados foram apagados de forma permanente.
                    Sentiremos sua falta e esperamos vê-lo novamente em breve!
                </Text>
                <Button
                    label='Continuar'
                    onPress={async () => {
                        await auth.unauthenticate();
                        console.log(auth);
                        while (router.canGoBack())
                            router.back();
                    }}
                />
                <JollyRoger style={{
                    position: 'absolute',
                    right: 0,
                    bottom: -10,
                    width: 100,
                    height: 100,
                }} />
            </View>
        );
    }

    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            paddingHorizontal: 20,
        }}>
            <BackHeader
                onPress={() => router.back() }
                label=""
            />
            <View style={{
                alignItems: 'center',
                rowGap: 20,
                display: 'flex',
                paddingBottom: 10
            }}>
                <Text style={{
                    fontSize: 30,
                    fontFamily: 'Itim_400Regular',
                }}>
                    Excluir Conta
                </Text>
                <Text style={{
                    fontSize: 18,
                    fontFamily: 'Raleway_400Regular',
                    color: 'black',
                    textAlign: 'center',
                }}>
                    Tem certeza que deseja encerrar sua jornada por aqui?
                    Todos os seus dados serão excluídos
                </Text>
            </View>
            <View
                style={{
                    width: "100%",
                    rowGap: 20,
                }}
            >
                <Button
                    variant="outline"
                    style={{}}
                    onPress={delete_account}
                    label='Excluir Conta'
                />
                <Button
                    label='Cancelar'
                    onPress={() => router.back()}
                />
            </View>
            
            <PirateSad style={{
                left: 0,
                width: '100%',
                marginTop: 50,
                transform: [{ scale: 1.2 }]
            }} />
        </View>
    );
}