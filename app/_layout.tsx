import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { MD3Theme, PaperProvider } from "react-native-paper";
import { Provider, observer } from "mobx-react";
import exampleViewModel from "@/viewModels/ExampleViewModel";
import userViewModel from "@/viewModels/UserViewModel";
import { DrawerScreen } from "@/components/layouts/drawer";
import { Dimensions, Platform, useColorScheme, Text } from "react-native";
import { MaterialBottomTabsScreen } from "@/components/layouts/bottomBar";
import { LoginScreen } from "@/components/layouts/login";
import { customDarkTheme, customLightTheme } from "@/assets/themes";
import { ScreenHeight, ScreenWidth } from "@/constants/Dimensions";

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

// Retrieves initial screen dimensions.
const windowDimensions = Dimensions.get("window");
const screenDimensions = Dimensions.get("screen");

const RootLayout = () => {
  // State to hold both the screen and window dimensions. Window can be used for web.
  const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
  });

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

  // Dynamically updates both the screen and window dimensions when they change.
  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      "change",
      ({ window, screen }) => {
        setDimensions({ window, screen });
      }
    );
    return () => subscription?.remove();
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

  return (
    <Provider exampleViewModel={exampleViewModel} userViewModel={userViewModel}>
      <PaperProvider theme={paperTheme}>
        {(() => {
          if (userViewModel.userId === "") {
            return <LoginLayout />;
          } else if (
            (Platform.OS === "ios" || Platform.OS === "android") &&
            dimensions.screen.width < ScreenWidth.Compact
          ) {
            return <BottomBarLayout theme={paperTheme} mode={colorScheme} />;
          } else {
            return <DrawerLayout theme={paperTheme} mode={colorScheme} />;
          }
        })()}
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
