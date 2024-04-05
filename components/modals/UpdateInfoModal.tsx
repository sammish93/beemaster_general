import { useContext, useState } from "react";
import { useTheme } from "react-native-paper";
import { Button, TextInput, IconButton, Text } from "react-native-paper";
import { Platform, View } from "react-native";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { BottomModal, OverlayModal } from "./Modals";
import { VerticalSpacer } from "../Spacers";
import { MobXProviderContext } from "mobx-react";

interface UpdateInfoModalProps {
  isOverlayModalVisible: boolean;
  onClose: () => void;
}

interface ModalContentProps {
  onClose: () => void;
}

const UpdateInfoModal = (props: UpdateInfoModalProps) => {
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
          Missed an important notification because your phone was switched off?
          This screen is intended to display all of your important
          notifications.
        </Text>
        <VerticalSpacer size={20} />
        <Text style={theme.fonts.bodyLarge}>
          Click on the 'Seen' button to dismiss the notification as being marked
          as read.
        </Text>
        <VerticalSpacer size={20} />
        <Text style={theme.fonts.bodyLarge}>
          Click on the notification card to visit the hive screen that the
          notification pertains to.
        </Text>
        <VerticalSpacer size={20} />
        <Text style={theme.fonts.bodyLarge}>
          Want to disable a specific type of notification for only a single one
          of your hives? Click the 'Mute' button so that you no longer receive
          notifications of that type for said hive.
        </Text>
      </View>
    </>
  );
};

export default UpdateInfoModal;
