import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    Pressable,
    Keyboard
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input2";
import { Button } from "@/components/ui/button2";
import { BackHeader } from "@/components/ui/backheader";
import { CheckBox } from "@/components/ui/checkbox";
import Binoculars from "@/assets/images/Binoculars";
import { router } from "expo-router";

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

export default function Screen() {
    const navigation = useNavigation();
    const [disciplina, setDisciplina] = useState("");
    const [dificuldade, setDificuldade] = useState<"Baixa" | "Média" | "Alta" | "">("");
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <SafeAreaView style={{
            flex: 1,
            padding: 20,
            height: "100%",
            alignItems: "center"
        }}>
            {/* Botão de voltar */}
            <BackHeader
                onPress={() => navigation.goBack()}
                label=""
            ></BackHeader>

            {/* Título */}
            <Text
                style={{
                    flex: 1,
                    fontSize: 28,
                    color: "#8B0000",
                    textAlign: "center",
                    //backgroundColor: "red",
                }}
                className="font-itim"
                >
                Filtre sua caça ao tesouro!
            </Text>

            <View
                style={{
                    flex: 4,
                    width: "100%",
                    //backgroundColor: "#8B0000",
                    flexDirection: "column",
                    rowGap: 20,
                    alignItems: "center"
                }}
            >
                <Input
                    label="Disciplina"
                    placeholder="Digite aqui..."
                />

                {/* Colocar Dificuldade */}
                <View>
                    <Select
                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}
                        label="Dificuldade"
                        placeholder="Selecione..."
                        value={dificuldade}
                        modalHeight={3}
                    >
                        <Option
                            actual={dificuldade}
                            set={() => {
                                setDificuldade("Baixa");
                                setModalVisible(false);
                            }}
                            label="Baixa"
                        />
                        <Option
                            actual={dificuldade}
                            set={() => {
                                setDificuldade("Média");
                                setModalVisible(false);
                            }}
                            label="Média"
                        />
                        <Option
                            actual={dificuldade}
                            set={() => {
                                setDificuldade("Alta");
                                setModalVisible(false);
                            }}
                            label="Alta"
                        />
                    </Select>
                </View>
                <View
                    style={{
                        //backgroundColor: "red",
                        flexDirection: "row",
                        alignSelf: "flex-start",
                    }}
                >
                    <CheckBox
                        onPress={(checked) => console.log(checked)}
                    />
                    <Text
                        className="font-raleway"
                        style={{
                            paddingLeft: 5,
                            color: "black",
                            fontSize: 12,
                        }}
                    >Urgente</Text>
                </View>

                {/* Botão Filtrar */}
                <Button
                    onPress={() => router.back()}
                    label="Filtrar"
                    style={{
                        width: "90%"
                    }}
                />
            </View>
            <Binoculars
                style={{
                    // backgroundColor: "red",
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                }}
            />
        </SafeAreaView>
    );
}