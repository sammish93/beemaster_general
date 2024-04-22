import * as React from "react";
import { Button, Dialog, Portal, Text } from "react-native-paper";
import { ScrollView, Platform } from "react-native";
import styles from "@/assets/styles";
import { useTheme } from "react-native-paper";
import { VerticalSpacer } from "../Spacers";

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
          Welcome to the Beemaster General App
        </Dialog.Title>
        <Dialog.Content>
          <Text style={theme.fonts.titleMedium} accessibilityRole="header">
            GDPR Information and Terms of Use
          </Text>
        </Dialog.Content>
        <Dialog.ScrollArea
          style={{ borderBlockColor: theme.colors.primaryContainer }}
        >
          <ScrollView style={styles(theme).overlayScrollView}>
            <Text style={theme.fonts.bodyMedium}>
              • Data controller: Group/HiØ
            </Text>
            <VerticalSpacer size={12} />
            <Text style={theme.fonts.bodyMedium}>
              • The purpose of the processing of personal data: Clearly explain
              why you collect personal data, for example to improve services,
              customize the user experience, or for marketing purposes.{" "}
            </Text>
            <VerticalSpacer size={12} />
            <Text style={theme.fonts.bodyMedium}>
              • Legal basis for the processing:....
            </Text>
            <VerticalSpacer size={12} />
            <Text style={theme.fonts.bodyMedium}>
              • Third parties who may receive personal data: such as
              subcontractors, cloud services, marketing partners, etc.
            </Text>
            <VerticalSpacer size={12} />
            <Text style={theme.fonts.bodyMedium}>
              • Storage period: Describe how long the personal data will be
              stored.
            </Text>
            <VerticalSpacer size={12} />
            <Text style={theme.fonts.bodyMedium}>
              • The rights of the data subject: Inform users about their rights
              under GDPR, such as the right to request access to, correction or
              deletion of the personal data stored about them, the right to
              object to processing, and the right to data portability.
            </Text>
            <VerticalSpacer size={12} />
            <Text style={theme.fonts.bodyMedium}>
              • The right to withdraw consent:....
            </Text>
            <VerticalSpacer size={12} />
            <Text style={theme.fonts.bodyMedium}>
              • The right to lodge a complaint with a supervisory authority:
              Provide information on how and to whom users can complain if they
              believe the processing of their personal data violates GDPR.
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
