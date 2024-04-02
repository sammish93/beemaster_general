import { Platform } from "react-native";
import MapView from "@preflower/react-native-web-maps";
import { Text, useTheme } from "react-native-paper";

const Map = () => {
  const theme = useTheme();

  return (
    <Text
      style={{
        ...theme.fonts.bodyLarge,
        textAlign: "center",
      }}
    >
      Maps only available on mobile devices.
    </Text>
  );
};

export default Map;
