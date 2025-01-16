import { useState } from "react";
import { View, Pressable, Keyboard } from "react-native";

import Layout from "@/components/Layout";
import SafeAreaView from "@/components/SafeAreaView";
import { Button } from "@/components/ui/button2";
import { Input } from "@/components/ui/input2";
import { VStack } from "@/components/ui/vstack";
import { useRouter } from "expo-router";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { useKeyboardVisible } from "@/components/KeyboardListener";
import { BackHeader } from "@/components/ui/backheader";
import { Select } from "@/components/ui/select";

import SVGPirate from "../../assets/images/pirate";
import SVGSnowflake from "../../assets/images/snowflake-complete";
import SVGCheck from "../../assets/images/check";


function Link({ children }: { children: React.ReactNode }) {
    return <Text style={{
        color: "#0019BE",
    }}>{children}</Text>
}

function CheckBox({ onPress }: { onPress: (checked: boolean) => void }) {

    const [checked, setChecked] = useState(false);

    return (
        <View style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 3
        }}>
            <Pressable
                onPress={() => {
                    setChecked(!checked);
                    onPress(checked);
                }}
                style={{
                    borderRadius: 4,
                    width: 14,
                    aspectRatio: 1,
                    backgroundColor: "#D9D9D9",
                    borderWidth: 1,
                    borderColor: "#9B9797"
                }}
            >
                {checked ? <SVGCheck size={10} color="black" /> : ""}
            </Pressable>
        </View>
    )
}

function Option({ actual, label, set }: { actual: string, label: string, set: (value: string) => void }) {
    return <Pressable
        onPress={() => {
            set(label);
            Keyboard.dismiss();
        }}
        style={{
            height: 48,
            display: "flex",
            justifyContent: "center",
            paddingLeft: 16,
            backgroundColor: actual === label && "#F0F0F0" || "white",
        }}
    >
        <Text className="font-raleway" style={{
            color: "black",
            fontSize: 15,
        }}>{label}</Text>
    </Pressable>
}

function setCourseHideModel(setCourse: (value: string) => void, setVisible: (value: boolean) => void) {
    return (label: string) => {
        setCourse(label);
        setVisible(false);
    }
}

export default function Register() {
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);
    const [course, setCourse] = useState("");

    const keyboardVisible = useKeyboardVisible();

    return (
        <SafeAreaView>
            {
                keyboardVisible ||
                <Box style={{
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                    width: "100%",
                }}>
                    <SVGPirate />
                </Box>
            }

            <Layout className="h-full">
                <BackHeader onPress={() => router.back()} label="Criar conta" />
                <Box style={{
                    flex: 6,
                    display: "flex",
                    rowGap: 25,
                }}>
                    <VStack style={{
                        rowGap: 10,
                    }}>
                        <Text className="font-raleway">
                            Preencha seus dados e embarque conosco!
                        </Text>
                        <Input label="Nome" placeholder="Digite aqui..." />
                        <Input label="Matrícula" placeholder="Digite aqui..." />
                        <Select
                            modalVisible={modalVisible}
                            setModalVisible={setModalVisible}
                            label="Curso"
                            placeholder="Selecione..."
                            value={course}
                        >
                            <Option
                                label="Engenharias"
                                actual={course}
                                set={setCourseHideModel(setCourse, setModalVisible)}
                            />
                            <Option
                                actual={course}
                                set={setCourseHideModel(setCourse, setModalVisible)}
                                label="Engenharia de Software"
                            />
                            <Option
                                actual={course}
                                set={setCourseHideModel(setCourse, setModalVisible)}
                                label="Engenharia Aeroespacial"
                            />
                            <Option
                                actual={course}
                                set={setCourseHideModel(setCourse, setModalVisible)}
                                label="Engenharia Automotiva"
                            />
                            <Option
                                actual={course}
                                set={setCourseHideModel(setCourse, setModalVisible)}
                                label="Engenharia de Energia"
                            />
                            <Option
                                actual={course}
                                set={setCourseHideModel(setCourse, setModalVisible)}
                                label="Engenharia de Eletrônica"
                            />
                        </Select>
                        <Input secureTextEntry={true} label="Senha" placeholder="Digite aqui..." />
                    </VStack>
                    <HStack style={{
                        columnGap: 5,
                    }}>
                        <CheckBox onPress={() => console.log("lol")} />
                        <Text style={{
                            color: "black"
                        }}>
                            Aceito os <Link>
                                Termos de Uso
                            </Link> e <Link>
                                Políticas de Privacidade
                            </Link>
                        </Text>
                    </HStack>
                    <Button
                        onPress={() => router.push("/(register)/(complete)")}
                        label="Criar conta"
                    >
                        <SVGSnowflake
                            size={28}
                            style={{
                                position: "absolute",
                                height: "50%",
                                aspectRatio: 1,
                                left: "30%",
                            }}
                        />
                    </Button>                    
                </Box>
            </Layout>
        </SafeAreaView>
    );
}