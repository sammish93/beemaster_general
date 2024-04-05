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
          Toggle specific notifications on and off. You can toggle global
          notifications for every one of your hives on the settings screen.
        </Text>
        <VerticalSpacer size={20} />
        <Text style={theme.fonts.bodyLarge}>
          Tip: Do you wish to turn off a specific notification for only a single
          hive? You can keep that notification enabled on the settings screen
          while disabling it on said hive's settings screen. You'll still
          receive notifications of that type for all of your other hives.
        </Text>
        <VerticalSpacer size={20} />
        <Text style={theme.fonts.bodyLarge}>
          Don't agree that wind speeds of 10 meters per second are strong winds?
          You can change parameters! Click on the 'Customise' button for each
          notification type in order to adjust specific parameters. All future
          notifications will take into account these adjustments in order to
          provide you with a tailor-made experience.
        </Text>
      </View>
    </>
  );
};

export default NotificationInfoModal;
