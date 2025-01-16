import { View, Text, TextInput } from "react-native";

export function Input({
    label,
    placeholder,
    secureTextEntry
}: {
    label?: string,
    placeholder?: string,
    secureTextEntry?: boolean
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
            secureTextEntry={secureTextEntry}
            className={"font-raleway"}
            placeholder={placeholder}
            style={{
                backgroundColor: "white",
                borderRadius: 8,
                height: 48,
                width: "100%",
                paddingLeft: 15,
        }}/>
    </View>
}