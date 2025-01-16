import Layout from "@/components/Layout";
import SafeAreaView from "@/components/SafeAreaView";
import { useRouter } from "expo-router";
import { Text } from "@/components/ui/text";
import SVGPirateThinking from "@/assets/images/pirate-thinking";
import { BackHeader } from "@/components/ui/backheader";
import { Box } from "@/components/ui/box";
import { TextInput, View } from 'react-native';
import { Input } from "@/components/ui/input2";


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
                padding: 15,
                flex: 5,
                backgroundColor: "red",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",

            }}>
                <Input label="Matrícula" placeholder="Digite aqui..."/>
                <SVGPirateThinking
                    style={{
                        position: "absolute",
                        bottom: 0
                    }}
                    width={291}
                    height={367}/>
            </View>
        </SafeAreaView>
    );
}
