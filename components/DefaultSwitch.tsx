import * as React from "react";
import { Switch, useTheme } from "react-native-paper";
import { Text, View } from "react-native";
import { MobXProviderContext } from "mobx-react";
import { useContext } from "react";
import { VerticalSpacer } from "./Spacers";
import styles from "@/assets/styles";

type Type = "mobile" | "sms" | "email";
interface PermissionSwitchProps {
  type: Type;
}
const DefaultSwitchComponent = ({ type }: PermissionSwitchProps) => {
  const { userViewModel } = useContext(MobXProviderContext);
  const paperTheme = useTheme();

  const getState = () => {
    switch (type) {
      case "mobile":
        return userViewModel.mobileNotifications;
      case "sms":
        return userViewModel.smsNotifications;
      case "email":
        return userViewModel.emailNotifications;
      default:
        return false;
    }
  };

  const [isSwitchOn, setIsSwitchOn] = React.useState(getState());

  const updateState = () => {
    switch (type) {
      case "mobile":
        return userViewModel.toggleMobileNotifications();
      case "sms":
        return userViewModel.toggleSmsNotifications();
      case "email":
        return userViewModel.toggleEmailNotifications();
      default:
        return false;
    }
  };

  const translateType = (type: Type): string => {
    switch (type) {
      case "mobile":
        return userViewModel.i18n.t("mobile");
      case "sms":
        return userViewModel.i18n.t("SMS");
      case "email":
        return userViewModel.i18n.t("email");
      default:
        return type;
    }
  };

  return (
    <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
      <View
        style={{
          ...styles(paperTheme).settingsSubitem,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text
          style={[
            paperTheme.fonts.bodyLarge,
            { marginRight: 10, color: paperTheme.colors.onSurface },
          ]}
        >
          {translateType(type)}
        </Text>
        <Switch
          value={getState()}
          disabled={type === "email" || type === "sms"}
          onValueChange={() => {
            setIsSwitchOn(!isSwitchOn);
            updateState();
          }}
        />
      </View>
      <VerticalSpacer size={6} />
    </View>
  );
};

export default DefaultSwitchComponent;
