import Layout from "@/components/Layout";
import SafeAreaView from "@/components/SafeAreaView";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { useRouter } from "expo-router";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { View } from "react-native";

import Pirate from "../../assets/images/pirate";
import SVGBackButton from "../../assets/images/back-button";

function BackButton({onPress}: {onPress: () => void}) {
    return <Button
        variant="solid"
        size="lg"
        onPress={onPress}
        style={{
            backgroundColor: "#EBEEF5",
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
        backgroundColor: "rgba(0, 0, 0, 0.1)",
    }}>
        <Text className="font-itim" style={{
            color: "#1E293B",
            fontSize: 12,
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
    <SafeAreaView style={{
      backgroundColor: "#F5F6FA"
    }}>
    <Layout>
      <View className="h-full" style={{
      }}>
        <View className="flex items-center justify-center" style={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          position: "relative"
          }}>
            <BackButton onPress={() => router.push("..")}/>
            <Text style={{color: "#1E293B"}} className="font-itim text-xl">Criar conta</Text>
          </View>
          <Box style={{
            flex: 6,
            display: "flex",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            rowGap: 24,
          }}>
            <Text style={""}>Preencha seus dados e embarque conosco!</Text>
            <VStack style={{rowGap: 10, backgroundColor: "rgba(0, 0, 0, 0.1)",}}>
                <LabelInput label="Nome" placeholder="Digite aqui..."/>
                <LabelInput label="Matrícula" placeholder="Digite aqui..."/>
                <LabelInput label="Curso" placeholder="Selecione..."/>
                <LabelInput label="Senha" placeholder="Digite aqui..."/>
            </VStack>
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