import Layout from "@/components/Layout";
import SafeAreaView from "@/components/SafeAreaView";
import { Button } from "@/components/ui/button2";
import { Pressable, Button as ReactButton } from "react-native";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { useRouter, useNavigation } from "expo-router";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { View } from "react-native";
import { useState } from "react";

import SVGArrow from "@/assets/images/arrow";
import SVGPirateIsland from "@/assets/images/pirate-island";

export function Complete({children, onPress}: {children?: React.ReactNode, onPress: () => void}) {
    return (
        <SafeAreaView>
            <Box
                style={{
                    // backgroundColor: "red",
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "50%",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "flex-end"
                }}
            >
                <SVGPirateIsland style={{
                    // backgroundColor: "blue",
                    bottom: -10
                }} />
            </Box>
            <VStack
                style={{
                    // backgroundColor: "yellow",
                    height: "100%"
                }}
            >
                <Box style={{
                    // backgroundColor: "red",
                    flex: 2.25,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    {children}
                </Box>
                <Box style={{
                    // backgroundColor: "green",
                    flex: 1,
                    display: "flex",
                    alignItems: "flex-end",
                }}>
                    <Button
                        variant="circle"
                        onPress={onPress}
                        style={{
                            margin: 20,
                        }}
                    >
                        <SVGArrow size={24} />
                    </Button>
                </Box>
            </VStack>
        </SafeAreaView>
    );
}

export default function Screen() {
    const router = useRouter();
    return <Complete onPress={() => {
        router.back()
        router.back()
    }}>
        <View
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                rowGap: 25,
            }}
        >
            <Text style={{
                fontSize: 36,
                lineHeight: 36,
                color: "#173CAC"
            }} className="font-itim">
                Quase lá!
            </Text>
            <Text style={{
                fontSize: 16,
                textAlign: "center",
                maxWidth: "75%",
            }} className="font-raleway-bold">
                Enviamos um pirata até seu e-mail, verifique por lá.
                {"\n"}
                Após isso seu cadastro será liberado!
            </Text>
        </View>
    </Complete>
}