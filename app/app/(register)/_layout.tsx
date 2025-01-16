import { Stack } from "expo-router"

export default function Layout() {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(complete)" options={{ headerShown: false }} />
      <Stack.Screen name="(recover)" options={{ headerShown: false }} />
    </Stack>
  )
}