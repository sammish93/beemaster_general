import { useContext, useEffect, useState } from "react";
import { Checkbox, useTheme, List } from "react-native-paper";
import { Button, TextInput, IconButton, Text } from "react-native-paper";
import { Platform, View } from "react-native";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { BottomModal, OverlayModal } from "./Modals";
import { HorizontalSpacer, VerticalSpacer } from "../Spacers";
import { MobXProviderContext } from "mobx-react";
import { registerSensor, getSensorAssignment } from "@/utils/sensorUtils";
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
  const [sensors, setSensors] = useState<string[]>([]);
  const [sensorRegistrationError, setSensorRegistrationError] = useState(false);
  const [sensorErrorMessage, setSensorErrorMessage] = useState('');
  const selectedHive = hiveViewModel.getSelectedHive();
  const userId = userViewModel.getUserId();
  const hiveId = selectedHive.id;

  useEffect(() => {
    const fetchSensorData = async () => {
      console.log("Fetching sensor data from database!");

      // TODO: Move sensor id to another place.
      const sensorData = await getSensorAssignment(userId, "weight-sensor-1");
      if (sensorData && sensorData.data.hiveId === hiveId) {
        setSensors([sensorData.id]);
      }
    }
    fetchSensorData();
  }, [])

  const handleRegisterSensor = async (sensorId: string) => {

    // TODO: Move sensor ID to another place.
    if (sensorId !== "weight-sensor-1") {
      setSensorErrorMessage("The provided sensor id do not exists.");
      setSensorRegistrationError(true);
      return;
    }
    if (sensors.includes(sensorId)) {
      setSensorErrorMessage("This hive already has the provided sensor.");
      setSensorRegistrationError(true);
    }
    else {
      const response = await registerSensor(userId, hiveId, sensorId);
      if (response.success) {
        const updatedSensors = [...sensors, sensorId];
        setSensors(updatedSensors);
        setSensorRegistrationError(false);
      }
      else {
        setSensorErrorMessage(response.message);
        setSensorRegistrationError(true);
      }
    }
  };

  const handleRemoveSensor = (sensorId: string) => {
    // TODO: Remove sensor assignment from database.
    const updatedSensors = sensors.filter(id => id != sensorId);
    setSensors(updatedSensors);
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
      { sensorRegistrationError && <ShowSensorErrorMessage message={sensorErrorMessage}/>}
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

interface ErrorMessage {
  message: string
}

const ShowSensorErrorMessage = ({message}: ErrorMessage) => {
  return (
    <Text style={{color: "red", marginLeft: 16 }}>
      {`Error: ${message}`}
    </Text>
  );
};

export default RegisterSensorModal;
