import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useContext, useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import { MobXProviderContext, Provider, observer } from "mobx-react";
import exampleViewModel from "@/viewModels/ExampleViewModel";
import userViewModel from "@/viewModels/UserViewModel";
import { DrawerScreen } from "@/components/layouts/drawer";
import { Platform } from "react-native";
import { MaterialBottomTabsScreen } from "@/components/layouts/bottomBar";
import { LoginScreen } from "@/components/layouts/login";
import customTheme from "@/assets/theme";

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
  const { viewModel } = useContext(MobXProviderContext);

  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
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
        <PaperProvider theme={customTheme}>
          <LoginLayout />
        </PaperProvider>
      </Provider>
    );
  } else if (Platform.OS === "web") {
    return (
      <Provider
        exampleViewModel={exampleViewModel}
        userViewModel={userViewModel}
      >
        <PaperProvider theme={customTheme}>
          <BottomBarLayout />
        </PaperProvider>
      </Provider>
    );
  }

  return (
    <Provider exampleViewModel={exampleViewModel} userViewModel={userViewModel}>
      <PaperProvider theme={customTheme}>
        <DrawerLayout />
      </PaperProvider>
    </Provider>
  );
};

export default observer(RootLayout);

function DrawerLayout() {
  return <DrawerScreen />;
}

function BottomBarLayout() {
  return <MaterialBottomTabsScreen />;
}

function LoginLayout() {
  return <LoginScreen />;
}
