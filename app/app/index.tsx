import Layout from "@/components/Layout";
import SafeAreaView from "@/components/SafeAreaView";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();
  return (
    <SafeAreaView className="bg-background-500/50 h-full">
      <Layout>
        <VStack>
          <Heading size="3xl">UnBordo Raleway</Heading>
          <Input variant="outline">
            <InputField variant="solid" />
          </Input>
          <Button
            variant="solid"
            onPress={() => router.push("/(app)/(home)")}
            size="lg"
          >
            <ButtonText>Entrar</ButtonText>
          </Button>
        </VStack>
      </Layout>
    </SafeAreaView>
  );
}
