import { useState } from "react";
import { useTheme } from "react-native-paper";
import { Button, TextInput, IconButton, Text } from "react-native-paper";
import { Platform, View } from "react-native";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { BottomModal, OverlayModal } from "./Modals";
import { VerticalSpacer } from "../Spacers";

interface AddFilterModalProps {
  isOverlayModalVisible: boolean;
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
  onClose: () => void;
  onAddFilter: (hiveName: string) => void;
}

interface ModalContentProps {
  onClose: () => void;
  onAddFilter: (hiveName: string) => void;
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

  const [newHiveName, setNewHiveName] = useState("");

  /*
  const handleAddNewFilter = () => {
    props.onAddHive(newHiveName);
    resetHiveName();
  };

  const resetHiveName = () => setNewHiveName("");

  */
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
          Enter New Filter
        </Text>
        <IconButton
          icon="close"
          iconColor={theme.colors.onSurfaceVariant}
          onPress={props.onClose}
        />
      </View>
      <View>
        <Text style={theme.fonts.bodyLarge}>
          This feature will include much more.
        </Text>
        <VerticalSpacer size={12} />
        {/*//TODO Add more functionality to add filter. */}
        <Button mode="contained" onPress={() => null}>
          Add Filter
        </Button>
      </View>
    </>
  );
};

export default AddFilterModal;
