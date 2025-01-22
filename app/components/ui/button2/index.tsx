import { Pressable, View, Text, StyleSheet, StyleProp, ViewStyle } from "react-native";

const defaultStyle = StyleSheet.create({
    wide: {
        height: "100%",
        width: "100%",
        borderRadius: 22.5,
        maxHeight: 50
    },
    circle: {
        height: 75,
        width: 75,
        borderRadius: 75,
        maxHeight: 75
    }
})

const colours = {
    blue: {
        primary: "#0F2D89",
        secondary: "#173CAC"
    },
    black: {
        primary: "#1A1A2D",
        secondary: "#000000"
    }
}

export function Button({
    label,
    children,
    onPress,
    variant = "wide",
    color = "blue",
    style
}: {
    label?: string,
    children?: React.ReactNode,
    onPress: () => void,
    variant?: "wide" | "circle",
    color?: "blue" | "black",
    style?: StyleProp<ViewStyle>
}) {
    return <Pressable
        onPress={onPress}
        style={[
            {
                width: defaultStyle[variant].width,
            },
            style,
            {
                position: "relative",
                height: defaultStyle[variant].maxHeight,
            }
        ]}
    >
        <View
            style={{
                ...defaultStyle[variant],
                backgroundColor: colours[color].primary,
                position: "absolute",
                bottom: -4,
            }}
        />
        <View
            style={{
                ...defaultStyle[variant],
                backgroundColor: colours[color].secondary,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {label && <Text
                className="font-raleway-bold"
                style={{
                    color: "white",
                    fontSize: 15
                }}
            >{label}</Text>
            }
            {children}
        </View>
    </Pressable>
}