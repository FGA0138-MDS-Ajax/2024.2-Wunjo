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

import Logo from "../assets/images/logo";
import Island from "../assets/images/island";
import Snowflake from "../assets/images/snowflake";

function LoginButton({onPress}: {onPress: () => void}) {
  return <Button
    variant="solid"
    onPress={onPress}
    size="lg"
    style={{
      height: 54,
      borderColor: "#0F2D89",
      position: "relative",
      borderRadius: 22.5
    }}
  >
    <ButtonText>Entrar</ButtonText>
    <Box style={{
        position: "absolute",
        right: 0,
        top: 0,
        width: "13.5%",
        height: "100%"
      }}>
        <Snowflake></Snowflake>
      </Box>
  </Button>
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
            // backgroundColor: "rgba(0, 0, 0, 0.05)",
            flex: 1.3,
          }}>
            <Logo/>
          </View>
          <Box style={{
            flex: 3,
            display: "flex",
            // backgroundColor: "rgba(0, 255, 0, 0.1)",
            rowGap: 24,
          }}>

            { /**
             * Student ID label and input.
             * */ }
            <View>
              <Text className="font-itim" style={{
                color: "black",
                fontSize: 15,
                marginBottom: 5,
              }}>Matrícula</Text>
              <Input variant="outline" style={{
                backgroundColor: "white",
                borderRadius: 8,
                height: 48,
              }}>
                <InputField className="font-raleway" placeholder="Digite aqui..." variant="solid" style={{
                  fontSize: 16,
                  paddingLeft: 20
                }}
                />
              </Input>
            </View>
            
            { /**
             * Password label and input.
             * */ }
            <View>
              <Text className="font-itim" style={{
                color: "black",
                fontSize: 15,
                marginBottom: 5,
              }}>Senha</Text>
              <Input variant="outline" style={{
                backgroundColor: "white",
                borderRadius: 8,
                height: 48,
              }}>
                <InputField className="font-raleway" placeholder="Digite aqui..." variant="solid" style={{
                  fontSize: 16,
                  paddingLeft: 20
                }}/>
              </Input>
            </View>

            { /** Go back to initial screen of router. */ }
            <LoginButton onPress={() => router.push("/")}/>

            { /**
             * Create account and forgot password links.
             */}
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
        <Island width={446} height={251}/>
      </Box>
    </SafeAreaView>
  );
}
