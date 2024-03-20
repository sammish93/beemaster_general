import { useContext, useState } from "react";
import { Checkbox, useTheme } from "react-native-paper";
import { Button, TextInput, IconButton, Text } from "react-native-paper";
import { Platform, View } from "react-native";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { BottomModal, OverlayModal } from "./Modals";
import { HorizontalSpacer, VerticalSpacer } from "../Spacers";
import { MobXProviderContext } from "mobx-react";

interface AddFiltersToHiveModalProps {
  isOverlayModalVisible: boolean;
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
  onClose: () => void;
}

interface ModalContentProps {
  onClose: () => void;
}

const AddFiltersToHiveModal = (props: AddFiltersToHiveModalProps) => {
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
  const [filterList, setFilterList] = useState<string[]>(selectedHive.filters);

  const handleAddNewFilters = () => {
    selectedHive.filters = filterList;
    hiveViewModel.updateHive(selectedHive);
    props.onClose();
  };

  const handleFilterCheckboxPress = (filter: string) => {
    if (filterList.includes(filter)) {
      setFilterList(filterList.filter((item) => item !== filter));
    } else {
      setFilterList([...filterList, filter]);
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
          {userViewModel.i18n.t("modify hive filters")}
        </Text>
        <IconButton
          icon="close"
          iconColor={theme.colors.onSurfaceVariant}
          onPress={props.onClose}
        />
      </View>
      <View>
        {hiveViewModel.filters.map((filter: string) => (
          <View
            key={`${filter}-checkbox`}
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Checkbox
              status={filterList.includes(filter) ? "checked" : "unchecked"}
              onPress={() => handleFilterCheckboxPress(filter)}
            />
            <HorizontalSpacer size={4} />
            <Text style={theme.fonts.bodyLarge}>{filter}</Text>
          </View>
        ))}
        <VerticalSpacer size={8} />
        <Button mode="contained" onPress={handleAddNewFilters}>
          {userViewModel.i18n.t("update filters")}
        </Button>
      </View>
    </>
  );
};

export default AddFiltersToHiveModal;
