import { useContext, useEffect, useState } from "react";
import { useTheme } from "react-native-paper";
import { Button, TextInput, IconButton, Text } from "react-native-paper";
import { Platform, ScrollView, View } from "react-native";
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
import styles from "@/assets/styles";
import { Calendar } from "react-native-calendars";
import { MarkedDates } from "react-native-calendars/src/types";

interface CalendarModalProps {
  isOverlayModalVisible: boolean;
  onClose: () => void;
  onDayPress: (day: { dateString: string }) => void;
  markedDates: MarkedDates;
  setMarkedDates: (value: React.SetStateAction<MarkedDates>) => void;
  onConfirmSelection: () => void;
}

interface ModalContentProps {
  onClose: () => void;
  onDayPress: (day: { dateString: string }) => void;
  markedDates: MarkedDates;
  setMarkedDates: (value: React.SetStateAction<MarkedDates>) => void;
  onConfirmSelection: () => void;
}

const CalendarModal = (props: CalendarModalProps) => {
  return (
    <OverlayModal
      isOverlayModalVisible={props.isOverlayModalVisible}
      onClose={props.onClose}
    >
      <ModalContent
        onClose={props.onClose}
        onDayPress={props.onDayPress}
        markedDates={props.markedDates}
        setMarkedDates={props.setMarkedDates}
        onConfirmSelection={props.onConfirmSelection}
      />
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
          {userViewModel.i18n.t("choose date range")}
        </Text>
        <IconButton
          icon="close"
          iconColor={theme.colors.onSurfaceVariant}
          onPress={props.onClose}
        />
      </View>
      <ScrollView style={styles(theme).overlayScrollView}>
        <Calendar
          onDayPress={props.onDayPress}
          markedDates={props.markedDates}
          markingType={"period"}
          style={{
            backgroundColor: theme.colors.background,
            padding: 12,
            borderRadius: 20,
          }}
          theme={{
            arrowColor: theme.colors.primary,
            calendarBackground: theme.colors.background,
            monthTextColor: theme.colors.onBackground,
            dayTextColor: theme.colors.onBackground,
            todayTextColor: theme.colors.primary,
          }}
        />
        <VerticalSpacer size={8} />
        <Button
          mode="contained"
          onPress={() => props.setMarkedDates({})}
          disabled={Object.keys(props.markedDates).length === 0}
        >
          {userViewModel.i18n.t("reset")}
        </Button>
        <VerticalSpacer size={8} />
        <Button
          mode="contained"
          onPress={props.onConfirmSelection}
          disabled={Object.keys(props.markedDates).length < 2}
        >
          {userViewModel.i18n.t("confirm")}
        </Button>
      </ScrollView>
    </>
  );
};

export default CalendarModal;
