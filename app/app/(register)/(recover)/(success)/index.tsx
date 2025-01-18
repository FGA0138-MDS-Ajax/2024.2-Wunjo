import { useRouter } from "expo-router";
import { Text } from "@/components/ui/text";

import { Complete } from "../../(complete)/index"

export default function Screen() {
    const router = useRouter();
    return (
        <Complete onPress={() => {
            while (router.canGoBack())
                router.back();
        }}>
            <Text className="font-itim"
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