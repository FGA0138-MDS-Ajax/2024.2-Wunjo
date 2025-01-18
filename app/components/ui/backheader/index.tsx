import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { HStack } from "@/components/ui/hstack";
import SVGBackButton from "@/assets/images/back-button";

export function BackButton({ onPress, label }: { onPress: () => void, label: string }) {
    return (
        <HStack style={styles.container}>
            <Pressable onPress={onPress} style={styles.button}>
                <SVGBackButton />
            </Pressable>
            <Text style={styles.label}>{label}</Text>
        </HStack>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        backgroundColor: "#DDE4EE",
        borderRadius: 12,
        width: 36,
        marginLeft: 12,
        aspectRatio: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    label: {
        color: "#1E293B",
        fontSize: 32,
        fontFamily: 'Itim_400Regular',
        marginLeft: 10,
    },
});