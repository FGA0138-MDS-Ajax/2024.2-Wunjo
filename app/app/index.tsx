import Layout from "@/components/Layout";
import SafeAreaView from "@/components/SafeAreaView";
import { Button } from "@/components/ui/button2";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input2";
import { VStack } from "@/components/ui/vstack";
import { useRouter } from "expo-router";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { View } from "react-native";

import Logo from "../assets/images/logo";
import Island from "../assets/images/island";
import Snowflake from "../assets/images/snowflake";

export default function Screen() {
    const router = useRouter();

    return (
        <SafeAreaView style={{
            backgroundColor: "#F5F6FA"
        }}>
            <Layout>
                <View className="h-full" style={{
                }}>
                    <View className="flex items-center justify-center" style={{
                        // backgroundColor: "rgba(0, 0, 0, 0.05)",
                        flex: 1.3,
                    }}>
                        <Logo />
                    </View>
                    <Box style={{
                        flex: 3,
                        display: "flex",
                        // backgroundColor: "rgba(0, 255, 0, 0.1)",
                        rowGap: 24,
                    }}>
                        <Input keyboardType="numeric" label="Matrícula" placeholder="Digite aqui..." />
                        <Input label="Senha" placeholder="Digite aqui..." />

                        <Button
                            label="Entrar"
                            onPress={() => router.push("/(app)/(home)")}
                        >
                            <Snowflake
                                style={{
                                    position: "absolute",
                                    right: 0,
                                    top: 0,
                                    width: "13.5%",
                                    height: "100%"
                                }}
                            />
                        </Button>

                        <View style={{
                            // backgroundColor: "rgba(0, 0, 0, 0.05)"
                        }}>
                            <Text onPress={() => router.push("/(register)")} style={{
                                color: "#703111",
                                textAlign: "center",
                                textDecorationLine: "underline",
                                fontSize: 12,
                            }}>Criar conta</Text>
                            <Text onPress={() => router.push("/(register)/(recover)")} style={{
                                textAlign: "center",
                                textDecorationLine: "underline",
                                fontSize: 12,
                            }}>Esqueci minha senha</Text>
                        </View>
                    </Box>
                </View>
            </Layout>
            <Box style={{
                position: "absolute",
                flex: 1,
                left: -25,
                bottom: 0,
                width: "100%",
                height: "25%"
            }}>
                <Island width={446} height={251} />
            </Box>
        </SafeAreaView>
    );
}
