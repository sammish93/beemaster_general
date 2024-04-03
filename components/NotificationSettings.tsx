import * as React from "react";
import { Button, Text, useTheme } from "react-native-paper";
import { Platform, TouchableOpacity, View } from "react-native";
import { MobXProviderContext } from "mobx-react";
import { useContext } from "react";
import { HorizontalSpacer, VerticalSpacer } from "./Spacers";
import { NotificationType } from "@/constants/Notifications";
import NotificationSwitchComponent from "./NotificationSwitch";
import NotificationModal from "./modals/NotificationModal";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

interface NotificationSettingsProps {
  hiveId?: string;
}

const NotificationSettingsComponent = (props: NotificationSettingsProps) => {
  const { userViewModel } = useContext(MobXProviderContext);
  const theme = useTheme();
  const bottomSheetAddHiveModalRef = React.useRef<BottomSheetModal>(null);
  const [selectedNotificationType, setSelectedNotificationType] =
    React.useState<NotificationType>();
  const [AddHiveModalVisible, setAddHiveModalVisible] = React.useState(false);

  const handleOpenModal = (notificationType: NotificationType) => {
    setSelectedNotificationType(notificationType);

    setAddHiveModalVisible(true);
  };

  const handleCloseModal = () => {
    setAddHiveModalVisible(false);
  };

  return (
    <>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
          {userViewModel.i18n.t("weather")}
        </Text>
        <HorizontalSpacer size={8} />
        <Button
          icon={"archive-edit"}
          //contentStyle={{ height: 24 }}
          mode="contained"
          onPress={() => handleOpenModal(NotificationType.Weather)}
        >
          {userViewModel.i18n.t("customise")}
        </Button>
        <HorizontalSpacer size={8} />
        <NotificationSwitchComponent
          type={NotificationType.Weather}
          hiveId={props.hiveId}
        />
      </View>
      <VerticalSpacer size={2} />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
          {userViewModel.i18n.t("possible swarm")}
        </Text>
        <HorizontalSpacer size={8} />
        <Button
          icon={"archive-edit"}
          //contentStyle={{ height: 24 }}
          mode="contained"
          onPress={() => handleOpenModal(NotificationType.PossibleSwarm)}
        >
          {userViewModel.i18n.t("customise")}
        </Button>
        <HorizontalSpacer size={8} />
        <NotificationSwitchComponent
          type={NotificationType.PossibleSwarm}
          hiveId={props.hiveId}
        />
      </View>
      <VerticalSpacer size={2} />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
          {userViewModel.i18n.t("consider feeding")}
        </Text>
        <HorizontalSpacer size={8} />
        <Button
          icon={"archive-edit"}
          //contentStyle={{ height: 24 }}
          mode="contained"
          onPress={() => handleOpenModal(NotificationType.ConsiderFeeding)}
        >
          {userViewModel.i18n.t("customise")}
        </Button>
        <HorizontalSpacer size={8} />
        <NotificationSwitchComponent
          type={NotificationType.ConsiderFeeding}
          hiveId={props.hiveId}
        />
      </View>
      <VerticalSpacer size={2} />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
          {userViewModel.i18n.t("honey harvest")}
        </Text>
        <HorizontalSpacer size={8} />
        <Button
          icon={"archive-edit"}
          //contentStyle={{ height: 24 }}
          mode="contained"
          onPress={() => handleOpenModal(NotificationType.HoneyHarvest)}
        >
          {userViewModel.i18n.t("customise")}
        </Button>
        <HorizontalSpacer size={8} />
        <NotificationSwitchComponent
          type={NotificationType.HoneyHarvest}
          hiveId={props.hiveId}
        />
      </View>
      <VerticalSpacer size={2} />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
          {userViewModel.i18n.t("maintenance")}
        </Text>
        <HorizontalSpacer size={8} />
        <Button
          icon={"archive-edit"}
          //contentStyle={{ height: 24 }}
          mode="contained"
          onPress={() => handleOpenModal(NotificationType.Maintenance)}
        >
          {userViewModel.i18n.t("customise")}
        </Button>
        <HorizontalSpacer size={8} />
        <NotificationSwitchComponent
          type={NotificationType.Maintenance}
          hiveId={props.hiveId}
        />
      </View>
      <VerticalSpacer size={2} />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
          {userViewModel.i18n.t("expand hive")}
        </Text>
        <HorizontalSpacer size={8} />
        <Button
          icon={"archive-edit"}
          //contentStyle={{ height: 24 }}
          mode="contained"
          onPress={() => handleOpenModal(NotificationType.ConsiderExpanding)}
        >
          {userViewModel.i18n.t("customise")}
        </Button>
        <HorizontalSpacer size={8} />
        <NotificationSwitchComponent
          type={NotificationType.ConsiderExpanding}
          hiveId={props.hiveId}
        />
      </View>
      <VerticalSpacer size={2} />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
          {userViewModel.i18n.t("check hive")}
        </Text>
        <HorizontalSpacer size={8} />
        <Button
          icon={"archive-edit"}
          //contentStyle={{ height: 24 }}
          mode="contained"
          onPress={() => handleOpenModal(NotificationType.CheckHive)}
        >
          {userViewModel.i18n.t("customise")}
        </Button>
        <HorizontalSpacer size={8} />
        <NotificationSwitchComponent
          type={NotificationType.CheckHive}
          hiveId={props.hiveId}
        />
      </View>
      <VerticalSpacer size={2} />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
          {userViewModel.i18n.t("reminder")}
        </Text>
        <HorizontalSpacer size={8} />
        <Button
          icon={"archive-edit"}
          //contentStyle={{ height: 24 }}
          mode="contained"
          onPress={() => handleOpenModal(NotificationType.CustomReminder)}
          disabled={true}
        >
          {userViewModel.i18n.t("disabled")}
        </Button>
        <HorizontalSpacer size={8} />
        <NotificationSwitchComponent
          type={NotificationType.CustomReminder}
          hiveId={props.hiveId}
        />
      </View>
      <VerticalSpacer size={2} />
      <NotificationModal
        isOverlayModalVisible={AddHiveModalVisible}
        bottomSheetModalRef={bottomSheetAddHiveModalRef}
        onClose={() => handleCloseModal()}
        onSave={(newValue) => {
          // TODO: Add functionality for saving values to database
          console.log(
            "New value for",
            selectedNotificationType,
            " saved to database:",
            newValue
          );
          handleCloseModal();
        }}
        parameterName={selectedNotificationType}
      />
    </>
  );
};

export default NotificationSettingsComponent;
