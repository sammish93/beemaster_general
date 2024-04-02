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
import { LatLng } from "react-native-maps";
import Toast from "react-native-toast-message";
import { toastCrossPlatform } from "../ToastCustom";

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
    return (
      <OverlayModal
        isOverlayModalVisible={props.isOverlayModalVisible}
        bottomSheetModalRef={props.bottomSheetModalRef}
        onClose={props.onClose}
      >
        <ModalContent onClose={props.onClose} />
      </OverlayModal>
    );
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
  const [newLocation, setNewLocation] = useState<LatLng>();
  const { status, location, isEnabled, checkPermissionStatus } =
    usePermissionManager("location permission");

  useEffect(() => {
    checkPermissionStatus();
  }, [userViewModel.getLocationPermission()]);

  const handleRepositionHive = () => {
    const updatedHive = { ...selectedHive };

    updatedHive.latLng = {
      lat: newLocation?.latitude,
      lng: newLocation?.longitude,
    };

    hiveViewModel.updateHive(updatedHive);

    hiveViewModel.addSelectedHive(updatedHive);

    Toast.show(
      toastCrossPlatform({
        title: "Success",
        text: `blah'.`,
        type: "success",
      })
    );

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
          <MapRelocate
            lat={59.9139}
            lng={10.7522}
            height={300}
            onMapPress={(coords) => setNewLocation(coords)}
            newLocation={newLocation}
          />
        ) : null}
        {userViewModel.getLocationPermission() && location != null ? (
          <MapRelocate
            lat={location.latitude}
            lng={location.longitude}
            height={300}
            onMapPress={(coords) => setNewLocation(coords)}
            newLocation={newLocation}
          />
        ) : null}
        <VerticalSpacer size={12} />
        {newLocation != undefined ? (
          <>
            <Button mode="contained" onPress={() => setNewLocation(undefined)}>
              {userViewModel.i18n.t("reset hive position")}
            </Button>
            <VerticalSpacer size={8} />
          </>
        ) : null}
        <Button
          mode="contained"
          onPress={handleRepositionHive}
          disabled={newLocation === undefined}
        >
          {userViewModel.i18n.t("update location")}
        </Button>
      </View>
    </>
  );
};

export default RepositionHiveModal;
