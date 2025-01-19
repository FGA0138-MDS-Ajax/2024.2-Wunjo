import { Button } from "@/components/ui/button2";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import SVGPirateWoman from "@/assets/images/PirateWoman";

export default function Screen() {

    const router = useRouter();

    return <View
        style={{
            height: "100%",
        }}
    >
        <View
            style={{
                padding: "10%",
                rowGap: 50,
                justifyContent: "flex-end",
                alignItems: "center",
                //backgroundColor: "red",
                flex: 1,
            }}
        >
            <Text
                className="font-itim"
                style={{
                    fontSize: 30,
                    color: "#703111",
                    textAlign: "center"
                }}
            >
                Pergunta publicada com sucesso!
            </Text>
            <Text
                className="font-raleway"
                style={{
                    textAlign: "center",
                    fontSize: 18
                }}
            >
                Em breve um pirata irá atrás do tesouro!
            </Text>
            <Button
                onPress={() => {
                    router.back();
                    router.back();
                    router.back();
                }}
                label="Continuar"
            />
        </View>
        <View
            style={{
                flex: 1,
                justifyContent: "flex-end",
                alignItems: "center",
                marginBottom: -15
            }}
        >
            <SVGPirateWoman
            />
        </View>
    </View>

}