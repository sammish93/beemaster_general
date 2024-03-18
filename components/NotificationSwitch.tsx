import * as React from "react";
import { Switch, useTheme } from "react-native-paper";
import { Text, View } from "react-native";
import { MobXProviderContext } from "mobx-react";
import { useContext } from "react";
import { VerticalSpacer } from "./Spacers";
import { NotificationType } from "@/constants/Notifications";

interface NotificationSwitchProps {
  type: NotificationType;
  hiveId?: string;
}

const NotificationSwitchComponent = ({
  type,
  hiveId,
}: NotificationSwitchProps) => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const { userViewModel } = useContext(MobXProviderContext);
  const onToggleSwitch = () => {
    // TODO Do something here.
    setIsSwitchOn(!isSwitchOn);
  };
  const paperTheme = useTheme();

  return <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />;
};

export default NotificationSwitchComponent;
