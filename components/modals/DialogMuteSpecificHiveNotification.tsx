import * as React from "react";
import { Button, Dialog, Portal, Text } from "react-native-paper";
import { ScrollView, Platform } from "react-native";
import styles from "@/assets/styles";
import { useTheme } from "react-native-paper";
import { useContext } from "react";
import { MobXProviderContext } from "mobx-react";
import { HiveNotification } from "@/models/notification";
import { HiveModel } from "@/models/hiveModel";

interface DialogMuteSpecificHiveNotificationProps {
  notification: HiveNotification;
  hideDialog: () => void;
  muteHive: () => void;
}

const DialogMuteSpecificHiveNotification = ({
  notification,
  hideDialog,
  muteHive,
}: DialogMuteSpecificHiveNotificationProps) => {
  return (
    <DialogModal
      hideDialog={hideDialog}
      muteHive={muteHive}
      notification={notification}
    />
  );
};

const DialogModal = ({
  notification,
  hideDialog,
  muteHive,
}: DialogMuteSpecificHiveNotificationProps) => {
  const { userViewModel } = useContext(MobXProviderContext);
  const { hiveViewModel } = useContext(MobXProviderContext);
  const theme = useTheme();
  const hive: HiveModel = hiveViewModel.getHiveFromId(notification.hiveId);

  return (
    <Portal>
      <Dialog
        style={{ ...styles(theme).overlayContainer, alignSelf: "center" }}
        visible={true}
        onDismiss={hideDialog}
      >
        <Dialog.Icon icon="alert" />
        <Dialog.Title style={{ textAlign: "center" }}>
          {userViewModel.i18n.t("mute notification")}
        </Dialog.Title>
        <Dialog.ScrollArea
          style={{ borderBlockColor: theme.colors.primaryContainer }}
        >
          <ScrollView style={styles(theme).overlayScrollView}>
            <Text style={theme.fonts.bodyMedium}>
              {userViewModel.i18n.t("mute_notifications", {
                notificationType: userViewModel.i18n.t(
                  notification.notificationType
                ),
                hiveName: hive.name,
              })}
            </Text>
          </ScrollView>
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button
            onPress={hideDialog}
            accessibilityLabel="Cancel the action"
            accessibilityHint="Close if you don't wish to mute the hive"
          >
            {userViewModel.i18n.t("cancel")}
          </Button>
          <Button
            onPress={muteHive}
            accessibilityLabel="Confirm the action"
            accessibilityHint="Confirm if you wish to mute the specific notification for the hive"
          >
            {userViewModel.i18n.t("confirm")}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DialogMuteSpecificHiveNotification;
