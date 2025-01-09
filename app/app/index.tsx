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
            <Text style={{
              backgroundColor: "rgba(0, 0, 0, 0.05)",
              width: "60%",
              height: "50%",
              textAlign: "center"
            }}>Logo</Text>
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
              <Text style={{
                color: "black",
                fontSize: 15,
                marginBottom: 5,
              }}>Matrícula</Text>
              <Input variant="outline" style={{
                backgroundColor: "white",
                borderRadius: 8,
                height: 48,
              }}>
                <InputField variant="solid" />
              </Input>
            </View>
            
            { /**
             * Password label and input.
             * */ }
            <View>
              <Text style={{
                color: "black",
                fontSize: 15,
                marginBottom: 5,
              }}>Senha</Text>
              <Input variant="outline" style={{
                backgroundColor: "white",
                borderRadius: 8,
                height: 48,
              }}>
                <InputField variant="solid" />
              </Input>
            </View>

            { /**
             * Login button.
             */}
            <Button
              variant="solid"
              onPress={() => router.push("/(app)/(home)")}
              size="lg"
              style={{
                height: 55,
              }}
            >
              <ButtonText>Entrar</ButtonText>
            </Button>

            { /**
             * Create account and forgot password links.
             */}
            <View style={{
                // backgroundColor: "rgba(0, 0, 0, 0.05)"
              }}>
              <Text style={{
                color: "#703111",
                textAlign: "center",
                textDecorationLine: "underline",
                fontSize: 12,
              }}>Criar conta</Text>
              <Text style={{
                textAlign: "center",
                textDecorationLine: "underline",
                fontSize: 12,
              }}>Esqueci minha senha</Text>
            </View>
          </Box>
        </View>
      </Layout>
      <Box style={{
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        position: "absolute",
        flex: 1,
        left: 0,
        bottom: 0,
        width: "100%",
        height: "25%"
      }}>
        <Text>Image in bottom</Text>
      </Box>
    </SafeAreaView>
  );
}
