import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Screen() {

  const router = useRouter();

  return <View
    style={{
      height: "100%",
      width: "100%",
    }}
  >

    <Pressable
      style={{
        marginTop: "auto",
        backgroundColor: 'blue'
      }}
      onPress={() => router.push("/(app)/(home)/(post)/(tag)")}
    >
      <Text>Edit question!</Text>
    </Pressable>
  </View>
}