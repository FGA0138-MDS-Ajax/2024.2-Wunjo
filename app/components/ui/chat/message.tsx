import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MessageBalloonProps {
    text: string;
    sender: string;
}

const MessageBalloon: React.FC<MessageBalloonProps> = ({ text, sender }) => {
    return (
        <View style={[styles.messageBalloon, sender === 'me' ? styles.myMessage : styles.theirMessage]}>
            <Text style={styles.messageText}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    messageBalloon: {
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
        maxWidth: '80%',
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
        color: '#FFF',
    },
});

export default MessageBalloon;