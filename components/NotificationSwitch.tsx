import * as React from "react";
import { Switch, useTheme } from "react-native-paper";
import { Text, View } from "react-native";
import { MobXProviderContext } from "mobx-react";
import { useContext } from "react";
import { VerticalSpacer } from "./Spacers";
import { NotificationType } from "@/constants/Notifications";
import { reaction } from "mobx";

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
      console.log(hiveId);
      hiveViewModel.toggleNotificationPreference(type);
    } else {
      userViewModel.toggleNotificationPreference(type);
      console.log("hello");
    }

    setIsSwitchOn(!isSwitchOn);
  };

  React.useEffect(() => {
    const dispose = reaction(
      () => userViewModel.notificationPreferences[type],
      (newPreference) => {
        setIsSwitchOn(newPreference);
      }
    );

    return () => dispose();
  }, [userViewModel, type]);

  return (
    <Switch
      value={isSwitchOn}
      onValueChange={onToggleSwitch}
      disabled={type === NotificationType.CustomReminder}
    />
  );
};

export default NotificationSwitchComponent;
