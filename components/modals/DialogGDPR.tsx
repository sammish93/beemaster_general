import * as React from "react";
import { Button, Dialog, Portal, Text } from "react-native-paper";
import { ScrollView, Platform } from "react-native";
import styles from "@/assets/styles";
import { useTheme } from "react-native-paper";
import { VerticalSpacer } from "../Spacers";
import { MobXProviderContext } from "mobx-react";
import { useContext } from "react";

interface DialogGDPRProps {
  hideDialog: () => void;
  onConsent: (consent: boolean) => void;
}

/**
 * `DialogGDPR` component displays a GDPR consent dialog tailored to the platform.
 * It renders `MobileModal` for Android and iOS platforms, otherwise `WebModal`.
 *
 * @param hideDialog - A function to close the dialog.
 */

const DialogGDPR = ({ hideDialog, onConsent }: DialogGDPRProps) => {
  return <DialogModal hideDialog={hideDialog} onConsent={onConsent} />;
};

/**
 * `MobileModal` component renders the GDPR dialog specifically designed for mobile platforms.
 * It utilizes a `Portal` to render the dialog above other content and includes GDPR information.
 *
 * @param hideDialog - A function to close the dialog.
 */

const DialogModal = ({ hideDialog, onConsent }: DialogGDPRProps) => {
  const theme = useTheme();
  const { userViewModel } = useContext(MobXProviderContext);
  const handleAccept = () => {
    onConsent(true);
    hideDialog();
  };

  const handleCancel = () => {
    onConsent(false);
    hideDialog();
  };

  return (
    <Portal>
      <Dialog
        style={{ ...styles(theme).overlayContainer, alignSelf: "center" }}
        visible={true}
        onDismiss={hideDialog}
      >
        <Dialog.Icon icon="alert" />
        <Dialog.Title style={{ textAlign: "center" }}>
          {userViewModel.i18n.t("gdpr modal title")}
        </Dialog.Title>
        <Dialog.Content>
          <Text style={theme.fonts.titleMedium} accessibilityRole="header">
            {userViewModel.i18n.t("gdpr modal header")}
          </Text>
        </Dialog.Content>
        <Dialog.ScrollArea
          style={{ borderBlockColor: theme.colors.primaryContainer }}
        >
          <ScrollView style={styles(theme).overlayScrollView}>
            <Text style={theme.fonts.bodyMedium}>
              {userViewModel.i18n.t("gdpr modal description 1")}
            </Text>
            <VerticalSpacer size={12} />
            <Text style={theme.fonts.bodyMedium}>
              {userViewModel.i18n.t("gdpr modal description 2")}
            </Text>
            <VerticalSpacer size={12} />
            <Text style={theme.fonts.bodyMedium}>
              {userViewModel.i18n.t("gdpr modal description 3")}
            </Text>
            <VerticalSpacer size={12} />
            <Text style={theme.fonts.bodyMedium}>
              {userViewModel.i18n.t("gdpr modal description 4")}
            </Text>
            <VerticalSpacer size={12} />
            <Text style={theme.fonts.bodyMedium}>
              {userViewModel.i18n.t("gdpr modal description 5")}
            </Text>
            <VerticalSpacer size={12} />
            <Text style={theme.fonts.bodyMedium}>
              {userViewModel.i18n.t("gdpr modal description 6")}
            </Text>
            <VerticalSpacer size={12} />
            <Text style={theme.fonts.bodyMedium}>
              {userViewModel.i18n.t("gdpr modal description 7")}
            </Text>
            <VerticalSpacer size={12} />
            <Text style={theme.fonts.bodyMedium}>
              {userViewModel.i18n.t("gdpr modal description 8")}
            </Text>
          </ScrollView>
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button
            onPress={handleCancel}
            accessibilityLabel="Cancel the modal"
            accessibilityHint="Close if disagree to terms of use"
          >
            Cancel
          </Button>
          <Button
            onPress={handleAccept}
            accessibilityLabel="Ok to terms of use"
            accessibilityHint="Agree to terms of use"
          >
            Ok
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DialogGDPR;
