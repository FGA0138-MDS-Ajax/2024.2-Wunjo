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

import SVGPirateSmile from "@/assets/images/pirate-smile";
import SVGArrow from "@/assets/images/arrow";

export default function Screen() {
    const router = useRouter();
    const hasKeyboard = useKeyboardVisible();

    const pirate = {
        width: 159,
        height: 327
    }

    const decreaser = 2;

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
                // backgroundColor: "red"
            }}>
                <View
                    style={{
                        flex: 4,
                        width: "100%",
                        zIndex: 2,
                        padding: 15,
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        rowGap: 25,
                        // backgroundColor: "green"
                    }}
                >
                    <Text
                        className="font-raleway"
                        style={{
                            // backgroundColor: "blue",
                            alignSelf: "flex-start",
                            fontSize: 16
                        }}
                    >
                        Digite seu novo segredo do tesouro!
                    </Text>
                    <View style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        rowGap: 15,
                    }}>
                        <Input
                            secureTextEntry={true}
                            label="Senha"
                            placeholder="Digite aqui..."
                        />
                        <Input
                            secureTextEntry={true}
                            label="Confirmar senha"
                            placeholder="Digite aqui..."
                        />
                    </View>
                    <Button
                        label="Redefinir"
                        onPress={() => router.push('/(register)/(recover)/(success)')}
                        style={{
                            width: "75%"
                        }}
                    >

                    </Button>
                </View>     
                <View
                    style={{
                        flex: hasKeyboard ? 4.5 / (decreaser * 1.25) : 4.5,
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-end",
                        position: "relative",
                    }}
                >
                    <SVGPirateSmile 
                        width={hasKeyboard ? pirate.width / decreaser : pirate.width}
                        height={hasKeyboard ? pirate.height / decreaser : pirate.height}
                        style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                        }}
                    />
                    <Text
                        className='font-raleway'
                        style={{
                            marginRight: "10%",
                            fontSize: 16
                        }}
                    >
                        {"-não estou vendo sua senha :)"}
                    </Text>

                </View>
            </View>
        </SafeAreaView>
    );
}