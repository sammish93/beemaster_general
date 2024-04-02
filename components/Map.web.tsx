import { MobXProviderContext } from "mobx-react";
import { useContext } from "react";
import { Text, useTheme } from "react-native-paper";

const Map = () => {
  const theme = useTheme();
  const { userViewModel } = useContext(MobXProviderContext);

  return (
    <Text
      style={{
        ...theme.fonts.bodyLarge,
        textAlign: "center",
      }}
    >
      {userViewModel.i18n.t("maps are only available")}
    </Text>
  );
};

export default Map;
