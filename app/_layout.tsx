import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { MD3Theme, PaperProvider } from "react-native-paper";
import { Provider, observer } from "mobx-react";
import exampleViewModel from "@/viewModels/ExampleViewModel";
import userViewModel from "@/viewModels/UserViewModel";
import { DrawerScreen } from "@/components/layouts/drawer";
import { Platform, useColorScheme } from "react-native";
import { MaterialBottomTabsScreen } from "@/components/layouts/bottomBar";
import { LoginScreen } from "@/components/layouts/login";
import { customDarkTheme, customLightTheme } from "@/assets/themes";
import { StatusBar } from "expo-status-bar";
import React from "react";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "home",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const colorScheme = useColorScheme();
  // Android 12 fix:
  //const { theme } = useMaterial3Theme();

  // Decides which colour scheme to use.
  const paperTheme =
    colorScheme === "dark" ? customDarkTheme : customLightTheme;

  // Bug fix for react native bottom bar and paper/material 3 compatibility in dark mode.
  paperTheme.colors.secondaryContainer = paperTheme.colors.surfaceDisabled;

  // Loading in fonts to use in the application.
  const [loaded, error] = useFonts({
    ChelaOne: require("../assets/fonts/ChelaOne-Regular.ttf"),
    PatrickHand: require("../assets/fonts/PatrickHand-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  if (userViewModel.userId === "") {
    return (
      <Provider
        exampleViewModel={exampleViewModel}
        userViewModel={userViewModel}
      >
        <PaperProvider theme={paperTheme}>
          <LoginLayout />
        </PaperProvider>
      </Provider>
    );
  } else if (
    Platform.OS === "web" ||
    Platform.OS === "ios" ||
    Platform.OS === "android"
  ) {
    return (
      <Provider
        exampleViewModel={exampleViewModel}
        userViewModel={userViewModel}
      >
        <PaperProvider theme={paperTheme}>
          <BottomBarLayout theme={paperTheme} mode={colorScheme} />
        </PaperProvider>
      </Provider>
    );
  }

  return (
    <Provider exampleViewModel={exampleViewModel} userViewModel={userViewModel}>
      <PaperProvider theme={paperTheme}>
        <DrawerLayout theme={paperTheme} mode={colorScheme} />
      </PaperProvider>
    </Provider>
  );
};

export default observer(RootLayout);

export type LayoutProps = {
  theme: MD3Theme;
  mode: string;
};

function DrawerLayout(props: LayoutProps) {
  return <DrawerScreen theme={props.theme} mode={props.mode} />;
}

function BottomBarLayout(props: LayoutProps) {
  return <MaterialBottomTabsScreen theme={props.theme} mode={props.mode} />;
}

function LoginLayout() {
  return <LoginScreen />;
}
