import { useContext, useState } from "react";
import { Checkbox, useTheme } from "react-native-paper";
import { Button, TextInput, IconButton, Text } from "react-native-paper";
import { Platform, View } from "react-native";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { BottomModal, OverlayModal } from "./Modals";
import { HorizontalSpacer, VerticalSpacer } from "../Spacers";
import { MobXProviderContext } from "mobx-react";

interface RepositionHiveModalProps {
  isOverlayModalVisible: boolean;
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
  onClose: () => void;
}

interface ModalContentProps {
  onClose: () => void;
}

const RepositionHiveModal = (props: RepositionHiveModalProps) => {
  return (() => {
    if (Platform.OS === "android" || Platform.OS === "ios") {
      return (
        <BottomModal
          isOverlayModalVisible={props.isOverlayModalVisible}
          bottomSheetModalRef={props.bottomSheetModalRef}
          onClose={props.onClose}
        >
          <ModalContent onClose={props.onClose} />
        </BottomModal>
      );
    } else {
      return (
        <OverlayModal
          isOverlayModalVisible={props.isOverlayModalVisible}
          bottomSheetModalRef={props.bottomSheetModalRef}
          onClose={props.onClose}
        >
          <ModalContent onClose={props.onClose} />
        </OverlayModal>
      );
    }
  })();
};

const ModalContent = (props: ModalContentProps) => {
  const theme = useTheme();
  const { userViewModel } = useContext(MobXProviderContext);
  const { hiveViewModel } = useContext(MobXProviderContext);
  const selectedHive = hiveViewModel.getSelectedHive();

  const handleRepositionHive = () => {
    // TODO - Implement map and allow relocation.
    // TODO DB - Write these changes to the DB.
    props.onClose();
  };

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
          {userViewModel.i18n.t("reposition hive")}
        </Text>
        <IconButton
          icon="close"
          iconColor={theme.colors.onSurfaceVariant}
          onPress={props.onClose}
        />
      </View>
      <View>
        <View
          style={{
            height: 100,
            backgroundColor: "red",
            borderRadius: 16,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={theme.fonts.bodyLarge}>Map component here</Text>
          <Text style={theme.fonts.bodyLarge}>
            Lat: {selectedHive.latLng.lat}, Lng: {selectedHive.latLng.lng}
          </Text>
        </View>
        <VerticalSpacer size={8} />
        <Button mode="contained" onPress={handleRepositionHive}>
          {userViewModel.i18n.t("update location")}
        </Button>
      </View>
    </>
  );
};

export default RepositionHiveModal;
