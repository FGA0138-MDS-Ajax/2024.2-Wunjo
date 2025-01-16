import { View, Text, TextInput } from "react-native";

export function Input({
    label,
    placeholder,
    secureTextEntry,
    onPress,
    editable = true,
    value
}: {
    label?: string,
    placeholder?: string,
    secureTextEntry?: boolean,
    onPress?: () => void,
    editable?: boolean,
    value?: string
}) {
    return <View style={{
        display: "flex",
        flexDirection: "column",
        rowGap: 2,
        width: "100%",
    }}>
        <Text className="font-itim" style={{
            color: "black",
            fontSize: 15,
        }}>{label}</Text>
        <TextInput
            editable={editable}
            secureTextEntry={secureTextEntry}
            className={"font-raleway"}
            placeholder={placeholder}
            onPress={onPress}
            value={value}
            style={{
                backgroundColor: "white",
                borderRadius: 8,
                height: 48,
                width: "100%",
                paddingLeft: 15,
        }}/>
    </View>
}