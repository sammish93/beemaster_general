import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useContext, useEffect } from "react";
import {
  MD3DarkTheme,
  MD3LightTheme,
  MD3Theme,
  PaperProvider,
  useTheme,
} from "react-native-paper";
import { MobXProviderContext, Provider, observer } from "mobx-react";
import exampleViewModel from "@/viewModels/ExampleViewModel";
import userViewModel from "@/viewModels/UserViewModel";
import { DrawerScreen } from "@/components/layouts/drawer";
import { Platform } from "react-native";
import { MaterialBottomTabsScreen } from "@/components/layouts/bottomBar";
import { LoginScreen } from "@/components/layouts/login";
import { customDarkTheme, customLightTheme } from "@/assets/themes";
import { useColorScheme } from "react-native";
import { useMaterial3Theme } from "@pchmn/expo-material3-theme";

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
  // The values must match the secondaryContainer values in assets/themes.
  colorScheme === "dark"
    ? (paperTheme.colors.secondaryContainer = "rgb(93, 63, 60)")
    : (paperTheme.colors.secondaryContainer = "rgb(255, 218, 214)");

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
  } else if (Platform.OS === "web" || Platform.OS === "android") {
    return (
      <Provider
        exampleViewModel={exampleViewModel}
        userViewModel={userViewModel}
      >
        <PaperProvider theme={paperTheme}>
          <BottomBarLayout theme={paperTheme} />
        </PaperProvider>
      </Provider>
    );
  }

  return (
    <Provider exampleViewModel={exampleViewModel} userViewModel={userViewModel}>
      <PaperProvider theme={paperTheme}>
        <DrawerLayout theme={paperTheme} />
      </PaperProvider>
    </Provider>
  );
};

export default observer(RootLayout);

export type DrawerLayoutProps = {
  theme: MD3Theme;
};

function DrawerLayout(props: DrawerLayoutProps) {
  return <DrawerScreen theme={props.theme} />;
}

function BottomBarLayout(props: DrawerLayoutProps) {
  return <MaterialBottomTabsScreen theme={props.theme} />;
}

function LoginLayout() {
  return <LoginScreen />;
}
