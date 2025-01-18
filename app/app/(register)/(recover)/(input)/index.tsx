import Layout from "@/components/Layout";
import SafeAreaView from "@/components/SafeAreaView";
import { useRouter } from "expo-router";
import { Text } from "@/components/ui/text";
import { BackHeader } from "@/components/ui/backheader";
import { Box } from "@/components/ui/box";
import { TextInput, View } from 'react-native';
import { Input } from "@/components/ui/input2";
import { Button } from "@/components/ui/button2";
import { useKeyboardVisible } from "@/components/KeyboardListener";

import SVGPirateThinkinginSide from "@/assets/images/pirate-thinking-side";
import SVGArrow from "@/assets/images/arrow";

export default function Screen() {
    const router = useRouter();
    const hasKeyboard = useKeyboardVisible();

    const pirateOriginal = {
        width: 278,
        height: 351
    }

    const pirate = {
        keyboard: {
            width: pirateOriginal.width / 1.5,
            height: pirateOriginal.height / 1.5
        },
        free: {
            width: pirateOriginal.width,
            height: pirateOriginal.height
        }
    }

    return (
        <SafeAreaView style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
        }}>
            <BackHeader onPress={() => router.back()} label="Redefinir senha" />

            <View style={{
                width: "100%",
                flex: 5,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <View
                    style={{
                        flex: 3,
                        width: "100%",
                        zIndex: 2,
                        padding: 15,
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        rowGap: 10
                    }}
                >
                    <Text>
                        Digite as coordenadas do tesouro que te enviamos pelo e-mail!
                    </Text>
                    <View style={{
                        backgroundColor: "#F5F6FA",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        columnGap: 25
                    }}>
                        <Input maxLength={1} keyboardType="numeric" variant="square" />
                        <Input maxLength={1} keyboardType="numeric" variant="square" />
                        <Input maxLength={1} keyboardType="numeric" variant="square" />
                        <Input maxLength={1} keyboardType="numeric" variant="square" />
                    </View>
                </View>     
                <View
                    style={{
                        flex: 4,
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                        position: "relative",
                    }}
                >
                    <SVGPirateThinkinginSide 
                        width={hasKeyboard ? pirate.keyboard.width : pirate.free.width}
                        height={hasKeyboard ? pirate.keyboard.height : pirate.free.height}
                        style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                        }}
                    />
                    <Button
                        variant="circle"
                        onPress={() => router.push("/(register)/(recover)/(password)")}
                        style={{
                            margin: 20,
                            marginBottom: "25%"
                        }}
                    >
                        <SVGArrow size={24} />
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    );
}
