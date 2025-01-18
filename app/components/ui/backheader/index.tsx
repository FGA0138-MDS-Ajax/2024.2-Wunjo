import { Text, Pressable, StyleProp, ViewStyle } from "react-native";
import { HStack } from "@/components/ui/hstack";
import SVGBackButton from "@/assets/images/back-button";

export function BackHeader({
    onPress,
    label,
    children,
    style
}: {
    onPress: () => void,
    label: string,
    children?: React.ReactNode,
    style?: StyleProp<ViewStyle>
}) {
    return <HStack
        style={
            [{
            flex: 1,
            height: "auto",
            alignItems: "center",
            justifyContent: "center",
            width: "100%"
        }, style]}
    >
        <Pressable
            onPress={onPress}
            style={{
                backgroundColor: "#DDE4EE",
                borderRadius: 12,
                width: 36,
                marginLeft: 12,
                position: "absolute",
                aspectRatio: 1,
                left: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <SVGBackButton />
        </Pressable>
        <Text className="font-itim" style={{
            color: "#1E293B",
            fontSize: 32,
        }}>
            {label}
        </Text>
        {children}
    </HStack>

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