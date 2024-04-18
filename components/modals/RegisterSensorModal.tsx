import { useContext, useState } from "react";
import { Checkbox, useTheme, List } from "react-native-paper";
import { Button, TextInput, IconButton, Text } from "react-native-paper";
import { Platform, View } from "react-native";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { BottomModal, OverlayModal } from "./Modals";
import { HorizontalSpacer, VerticalSpacer } from "../Spacers";
import { MobXProviderContext } from "mobx-react";
import { checkSensorIdUsage } from "@/utils/sensorUtils";
import { ScrollView } from "react-native-gesture-handler";

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

  // TODO: API call to fetch registered sensors in the database.
  const [sensors, setSensors] = useState<string[]>([]);
  const [sensorRegistrationError, setSensorRegistrationError] = useState(false);
  const selectedHive = hiveViewModel.getSelectedHive();
  const userId = userViewModel.getUserId();
  const hiveId = selectedHive.id;

  const handleRegisterSensor = async (sensorId: string) => {

    // TODO: Implement sensor id validation and logic to save in db. 
    if (sensors.includes(sensorId)) {
      setSensorRegistrationError(true);
    }
    else {
      const updatedSensors = [...sensors, sensorId];
      setSensors(updatedSensors);
      setSensorRegistrationError(false);
    }

  };

  const handleRemoveSensor = (sensorId: string) => {
    const updatedSensors = sensors.filter(id => id != sensorId);
    setSensors(updatedSensors);
  }


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
          onChangeText={(input) => {
            setSensorId(input);
            setSensorRegistrationError(false);
          }}
          mode="outlined"
          maxLength={15}
          style={{flex: 1}}
        />
        <HorizontalSpacer size={16} />
        <Button mode="contained" onPress={() => handleRegisterSensor(sensorId)}>
          {userViewModel.i18n.t("add sensor")}
        </Button>
        <VerticalSpacer size={8} />
      </View>
      { sensorRegistrationError && 
        <Text style={{color: "red", marginLeft: 16 }}>
          {`Error: ${sensorId} is already in use. Please choose another id.`}
        </Text>
      }
      { sensors.length != 0 && 
        <SensorListOverview allSensors={sensors} removeSensor={handleRemoveSensor}/> 
      } 
    </>
  );
};

interface Sensors {
  allSensors: string[]
  removeSensor: (sensorId: string) => void
}

const SensorListOverview = ({ allSensors, removeSensor }: Sensors) => {
  const { userViewModel } = useContext(MobXProviderContext);

  return (
    <ScrollView>
      <List.Section>
        <List.Subheader>Overview of registered sensors</List.Subheader>
        { allSensors.map((sensorId, key) => (
        <List.Item 
          key={key}
          title={sensorId}
          right={() => (
            <View style={{display: "flex", flexDirection: "row"}}>
              <List.Icon icon="weight"/>
              <HorizontalSpacer size={25}/>
              <Button mode="contained" onPress={() => removeSensor(sensorId)}>
                {userViewModel.i18n.t("remove")}
              </Button>
            </View>
          )}
        >
        </List.Item>
        ))}
      </List.Section>
    </ScrollView>
  );
};

export default RegisterSensorModal;
