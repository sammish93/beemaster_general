import { useContext, useState } from "react";
import { useTheme } from "react-native-paper";
import { Button, TextInput, IconButton, Text } from "react-native-paper";
import { Platform, View } from "react-native";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { BottomModal, OverlayModal } from "./Modals";
import { VerticalSpacer } from "../Spacers";
import { MobXProviderContext } from "mobx-react";

interface AddFilterModalProps {
  isOverlayModalVisible: boolean;
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
  onClose: () => void;
  onAddFilter: (filterName: string) => void;
}

interface ModalContentProps {
  onClose: () => void;
  onAddFilter: (filterName: string) => void;
}

const AddFilterModal = (props: AddFilterModalProps) => {
  return (() => {
    if (Platform.OS === "android" || Platform.OS === "ios") {
      return (
        <BottomModal
          isOverlayModalVisible={props.isOverlayModalVisible}
          bottomSheetModalRef={props.bottomSheetModalRef}
          onClose={props.onClose}
        >
          <ModalContent
            onClose={props.onClose}
            onAddFilter={props.onAddFilter}
          />
        </BottomModal>
      );
    } else {
      return (
        <OverlayModal
          isOverlayModalVisible={props.isOverlayModalVisible}
          bottomSheetModalRef={props.bottomSheetModalRef}
          onClose={props.onClose}
        >
          <ModalContent
            onClose={props.onClose}
            onAddFilter={props.onAddFilter}
          />
        </OverlayModal>
      );
    }
  })();
};

const ModalContent = (props: ModalContentProps) => {
  const theme = useTheme();
  const { userViewModel } = useContext(MobXProviderContext);
  const [newFilterName, setNewFilterName] = useState("");

  const handleAddNewFilter = () => {
    //TODO Validation
    props.onAddFilter(newFilterName);
    resetFilterName();
  };

  const resetFilterName = () => setNewFilterName("");

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
          {userViewModel.i18n.t("enter new filter")}
        </Text>
        <IconButton
          icon="close"
          iconColor={theme.colors.onSurfaceVariant}
          onPress={props.onClose}
        />
      </View>
      <View>
        <TextInput
          label="Filter Name"
          value={newFilterName}
          onChangeText={setNewFilterName}
        />
        <VerticalSpacer size={12} />
        {/*//TODO Add more functionality to add filter. */}
        <Button mode="contained" onPress={handleAddNewFilter}>
          {userViewModel.i18n.t("add filter")}
        </Button>
      </View>
    </>
  );
};

export default AddFilterModal;
