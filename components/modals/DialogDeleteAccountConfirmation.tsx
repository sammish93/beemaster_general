import React, { useContext } from "react";
import { Dialog, Portal, Button, Text, useTheme } from "react-native-paper";
import { MobXProviderContext } from "mobx-react";

interface DialogDeleteConfirmationProps {
  isVisible: boolean;
  onDismiss: () => void;
  onConfirm: () => void;
}
const DialogDeleteAccountConfirmation = ({
  isVisible,
  onDismiss,
  onConfirm,
}: DialogDeleteConfirmationProps) => {
  const theme = useTheme();
  const { userViewModel } = useContext(MobXProviderContext);

  return (
    <Portal>
      <Dialog visible={isVisible} onDismiss={onDismiss}>
        <Dialog.Title style={{ textAlign: "center" }}>
          {userViewModel.i18n.t("Delete Account Confirmation")}
        </Dialog.Title>
        <Dialog.Content>
          <Text style={theme.fonts.titleMedium}>
            {userViewModel.i18n.t(
              "Are you sure you want to delete your account?"
            )}
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>{userViewModel.i18n.t("cancel")}</Button>
          <Button onPress={onConfirm}>{userViewModel.i18n.t("delete")}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DialogDeleteAccountConfirmation;