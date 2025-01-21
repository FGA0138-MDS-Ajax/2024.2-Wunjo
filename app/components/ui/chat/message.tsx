import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import ImageViewing from 'react-native-image-viewing';

interface MessageBalloonProps {
    text: string;
    sender: string;
    image?: string; //prop opcional
}

const MessageBalloon: React.FC<MessageBalloonProps> = ({ text, sender, image }) => {
    const [isImageViewerVisible, setImageViewerVisible] = useState(false);

    return (
        <View style={[styles.messageBalloon, sender === 'me' ? styles.myMessage : styles.theirMessage]}>
            {image && (
                <TouchableOpacity onPress={() => setImageViewerVisible(true)}>
                    <Image source={{ uri: image }} style={styles.messageImage} />
                </TouchableOpacity>
            )}
            {text && <Text style={styles.messageText}>{text}</Text>}
            <ImageViewing
                images={[{ uri: image }]}
                imageIndex={0}
                visible={isImageViewerVisible}
                onRequestClose={() => setImageViewerVisible(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    messageBalloon: {
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
        maxWidth: '80%',
        alignSelf: 'flex-start',
    },
    myMessage: {
        backgroundColor: '#173CAC',
        alignSelf: 'flex-end',
    },
    theirMessage: {
        backgroundColor: '#4A90E2',
        alignSelf: 'flex-start',
    },
    messageText: {
        fontSize: 16,
        color: '#fff',
    },
    messageImage: {
        width: Dimensions.get('window').width * 0.7, // 70% da largura da tela
        height: Dimensions.get('window').width * 0.7, // Manter a proporção 1:1
        borderRadius: 10,
        marginBottom: 5,
    },
});

export default MessageBalloon;