import { useContext, useEffect, useState } from "react";
import { useTheme } from "react-native-paper";
import { Button, TextInput, IconButton, Text } from "react-native-paper";
import { Platform, View } from "react-native";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { BottomModal, OverlayModal } from "./Modals";
import { VerticalSpacer } from "../Spacers";
import { MobXProviderContext } from "mobx-react";
import Toast from "react-native-toast-message";
import { toastCrossPlatform } from "../ToastCustom";
import MapRelocate from "../MapRelocate";
import { usePermissionManager } from "@/domain/permissionManager";
import { LatLng } from "react-native-maps";
import { isValidString } from "@/domain/validation/stringValidation";

interface AddHiveModalProps {
  isOverlayModalVisible: boolean;
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
  onClose: () => void;
  onAddHive: (hiveName: string, lat: number, lng: number) => void;
}

interface ModalContentProps {
  onClose: () => void;
  onAddHive: (hiveName: string, lat: number, lng: number) => void;
}

const AddHiveModal = (props: AddHiveModalProps) => {
  return (
    <OverlayModal
      isOverlayModalVisible={props.isOverlayModalVisible}
      bottomSheetModalRef={props.bottomSheetModalRef}
      onClose={props.onClose}
    >
      <ModalContent onClose={props.onClose} onAddHive={props.onAddHive} />
    </OverlayModal>
  );
};

const ModalContent = (props: ModalContentProps) => {
  const theme = useTheme();
  const { userViewModel } = useContext(MobXProviderContext);
  const [newHiveName, setNewHiveName] = useState("");
  const [isNameValid, setIsNameValid] = useState<boolean>();
  const [nameErrorMessage, setNameErrorMessage] = useState<string>("");
  const [newLocation, setNewLocation] = useState<LatLng>();
  const { status, location, isEnabled, checkPermissionStatus } =
    usePermissionManager("location permission");

  useEffect(() => {
    checkPermissionStatus();
  }, [userViewModel.getLocationPermission()]);

  const handleModifyName = (input: string) => {
    setNewHiveName(input);

    if (isValidString(input, 1, 64)) {
      setIsNameValid(true);
    } else {
      setIsNameValid(false);
    }
  };

  const handleAddNewHive = () => {
    if (isNameValid) {
      console.log(newLocation?.latitude);
      if (newLocation?.latitude != null && newLocation?.longitude != null) {
        props.onAddHive(
          newHiveName,
          newLocation.latitude,
          newLocation?.longitude
        );

        Toast.show(
          toastCrossPlatform({
            title: "Success",
            text: `Added '${newHiveName}' as a new hive.`,
            type: "success",
          })
        );

        resetHiveName();
      }
    } else {
      setNameErrorMessage(userViewModel.i18n.t("invalid hive name"));
    }

    // TODO Feedback for user
  };

  const resetHiveName = () => setNewHiveName("");

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
          {userViewModel.i18n.t("enter new hive information")}
        </Text>
        <IconButton
          icon="close"
          iconColor={theme.colors.onSurfaceVariant}
          onPress={props.onClose}
        />
      </View>
      <View>
        <TextInput
          label={
            newHiveName.length > 64
              ? userViewModel.i18n.t("too many characters")
              : userViewModel.i18n.t("hive name") +
                (newHiveName.length >= 32
                  ? userViewModel.i18n.t("characters_remaining", {
                      character: 64 - newHiveName.length,
                    })
                  : "")
          }
          value={newHiveName}
          error={!isNameValid}
          onChangeText={(input) => handleModifyName(input)}
        />
        {nameErrorMessage ? (
          <>
            <VerticalSpacer size={8} />
            <Text
              style={{
                ...theme.fonts.bodyLarge,
                flex: 1,
                textAlign: "center",
                color: theme.colors.error,
              }}
            >
              {nameErrorMessage}
            </Text>
          </>
        ) : null}
        <VerticalSpacer size={12} />
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
          onPress={handleAddNewHive}
          disabled={newHiveName === "" || newLocation === undefined}
        >
          {userViewModel.i18n.t("add hive")}
        </Button>
      </View>
    </>
  );
};

export default AddHiveModal;
