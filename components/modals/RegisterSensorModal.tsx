import { useContext, useEffect, useState } from "react";
import { Checkbox, useTheme, List } from "react-native-paper";
import { Button, TextInput, IconButton, Text } from "react-native-paper";
import { Dimensions, Platform, View } from "react-native";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { BottomModal, OverlayModal } from "./Modals";
import { HorizontalSpacer, VerticalSpacer } from "../Spacers";
import { MobXProviderContext } from "mobx-react";
import {
  registerSensor,
  getSensorAssignment,
  deregisterSensor,
} from "@/utils/sensorUtils";
import { ScrollView } from "react-native-gesture-handler";
import styles from "@/assets/styles";
import { ScreenWidth } from "@/constants/Dimensions";

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
  const [sensorId, setSensorId] = useState("");
  const [sensors, setSensors] = useState<string[]>([]);
  const [sensorRegistrationError, setSensorRegistrationError] = useState(false);
  const [sensorErrorMessage, setSensorErrorMessage] = useState("");
  const selectedHive = hiveViewModel.getSelectedHive();
  const userId = userViewModel.getUserId();
  const hiveId = selectedHive.id;

  useEffect(() => {
    const fetchSensorData = async () => {
      console.log("Fetching sensor data from database!");

      // TODO: Move sensor ID to another place.
      const sensorData = await getSensorAssignment(userId, "weight-sensor-1");
      if (sensorData && sensorData.data.hiveId === hiveId) {
        setSensors([sensorData.id]);
      }
    };
    fetchSensorData();
  }, []);

  const handleRegisterSensor = async (sensorId: string) => {
    // TODO: Move sensor ID to another place.
    if (sensorId !== "weight-sensor-1") {
      setSensorErrorMessage(
        userViewModel.i18n.t("the provided sensor id does not exist")
      );
      setSensorRegistrationError(true);
      return;
    }
    if (sensors.includes(sensorId)) {
      setSensorErrorMessage(
        userViewModel.i18n.t("this sensor is already registered")
      );
      setSensorRegistrationError(true);
    } else {
      const response = await registerSensor(userId, hiveId, sensorId);
      if (response.success) {
        const updatedSensors = [...sensors, sensorId];
        setSensors(updatedSensors);
        setSensorRegistrationError(false);
      } else {
        setSensorErrorMessage(response.message);
        setSensorRegistrationError(true);
      }
    }
  };

  const handleRemoveSensor = async (sensorId: string) => {
    const response = await deregisterSensor(userId, hiveId, sensorId);
    if (response.success) {
      setSensorErrorMessage(response.message);
      const updatedSensors = sensors.filter((id) => id != sensorId);
      setSensors(updatedSensors);
    } else {
      setSensorErrorMessage(response.message);
      setSensorRegistrationError(true);
    }
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
      <View
        style={{
          ...styles(theme).hiveRenameItem,
          flexDirection:
            Dimensions.get("window").width <= ScreenWidth.Compact
              ? "column"
              : "row",
          alignItems: "center",
          width: "100%",
        }}
      >
        <TextInput
          label={userViewModel.i18n.t("sensor id")}
          value={sensorId}
          onChangeText={(input) => {
            setSensorId(input);
            setSensorRegistrationError(false);
          }}
          maxLength={15}
          style={{
            flex:
              Dimensions.get("window").width <= ScreenWidth.Compact
                ? undefined
                : 3,
            width: "100%",
          }}
        />
        {Dimensions.get("window").width <= ScreenWidth.Compact ? (
          <VerticalSpacer size={12} />
        ) : (
          <HorizontalSpacer size={12} />
        )}
        <Button
          mode="contained"
          onPress={() => handleRegisterSensor(sensorId)}
          style={{
            flex:
              Dimensions.get("window").width <= ScreenWidth.Compact
                ? undefined
                : 1,
            width: "100%",
            justifyContent: "center",
          }}
        >
          {userViewModel.i18n.t("add sensor")}
        </Button>
      </View>
      <VerticalSpacer size={8} />
      {sensorRegistrationError && (
        <ShowSensorErrorMessage message={sensorErrorMessage} />
      )}
      {sensors.length != 0 && (
        <SensorListOverview
          allSensors={sensors}
          removeSensor={handleRemoveSensor}
        />
      )}
    </>
  );
};

interface Sensors {
  allSensors: string[];
  removeSensor: (sensorId: string) => void;
}

const SensorListOverview = ({ allSensors, removeSensor }: Sensors) => {
  const { userViewModel } = useContext(MobXProviderContext);
  const theme = useTheme();

  return (
    <ScrollView>
      <List.Section style={{ width: "100%" }}>
        <List.Subheader style={theme.fonts.titleLarge}>
          Overview of registered sensors
        </List.Subheader>
        {allSensors.map((sensorId, key) => (
          <List.Item
            key={key}
            title={sensorId}
            titleStyle={theme.fonts.bodyLarge}
            right={() => (
              <View style={{ display: "flex", flexDirection: "row" }}>
                <List.Icon icon="weight" />
                <HorizontalSpacer size={20} />
                <Button mode="contained" onPress={() => removeSensor(sensorId)}>
                  {userViewModel.i18n.t("remove")}
                </Button>
              </View>
            )}
          ></List.Item>
        ))}
      </List.Section>
    </ScrollView>
  );
};

interface ErrorMessage {
  message: string;
}

const ShowSensorErrorMessage = ({ message }: ErrorMessage) => {
  const theme = useTheme();
  const { userViewModel } = useContext(MobXProviderContext);

  return (
    <Text
      style={{ ...theme.fonts.bodyLarge, color: "red", marginLeft: 16 }}
    >{`${userViewModel.i18n.t("error")}: ${message}`}</Text>
  );
};

export default RegisterSensorModal;
