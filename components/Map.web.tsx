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
