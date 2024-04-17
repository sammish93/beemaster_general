import { useContext, useState } from "react";
import { Checkbox, useTheme } from "react-native-paper";
import { Button, TextInput, IconButton, Text } from "react-native-paper";
import { Platform, View } from "react-native";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { BottomModal, OverlayModal } from "./Modals";
import { HorizontalSpacer, VerticalSpacer } from "../Spacers";
import { MobXProviderContext } from "mobx-react";

interface RegisterSensorModalProps {
  isOverlayModalVisible: boolean;
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
  onClose: () => void;
}

interface ModalContentProps {
  onClose: () => void;
}

const RegisterSensorModal = (props: RegisterSensorModalProps) => {
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

  const handleRegisterSensor = () => {
    // TODO - Implement registration of a hive. Remember validating that the hive ID is the correct
    // sensor type as what's trying to be added, and that it isn't registered to an existing hive.
    // TODO DB - Write this to the DB.
    
    const userId = userViewModel
    const hiveId = selectedHive.id;
    console.log("Hive ID: ", hiveId);

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
          {userViewModel.i18n.t("manage sensors")}
        </Text>
        <IconButton
          icon="close"
          iconColor={theme.colors.onSurfaceVariant}
          onPress={props.onClose}
        />
      </View>
      <View>
        {/* TODO Modify code to show only 'add sensor' if sensor doesn't currently exist, otherwise 
        show a delete sensor button. Swap out onPress function */}
        <Button icon="weight" mode="contained" onPress={handleRegisterSensor}>
          {userViewModel.i18n.t("add weight sensor")}
        </Button>
        <VerticalSpacer size={8} />
        <Button
          icon="home-thermometer"
          mode="contained"
          onPress={handleRegisterSensor}
        >
          {userViewModel.i18n.t("add temperature sensor")}
        </Button>
        <VerticalSpacer size={8} />
        <Button
          icon="air-humidifier"
          mode="contained"
          onPress={handleRegisterSensor}
        >
          {userViewModel.i18n.t("add humidity sensor")}
        </Button>
        <VerticalSpacer size={8} />
        <Button icon="bee" mode="contained" onPress={handleRegisterSensor}>
          {userViewModel.i18n.t("add bee count sensor")}
        </Button>
      </View>
    </>
  );
};

export default RegisterSensorModal;
