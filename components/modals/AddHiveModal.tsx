import { useState } from "react";
import { useTheme } from "react-native-paper";
import { Button, TextInput, IconButton, Text } from "react-native-paper";
import { Platform, View } from "react-native";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { BottomModal, OverlayModal } from "./Modals";
import { VerticalSpacer } from "../Spacers";

interface AddHiveModalProps {
  isOverlayModalVisible: boolean;
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
  onClose: () => void;
  onAddHive: (hiveName: string) => void;
}

interface ModalContentProps {
  onClose: () => void;
  onAddHive: (hiveName: string) => void;
}

const AddHiveModal = (props: AddHiveModalProps) => {
  return (() => {
    if (Platform.OS === "android" || Platform.OS === "ios") {
      return (
        <BottomModal
          isOverlayModalVisible={props.isOverlayModalVisible}
          bottomSheetModalRef={props.bottomSheetModalRef}
          onClose={props.onClose}
        >
          <ModalContent onClose={props.onClose} onAddHive={props.onAddHive} />
        </BottomModal>
      );
    } else {
      return (
        <OverlayModal
          isOverlayModalVisible={props.isOverlayModalVisible}
          bottomSheetModalRef={props.bottomSheetModalRef}
          onClose={props.onClose}
        >
          <ModalContent onClose={props.onClose} onAddHive={props.onAddHive} />
        </OverlayModal>
      );
    }
  })();
};

const ModalContent = (props: ModalContentProps) => {
  const theme = useTheme();

  const [newHiveName, setNewHiveName] = useState("");

  const handleAddNewHive = () => {
    props.onAddHive(newHiveName);
    resetHiveName();
  };

  const resetHiveName = () => setNewHiveName("");

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
          Enter New Hive Information
        </Text>
        <IconButton
          icon="close"
          iconColor={theme.colors.onSurfaceVariant}
          onPress={props.onClose}
        />
      </View>
      <View>
        <VerticalSpacer size={12} />
        <TextInput
          label="Hive Name"
          value={newHiveName}
          onChangeText={setNewHiveName}
        />
        <VerticalSpacer size={12} />
        <Text style={theme.fonts.bodyLarge}>
          This feature will include much more.
        </Text>
        <VerticalSpacer size={12} />
        <Button mode="contained" onPress={handleAddNewHive}>
          Add Hive
        </Button>
        {/*//TODO Add more functionality to add hive.*/}
      </View>
    </>
  );
};

export default AddHiveModal;
