import Layout from "@/components/Layout";
import SafeAreaView from "@/components/SafeAreaView";
import { Button, ButtonText } from "@/components/ui/button";
import { Button as ReactButton } from "react-native";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { useRouter } from "expo-router";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { View } from "react-native";
import { useState } from "react";
import { HStack } from "@/components/ui/hstack";

import Pirate from "../../assets/images/pirate";
import SVGBackButton from "../../assets/images/back-button";
import SVGCheck from "../../assets/images/check";


function Link({children}: {children: React.ReactNode}) {
    return <Text style={{
        color: "#0019BE",
    }}>{children}</Text>
}

function CheckBox({onPress}: {onPress: (checked: boolean) => void}) {

    const [checked, setChecked] = useState(true);

    return (
        <View style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 3
        }}>
            <Button
                size="free"
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
                {checked ? <SVGCheck size={10} color="black"/> : ""}
            </Button>
        </View>
    )
}

function BackButton({onPress}: {onPress: () => void}) {
    return <Button
        variant="solid"
        size="lg"
        onPress={onPress}
        style={{
            backgroundColor: "#DDE4EE",
            borderRadius: 12,
            position: "absolute",
            width: 36,
            aspectRatio: 1,
            left: 0,
        }}
    >
        <SVGBackButton/>
    </Button>
}

function LabelInput({label, placeholder}: {label: string, placeholder: string}) {
    return <VStack style={{
        rowGap: 2,
        //backgroundColor: "rgba(0, 0, 0, 0.1)",
    }}>
        <Text className="font-itim" style={{
            color: "black",
            fontSize: 15,
        }}>{label}</Text>
        <Input variant="outline" style={{
                backgroundColor: "white",
                borderRadius: 8,
                height: 48,
              }}>
            <InputField className="font-raleway" placeholder={placeholder} style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#D1D5DB",
                height: 48,
                paddingLeft: 16,
            }}/>
        </Input>
    </VStack>
}

export default function Login() {
  const router = useRouter();
  return (
    <SafeAreaView>
    <Layout>
      <View className="h-full" style={{
      }}>
        <View className="flex items-center justify-center" style={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          position: "relative",
          }}>
            <BackButton onPress={() => router.push("..")}/>
            <Text style={{color: "#1E293B"}} className="font-itim text-xl">Criar conta</Text>
          </View>
          <Box style={{
            flex: 6,
            display: "flex",
            // backgroundColor: "rgba(0, 0, 0, 0.1)",
            rowGap: 6,
          }}>
            <Text className="font-raleway">Preencha seus dados e embarque conosco!</Text>
            <VStack style={{
                rowGap: 10,
                // backgroundColor: "rgba(0, 0, 0, 0.1)",
            }}>
                <LabelInput label="Nome" placeholder="Digite aqui..."/>
                <LabelInput label="Matrícula" placeholder="Digite aqui..."/>
                <LabelInput label="Curso" placeholder="Selecione..."/>
                <LabelInput label="Senha" placeholder="Digite aqui..."/>
            </VStack>
            <HStack style={{
                marginTop: 25,
                // backgroundColor: "rgba(0, 0, 0, 0.1)",
                columnGap: 5,
            }}>
                <CheckBox onPress={() => console.log("lol")}/>
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
          </Box>
        </View>
      </Layout>
      <Box style={{
        position: "absolute",
        left: 0,
        bottom: 0,
        width: "100%",
      }}>
        <Pirate/>
      </Box>
    </SafeAreaView>
  );
}