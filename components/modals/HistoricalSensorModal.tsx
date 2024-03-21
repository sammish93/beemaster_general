import { useContext, useState } from "react";
import { useTheme } from "react-native-paper";
import { Button, TextInput, IconButton, Text } from "react-native-paper";
import { Platform, View } from "react-native";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { BottomModal, OverlayModal } from "./Modals";
import { VerticalSpacer } from "../Spacers";
import { MobXProviderContext } from "mobx-react";
import { SensorDataList } from "@/models/sensor";
import SensorGraphExpanded from "../sensor/SensorGraphExpanded";

interface HistoricalSensorModalProps {
  isOverlayModalVisible: boolean;
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
  onClose: () => void;
  sensorData?: SensorDataList;
}

interface ModalContentProps {
  onClose: () => void;
  sensorData?: SensorDataList;
}

const HistoricalSensorModal = (props: HistoricalSensorModalProps) => {
  return (
    <OverlayModal
      isOverlayModalVisible={props.isOverlayModalVisible}
      bottomSheetModalRef={props.bottomSheetModalRef}
      onClose={props.onClose}
    >
      <ModalContent onClose={props.onClose} sensorData={props.sensorData} />
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
          {userViewModel.i18n.t("historical sensor data")}
        </Text>
        <IconButton
          icon="close"
          iconColor={theme.colors.onSurfaceVariant}
          onPress={props.onClose}
        />
      </View>
      {props.sensorData ? (
        <SensorGraphExpanded sensorDataList={props.sensorData} />
      ) : null}
    </>
  );
};

export default HistoricalSensorModal;
