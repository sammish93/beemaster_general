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
  const { userViewModel } = useContext(MobXProviderContext);
  const { hiveViewModel } = useContext(MobXProviderContext);
  const [isSwitchOn, setIsSwitchOn] = React.useState(
    hiveId === undefined
      ? userViewModel.notificationPreferences[type]
      : hiveViewModel.selectedHive.preferences[type]
  );

  const onToggleSwitch = () => {
    if (hiveId) {
      // TODO DB
      console.log(hiveId);
      hiveViewModel.toggleNotificationPreference(type);
    } else {
      // TODO DB
      userViewModel.toggleNotificationPreference(type);
      console.log("hello");
    }

    setIsSwitchOn(!isSwitchOn);
  };

  return <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />;
};

export default NotificationSwitchComponent;
