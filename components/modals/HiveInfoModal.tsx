import { useContext, useState } from "react";
import { useTheme } from "react-native-paper";
import { Button, TextInput, IconButton, Text } from "react-native-paper";
import { Platform, View } from "react-native";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { BottomModal, OverlayModal } from "./Modals";
import { VerticalSpacer } from "../Spacers";
import { MobXProviderContext } from "mobx-react";

interface HiveInfoModalProps {
  isOverlayModalVisible: boolean;
  onClose: () => void;
}

interface ModalContentProps {
  onClose: () => void;
}

const HiveInfoModal = (props: HiveInfoModalProps) => {
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
          This screen provides detailed information for a specific hive.
        </Text>
        <VerticalSpacer size={20} />
        <Text style={theme.fonts.bodyLarge}>
          The forecast element includes the current weather conditions for the
          hive's location, together with a simplified view of the forecast for
          the following week. Click on the arrow button located on the forecast
          card to view the weekly forecast in greater detail.
        </Text>
        <VerticalSpacer size={20} />
        <Text style={theme.fonts.bodyLarge}>
          If you have registered and installed a sensor for your hive then
          recent data collected by your sensor pertaining to said hive will be
          shown here. For historical sensor data you can press on the history
          button located on the chart card.
        </Text>
        <VerticalSpacer size={20} />
        <Text style={theme.fonts.bodyLarge}>
          You can use notes to record observations and other important details
          about a specific hive. Click on the pencil icon located on the top
          right of the screen to create a note. Notes can be edited later on, as
          well as being pinned, or 'stickied'. Pinned notes will always appear
          above any other note, so be sure to use this functionality for your
          most important notes!
        </Text>
        <VerticalSpacer size={20} />
        <Text style={theme.fonts.bodyLarge}>
          Do you wish to edit your hive, or access additional functionality such
          as registering additional sensors or repositioning your hive? Click on
          the cogwheel icon in the top right corner of the screen to navigate to
          the hive settings screen.
        </Text>
      </View>
    </>
  );
};

export default HiveInfoModal;
