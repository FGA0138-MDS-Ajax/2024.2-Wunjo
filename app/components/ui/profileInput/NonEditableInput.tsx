import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface NonEditableInputProps {
    value: string;
    placeholder: string;
}

const NonEditableInput: React.FC<NonEditableInputProps> = ({ value, placeholder }) => {
    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                value={value}
                placeholder={placeholder}
                editable={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#969696',
        borderRadius: 5,
        backgroundColor: '#E3E3E3',
        marginBottom: 10,
    },
    input: {
        flex: 1,
        height: 48,
        padding: 10,
        backgroundColor: '#E3E3E3',
        borderRadius: 5,
        opacity: 0.8,
    },
});

export default NonEditableInput;