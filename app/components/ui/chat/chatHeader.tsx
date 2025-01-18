import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { BackButton } from '@/components/ui/backheader';

interface ChatHeaderProps {
    username: string;
    userImage: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ username, userImage }) => {
    const router = useRouter();

    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
                <BackButton onPress={() => router.back()} label="" />
            </TouchableOpacity>
            <Image source={{ uri: userImage }} style={styles.userImage} />
            <Text style={styles.title}>{username}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 130,
        backgroundColor: '#173CAC',
        paddingHorizontal: 20,
        paddingTop: 40, // Adiciona paddingTop para evitar que o conteúdo fique atrás do cabeçalho
    },
    userImage: {
        width: 66,
        height: 66,
        borderRadius: 33,
        marginRight: 8,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        fontFamily: 'Itim_400Regular',
        color: '#F5F6FA', // Cor da fonte do título
    },
});

export default ChatHeader;