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
                marginTop: "50%",
                width: "100%",
                padding: 15,
            }}>
                <Text style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    marginVertical: 20
                }}>
                    Matrícula
                </Text>
                <Input label="Matrícula" placeholder="Digite aqui..."/>
            </View>


            {/* Box com a imagem do pirata */}
            <Box style={{
                position: "absolute",
                bottom: 0,
            }}>
                <SVGPirateThinking width={291} height={367}/>
            </Box>
        </SafeAreaView>
    );
}
