import { useRouter } from "expo-router";
import { Text } from "@/components/ui/text";

import { Complete } from "../../(complete)/index"

export default function Screen() {
    const router = useRouter();
    return (
        <Complete onPress={() => router.push("..")}>
            <Text className="font-raleway"
                style={{
                    color: "#173CAC",
                    fontSize: 36,
                    lineHeight: 44,
                    textAlign: "center"
                }}
            >Bem-vindo à bordo novamente</Text>
        </Complete>
    );
}