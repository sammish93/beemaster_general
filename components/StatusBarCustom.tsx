import { StatusBar } from "expo-status-bar";
import { Platform, useColorScheme } from "react-native";
import { useTheme } from "react-native-paper";

const StatusBarCustom = () => {
  const theme = useTheme();

  if (Platform.OS === "android") {
    return (
      <StatusBar
        backgroundColor={theme.colors.primaryContainer}
        style={useColorScheme() === "light" ? "dark" : "light"}
      />
    );
  }

  return <StatusBar style={useColorScheme()?.toString()} />;
};

export default StatusBarCustom;
