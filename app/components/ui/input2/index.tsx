import React from "react";
import {
    View,
    Text,
    TextInput,
    KeyboardType,
    StyleSheet,
    StyleProp,
    TextStyle,
    Pressable
} from "react-native";

const variants = StyleSheet.create({
    square: {
        backgroundColor: "#703111",
        borderRadius: 12,
        width: 66,
        aspectRatio: 1,
        textAlign: "center",
        color: "#FFA33D",
        fontSize: 32
    },
    wide: {
        backgroundColor: "white",
        borderRadius: 8,
        height: 48,
        width: "100%",
        paddingLeft: 15,
    },
})


type IInputProps = {
    label?: string,
    placeholder?: string,
    secureTextEntry?: boolean,
    onPress?: () => void,
    editable?: boolean,
    value?: string,
    keyboardType?: KeyboardType,
    showSoftInputOnFocus?: boolean,
    variant?: "square" | "wide",
    style?: StyleProp<TextStyle>,
    maxLength?: number,
    children?: React.ReactNode
} & React.ComponentProps<typeof TextInput>;

export function Input({
    label,
    placeholder,
    secureTextEntry,
    onPress,
    editable = true,
    value,
    keyboardType = 'default',
    showSoftInputOnFocus = true,
    onChangeText,
    variant = "wide",
    style,
    maxLength,
    children,
    ...props
}: IInputProps) {
    return <View style={{
        display: "flex",
        flexDirection: "column",
        rowGap: 2,
        width: variants[variant].width,
        position: "relative"
    }}>
        {
            label && <Text className="font-itim" style={{
                color: "black",
                fontSize: 15,
            }}>
                {label}
            </Text>
        }
        
        {
            variant === "square" && <View
                style={{
                    position: "absolute",
                    backgroundColor: "#55250C",
                    width: "100%",
                    height: "100%",
                    bottom: -4,
                    borderRadius: variants[variant].borderRadius
                }}
            />
        }
        <Pressable
            onPress={onPress}
            style={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <TextInput
                showSoftInputOnFocus={showSoftInputOnFocus}
                keyboardType={keyboardType}
                editable={editable}
                secureTextEntry={secureTextEntry}
                className={"font-raleway"}
                placeholder={placeholder}
                onPress={onPress}
                onChangeText={onChangeText}
                value={value}
                {...maxLength && { maxLength: maxLength }}
                style={[variants[variant], style]}
                {...props}
            />
            {children}
        </Pressable>
        
    </View>
}