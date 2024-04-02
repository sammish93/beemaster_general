import { useContext, useState } from "react";
import { Checkbox, useTheme } from "react-native-paper";
import { Button, TextInput, IconButton, Text } from "react-native-paper";
import { Platform, View } from "react-native";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { BottomModal, OverlayModal } from "./Modals";
import { HorizontalSpacer, VerticalSpacer } from "../Spacers";
import { MobXProviderContext } from "mobx-react";
import Toast from "react-native-toast-message";
import { toastCrossPlatform } from "../ToastCustom";

interface RemoveFilterModalProps {
  isOverlayModalVisible: boolean;
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
  onClose: () => void;
}

interface ModalContentProps {
  onClose: () => void;
}

const RemoveFilterModal = (props: RemoveFilterModalProps) => {
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

  const handleRemoveFilter = (filter: string) => {
    hiveViewModel.removeFilter(filter);

    Toast.show(
      toastCrossPlatform({
        title: "Success",
        text: `Removed '${filter}' from your filters.`,
        type: "success",
      })
    );

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
          {userViewModel.i18n.t("delete hive filters")}
        </Text>
        <IconButton
          icon="close"
          iconColor={theme.colors.onSurfaceVariant}
          onPress={props.onClose}
        />
      </View>
      <View>
        {hiveViewModel.filters.map((filter: string) => (
          <View key={`${filter}-view-1`}>
            <View
              key={`${filter}-view-2`}
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Button
                key={`${filter}-button`}
                mode="contained"
                onPress={() => handleRemoveFilter(filter)}
                textColor={theme.colors.onError}
                style={{
                  flex: 1,
                  backgroundColor: theme.colors.error,
                }}
              >
                {userViewModel.i18n.t("delete_filter", {
                  filter: filter,
                })}
              </Button>
            </View>
            <VerticalSpacer key={`${filter}-spacer`} size={8} />
          </View>
        ))}
      </View>
    </>
  );
};

export default RemoveFilterModal;
