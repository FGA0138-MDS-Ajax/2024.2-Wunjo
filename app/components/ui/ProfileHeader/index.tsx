import ProfileHeader from '@/assets/images/profile-header';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Text, View } from 'react-native';
import { BackHeader } from '../backheader';

interface ProfileHeaderComponentProps {
    photoUri: string;
    title: string;
    onBackPress: () => void;
}

const ProfileHeaderComponent: React.FC<ProfileHeaderComponentProps> = ({ photoUri, title, onBackPress }) => {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <ProfileHeader style={styles.headerContainer} />
            
            <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
                <BackHeader onPress={onBackPress} label="" />
            </TouchableOpacity>
            <Image source={{ uri: photoUri }} style={styles.profilePic} />
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
});

export default ProfileHeaderComponent;