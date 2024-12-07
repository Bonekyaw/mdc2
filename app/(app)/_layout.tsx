import { Text } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, Redirect } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useCallback } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { useSession } from "@/providers/ctx";
import { useAppDispatch } from "@/hooks/useRedux";
import { fetchRequiredInfo } from "@/services/redux/requiredInfoSlice";
import Toast from "react-native-root-toast";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: "(root)",
};

export default function AppLayout() {
  const { session, isLoading, signOut } = useSession();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const dispatch = useAppDispatch();
  const fetchInfo = async () => {
    try {
      // signOut(); // For only development
      await dispatch(fetchRequiredInfo()).unwrap();
    } catch (error: any) {
      if (error === "Error_Attack") {
        // Error_Attack - Must Log Out
        Toast.show("Long time no see. Please Login again.", {
          duration: Toast.durations.LONG,
        });
        signOut();
      } else Toast.show(error, { duration: Toast.durations.LONG });
    } finally {
      SplashScreen.hideAsync();
    }
  };

  // useEffect(() => {
  //   if (loaded) {
  //     fetchInfo();
  //     SplashScreen.hideAsync();
  //   }
  // }, [loaded]);

  useEffect(() => {
    fetchInfo();
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text style={{ fontSize: 24 }}>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    return <Redirect href="/login" />;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
