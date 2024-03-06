import * as React from "react";
import { Button, Dialog, Portal, Text } from "react-native-paper";
import { ScrollView, Platform } from "react-native";
import getStyles from "@/assets/styles";
import { useTheme } from "react-native-paper";
import { useContext } from "react";
import { MobXProviderContext } from "mobx-react";

interface DialogDeleteHiveProps {
  hideDialog: () => void;
  deleteHive: () => void;
}

const DialogDeleteHive = ({
  hideDialog,
  deleteHive,
}: DialogDeleteHiveProps) => {
  if (Platform.OS === "android" || Platform.OS === "ios") {
    return <MobileModal hideDialog={hideDialog} deleteHive={deleteHive} />;
  } else {
    return <WebModal hideDialog={hideDialog} deleteHive={deleteHive} />;
  }
};

const MobileModal = ({ hideDialog, deleteHive }: DialogDeleteHiveProps) => {
  const dynamicStyles = getStyles();
  const { userViewModel } = useContext(MobXProviderContext);
  const theme = useTheme();

  return (
    <Portal>
      <Dialog
        style={dynamicStyles.dialogStyleMobile}
        visible={true}
        onDismiss={hideDialog}
      >
        <Dialog.Icon icon="alert" />
        <Dialog.Title style={dynamicStyles.titleDialogGDPR}>
          {userViewModel.i18n.t("delete hive")}
        </Dialog.Title>
        <Dialog.ScrollArea>
          <ScrollView contentContainerStyle={dynamicStyles.scrollViewContent}>
            <Text style={dynamicStyles.listItem}>
              {userViewModel.i18n.t(
                "do you wish to delete this hive permanently"
              )}
            </Text>
          </ScrollView>
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button
            onPress={hideDialog}
            accessibilityLabel="Cancel the action"
            accessibilityHint="Close if you don't wish to delete the hive"
          >
            {userViewModel.i18n.t("cancel")}
          </Button>
          <Button
            onPress={deleteHive}
            accessibilityLabel="Delete hive"
            accessibilityHint="Delete to delete the hive permanently"
          >
            {userViewModel.i18n.t("delete")}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const WebModal = ({ hideDialog, deleteHive }: DialogDeleteHiveProps) => {
  const dynamicStyles = getStyles();
  const { userViewModel } = useContext(MobXProviderContext);
  const theme = useTheme();

  return (
    <Portal>
      <Dialog
        style={dynamicStyles.dialogStyle}
        visible={true}
        onDismiss={hideDialog}
      >
        <Dialog.Icon icon="alert" />
        <Dialog.Title style={dynamicStyles.titleDialogGDPR}>
          {userViewModel.i18n.t("delete hive")}
        </Dialog.Title>
        <Dialog.ScrollArea>
          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16 }}
          >
            <Text style={dynamicStyles.listItem}>
              {userViewModel.i18n.t(
                "do you wish to delete this hive permanently"
              )}
            </Text>
          </ScrollView>
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button
            onPress={hideDialog}
            accessibilityLabel="Cancel the action"
            accessibilityHint="Close if you don't wish to delete the hive"
          >
            {userViewModel.i18n.t("cancel")}
          </Button>
          <Button
            onPress={deleteHive}
            accessibilityLabel="Delete hive"
            accessibilityHint="Delete to delete the hive permanently"
          >
            {userViewModel.i18n.t("delete")}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DialogDeleteHive;
