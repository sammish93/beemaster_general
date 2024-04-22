import * as React from "react";
import { Button, Dialog, Portal, Text } from "react-native-paper";
import { ScrollView, Platform } from "react-native";
import styles from "@/assets/styles";
import { useTheme } from "react-native-paper";
import { VerticalSpacer } from "../Spacers";
import { useContext } from "react";
import { MobXProviderContext } from "mobx-react";
import { CountryEnum } from "@/constants/LocaleEnums";

interface DialogCountryProps {
  hideDialog: () => void;
  countryCode: CountryEnum;
}

/**
 * `DialogGDPR` component displays a GDPR consent dialog tailored to the platform.
 * It renders `MobileModal` for Android and iOS platforms, otherwise `WebModal`.
 *
 * @param hideDialog - A function to close the dialog.
 */

const DialogCountry = ({ hideDialog, countryCode }: DialogCountryProps) => {
  return <DialogModal hideDialog={hideDialog} countryCode={countryCode} />;
};

/**
 * `MobileModal` component renders the GDPR dialog specifically designed for mobile platforms.
 * It utilizes a `Portal` to render the dialog above other content and includes GDPR information.
 *
 * @param hideDialog - A function to close the dialog.
 */

const DialogModal = ({ hideDialog, countryCode }: DialogCountryProps) => {
  const theme = useTheme();
  const { userViewModel } = useContext(MobXProviderContext);

  return (
    <Portal>
      <Dialog
        style={{ ...styles(theme).overlayContainer, alignSelf: "center" }}
        visible={true}
        onDismiss={hideDialog}
      >
        <Dialog.Icon icon="alert" />
        <Dialog.Title style={{ textAlign: "center" }}>
          {userViewModel.i18n.t("additional action required")}
        </Dialog.Title>
        <Dialog.Content>
          <Text style={theme.fonts.titleMedium} accessibilityRole="header">
            {userViewModel.i18n.t("country modal heading")}
          </Text>
        </Dialog.Content>
        <Dialog.ScrollArea
          style={{ borderBlockColor: theme.colors.primaryContainer }}
        >
          <ScrollView style={styles(theme).overlayScrollView}>
            <Text style={theme.fonts.bodyMedium}>
              {userViewModel.i18n.t("country modal description")}
            </Text>
          </ScrollView>
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button
            onPress={() => {
              userViewModel.setCountry(countryCode, false);
              hideDialog();
            }}
            accessibilityLabel="Cancel the modal"
            accessibilityHint="Close if disagree to terms of use"
          >
            No
          </Button>
          <Button
            onPress={() => {
              userViewModel.setCountry(countryCode, true);
              hideDialog();
            }}
            accessibilityLabel="Ok to terms of use"
            accessibilityHint="Agree to terms of use"
          >
            Yes
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DialogCountry;
