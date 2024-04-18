import { useContext, useState } from "react";
import { Checkbox, useTheme } from "react-native-paper";
import { Button, TextInput, IconButton, Text } from "react-native-paper";
import { Platform, View } from "react-native";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { BottomModal, OverlayModal } from "./Modals";
import { HorizontalSpacer, VerticalSpacer } from "../Spacers";
import { MobXProviderContext } from "mobx-react";
import { checkSensorIdUsage } from "@/utils/sensorUtils";

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
  const [sensorId, setSensorId] = useState('');
  const selectedHive = hiveViewModel.getSelectedHive();
  const userId = userViewModel.getUserId();
  const hiveId = selectedHive.id;

  const handleRegisterSensor = async (isWeightSensor: boolean) => {
    // TODO - Implement registration of a hive. Remember validating that the hive ID is the correct
    // sensor type as what's trying to be added, and that it isn't registered to an existing hive.
    // TODO DB - Write this to the DB.

    console.log(`SensorID: ${sensorId}`);

    if (isWeightSensor) {
      const isUsed = await checkSensorIdUsage(sensorId);

      if (isUsed) {
        console.error(`Sensor ID: ${sensorId} is already in use.`);
      }

      // TODO: Handle registration of sensor.

    }
    else {
      console.log(`Only weight sensor registration is supported at the moment.`);
    }

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
      <View style={{
          flexDirection: "row", 
          alignItems: "center",
          marginVertical: 8,
          marginHorizontal: 16
        }}>
        <TextInput 
          label="Sensor ID"
          value={sensorId}
          onChangeText={setSensorId}
          mode="outlined"
          maxLength={15}
          style={{flex: 1}}
        />
        <HorizontalSpacer size={16} />
        <Button mode="contained" onPress={() => handleRegisterSensor(true)}>
          {userViewModel.i18n.t("add sensor")}
        </Button>
        <VerticalSpacer size={8} />
      </View>
    </>
  );
};

export default RegisterSensorModal;
