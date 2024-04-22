import { useContext, useState } from "react";
import { useTheme } from "react-native-paper";
import { Button, TextInput, IconButton, Text } from "react-native-paper";
import { Platform, View } from "react-native";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { BottomModal, OverlayModal } from "./Modals";
import { VerticalSpacer } from "../Spacers";
import { MobXProviderContext } from "mobx-react";

interface NotificationInfoModalProps {
  isOverlayModalVisible: boolean;
  onClose: () => void;
}

interface ModalContentProps {
  onClose: () => void;
}

const NotificationInfoModal = (props: NotificationInfoModalProps) => {
  return (
    <OverlayModal
      isOverlayModalVisible={props.isOverlayModalVisible}
      onClose={props.onClose}
    >
      <ModalContent onClose={props.onClose} />
    </OverlayModal>
  );
};

const ModalContent = (props: ModalContentProps) => {
  const theme = useTheme();
  const { userViewModel } = useContext(MobXProviderContext);

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ ...theme.fonts.headlineSmall, flex: 1 }}>
          {userViewModel.i18n.t("information")}
        </Text>
        <IconButton
          icon="close"
          iconColor={theme.colors.onSurfaceVariant}
          onPress={props.onClose}
        />
      </View>
      <View>
        <Text style={theme.fonts.bodyLarge}>
          {userViewModel.i18n.t("notification info 1")}
        </Text>
        <VerticalSpacer size={20} />
        <Text style={theme.fonts.bodyLarge}>
          {userViewModel.i18n.t("notification info 2")}
        </Text>
        <VerticalSpacer size={20} />
        <Text style={theme.fonts.bodyLarge}>
          {userViewModel.i18n.t("notification info 3")}
        </Text>
      </View>
    </>
  );
};

export default NotificationInfoModal;
