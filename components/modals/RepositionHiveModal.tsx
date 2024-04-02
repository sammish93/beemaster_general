import { useContext, useEffect, useState } from "react";
import { Checkbox, useTheme } from "react-native-paper";
import { Button, TextInput, IconButton, Text } from "react-native-paper";
import { Platform, View } from "react-native";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { BottomModal, OverlayModal } from "./Modals";
import { HorizontalSpacer, VerticalSpacer } from "../Spacers";
import { MobXProviderContext } from "mobx-react";
import MapRelocate from "../MapRelocate";
import { usePermissionManager } from "@/domain/permissionManager";

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
  const [isLocation, setLocation] = useState(
    userViewModel.getLocationPermission()
  );

  const { status, location, isEnabled, checkPermissionStatus } =
    usePermissionManager("location permission");

  useEffect(() => {
    checkPermissionStatus();

    console.log(
      "permission - " + userViewModel.getLocationPermission().toString()
    );
    console.log("enabled - " + isEnabled.toString());
    console.log("coords - " + location?.longitude);
  }, [userViewModel.getLocationPermission()]);

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
        {!userViewModel.getLocationPermission() ? (
          <MapRelocate lat={59.9139} lng={10.7522} height={200} />
        ) : null}
        {userViewModel.getLocationPermission() && location != null ? (
          <MapRelocate
            lat={location.latitude}
            lng={location.longitude}
            height={200}
          />
        ) : null}
        <VerticalSpacer size={8} />
        <Button mode="contained" onPress={handleRepositionHive}>
          {userViewModel.i18n.t("update location")}
        </Button>
      </View>
    </>
  );
};

export default RepositionHiveModal;
