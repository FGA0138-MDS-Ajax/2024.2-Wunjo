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

export default function Register() {
  const router = useRouter();
  return (
    <SafeAreaView style={{backgroundColor: "red", height: "100%"}}>
      <Text>Loldd</Text>
    </SafeAreaView>
  );
}