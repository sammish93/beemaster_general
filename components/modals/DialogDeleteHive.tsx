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
  return <DialogModal hideDialog={hideDialog} deleteHive={deleteHive} />;
};

const DialogModal = ({ hideDialog, deleteHive }: DialogDeleteHiveProps) => {
  const dynamicStyles = getStyles();
  const { userViewModel } = useContext(MobXProviderContext);
  const theme = useTheme();

  return (
    <Portal>
      <Dialog
        style={{ ...dynamicStyles.overlayContainer, alignSelf: "center" }}
        visible={true}
        onDismiss={hideDialog}
      >
        <Dialog.Icon icon="alert" />
        <Dialog.Title style={{ textAlign: "center" }}>
          {userViewModel.i18n.t("delete hive")}
        </Dialog.Title>
        <Dialog.ScrollArea
          style={{ borderBlockColor: theme.colors.primaryContainer }}
        >
          <ScrollView style={dynamicStyles.overlayScrollView}>
            <Text style={theme.fonts.bodyMedium}>
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
            style={{ backgroundColor: theme.colors.error }}
            textColor={theme.colors.onError}
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
