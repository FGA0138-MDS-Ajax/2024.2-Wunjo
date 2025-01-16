import Layout from "@/components/Layout";
import SafeAreaView from "@/components/SafeAreaView";
import { useRouter } from "expo-router";
import { Text } from "@/components/ui/text";
import SVGPirateThinking from "@/assets/images/pirate-thinking";
import { BackHeader } from "@/components/ui/backheader";
import { Box } from "@/components/ui/box";
import { TextInput, View } from 'react-native';
import { Input } from "@/components/ui/input2";
import { Button } from "@/components/ui/button2";


export default function Screen() {
    const router = useRouter();
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
                        flex: 1,
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        zIndex: 2,
                        padding: 15,
                    }}
                >
                    <Input
                        keyboardType="numeric"
                        label="Matrícula"
                        placeholder="Digite aqui..."
                    />
                </View>     
                <View
                    style={{
                        flex: 2,
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Button
                        onPress={() => console.log('heloo')}
                        label="Continuar"
                        variant="wide"
                        style={{
                            width: "75%"
                        }}
                    >
                        
                    </Button>
                    <SVGPirateThinking
                        width={291}
                        height={367}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}
