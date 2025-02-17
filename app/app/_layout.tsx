import '@/global.css';
import '@/helpers/zod-mapper';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Itim_400Regular } from '@expo-google-fonts/itim';
import {
  Raleway_400Regular,
  Raleway_400Regular_Italic,
  Raleway_500Medium,
  Raleway_500Medium_Italic,
  Raleway_600SemiBold,
  Raleway_600SemiBold_Italic,
  Raleway_700Bold,
  Raleway_700Bold_Italic,
  Raleway_800ExtraBold,
  Raleway_800ExtraBold_Italic,
} from '@expo-google-fonts/raleway';
import { useFonts } from 'expo-font';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/hooks/react-query';
import UnBordoApp from '@/contexts/AppContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Itim_400Regular,
    Raleway_400Regular,
    Raleway_400Regular_Italic,
    Raleway_500Medium,
    Raleway_500Medium_Italic,
    Raleway_600SemiBold,
    Raleway_600SemiBold_Italic,
    Raleway_700Bold,
    Raleway_700Bold_Italic,
    Raleway_800ExtraBold,
    Raleway_800ExtraBold_Italic,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded || !!error) {
    return null;
  }

  return (
    <UnBordoApp.Provider>
      <GluestackUIProvider mode="light">
        <QueryClientProvider client={queryClient}>
          <Stack initialRouteName="index">
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(app)" options={{ headerShown: false }} />
            <Stack.Screen name="(register)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </QueryClientProvider>
      </GluestackUIProvider>
    </UnBordoApp.Provider>
  );
}
