import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface EditableInputProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder: string;
    editable: boolean;
    onEditPress: () => void;
}

const EditableInput: React.FC<EditableInputProps> = ({ value, onChangeText, placeholder, editable, onEditPress }) => {
    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                editable={editable}
            />
            <TouchableOpacity style={styles.editIcon} onPress={onEditPress}>
                <Feather name="edit" size={20} color="black" />
            </TouchableOpacity>
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
    editIcon: {
        padding: 10,
    },
});

export default EditableInput;