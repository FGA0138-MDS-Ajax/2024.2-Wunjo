import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function Success() {
    return (
        <View style={styles.container}>
            <Text style={styles.message}>Alteração realizada com sucesso!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    message: {
        fontSize: 20,
        color: '#4CAF50',
    },
});