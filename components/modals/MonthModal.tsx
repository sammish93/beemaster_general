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
import DatePickerModal from "./DatePickerModal";

interface MonthModalProps {
  isOverlayModalVisible: boolean;
  onClose: () => void;
  onConfirm: (date: Date) => void;
}

interface ModalContentProps {
  onClose: () => void;
  onConfirm: (date: Date) => void;
}

const MonthModal = (props: MonthModalProps) => {
  return (
    <OverlayModal
      isOverlayModalVisible={props.isOverlayModalVisible}
      onClose={props.onClose}
    >
      <ModalContent onClose={props.onClose} onConfirm={props.onConfirm} />
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
          {userViewModel.i18n.t("select a month without full stop")}
        </Text>
        <IconButton
          icon="close"
          iconColor={theme.colors.onSurfaceVariant}
          onPress={props.onClose}
        />
      </View>
      <ScrollView style={styles(theme).overlayScrollView}>
        <DatePickerModal onConfirm={props.onConfirm} />
      </ScrollView>
    </>
  );
};

export default MonthModal;
