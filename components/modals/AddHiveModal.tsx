import { useContext, useState } from "react";
import { useTheme } from "react-native-paper";
import { Button, TextInput, IconButton, Text } from "react-native-paper";
import { Platform, View } from "react-native";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { BottomModal, OverlayModal } from "./Modals";
import { VerticalSpacer } from "../Spacers";
import { MobXProviderContext } from "mobx-react";

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
  const { userViewModel } = useContext(MobXProviderContext);
  const [newHiveName, setNewHiveName] = useState("");

  const handleAddNewHive = () => {
    //TODO Validation
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
          {userViewModel.i18n.t("enter new hive information")}
        </Text>
        <IconButton
          icon="close"
          iconColor={theme.colors.onSurfaceVariant}
          onPress={props.onClose}
        />
      </View>
      <View>
        <TextInput
          label={userViewModel.i18n.t("hive name")}
          value={newHiveName}
          onChangeText={setNewHiveName}
        />
        <VerticalSpacer size={12} />
        <Text style={theme.fonts.bodyLarge}>
          This feature will include much more.
        </Text>
        <Text style={theme.fonts.bodyLarge}>
          This feature will include much more.
        </Text>{" "}
        <Text style={theme.fonts.bodyLarge}>
          This feature will include much more.
        </Text>{" "}
        <Text style={theme.fonts.bodyLarge}>
          This feature will include much more.
        </Text>{" "}
        <Text style={theme.fonts.bodyLarge}>
          This feature will include much more.
        </Text>{" "}
        <Text style={theme.fonts.bodyLarge}>
          This feature will include much more.
        </Text>{" "}
        <Text style={theme.fonts.bodyLarge}>
          This feature will include much more.
        </Text>{" "}
        <Text style={theme.fonts.bodyLarge}>
          This feature will include much more.
        </Text>{" "}
        <Text style={theme.fonts.bodyLarge}>
          This feature will include much more.
        </Text>{" "}
        <Text style={theme.fonts.bodyLarge}>
          This feature will include much more.
        </Text>{" "}
        <Text style={theme.fonts.bodyLarge}>
          This feature will include much more.
        </Text>{" "}
        <Text style={theme.fonts.bodyLarge}>
          This feature will include much more.
        </Text>{" "}
        <Text style={theme.fonts.bodyLarge}>
          This feature will include much more.
        </Text>{" "}
        <Text style={theme.fonts.bodyLarge}>
          This feature will include much more.
        </Text>{" "}
        <Text style={theme.fonts.bodyLarge}>
          This feature will include much more.
        </Text>{" "}
        <Text style={theme.fonts.bodyLarge}>
          This feature will include much more.
        </Text>{" "}
        <Text style={theme.fonts.bodyLarge}>
          This feature will include much more.
        </Text>{" "}
        <Text style={theme.fonts.bodyLarge}>
          This feature will include much more.
        </Text>{" "}
        <Text style={theme.fonts.bodyLarge}>
          This feature will include much more.
        </Text>{" "}
        <Text style={theme.fonts.bodyLarge}>
          This feature will include much more.
        </Text>{" "}
        <Text style={theme.fonts.bodyLarge}>
          This feature will include much more.
        </Text>{" "}
        <Text style={theme.fonts.bodyLarge}>
          This feature will include much more.
        </Text>{" "}
        <Text style={theme.fonts.bodyLarge}>
          This feature will include much more.
        </Text>{" "}
        <Text style={theme.fonts.bodyLarge}>
          This feature will include much more.
        </Text>{" "}
        <Text style={theme.fonts.bodyLarge}>
          This feature will include much more.
        </Text>{" "}
        <Text style={theme.fonts.bodyLarge}>
          This feature will include much more.
        </Text>{" "}
        <Text style={theme.fonts.bodyLarge}>
          This feature will include much more.
        </Text>{" "}
        <Text style={theme.fonts.bodyLarge}>
          This feature will include much more.
        </Text>{" "}
        <Text style={theme.fonts.bodyLarge}>
          This feature will include much more.
        </Text>{" "}
        <Text style={theme.fonts.bodyLarge}>
          This feature will include much more.
        </Text>{" "}
        <Text style={theme.fonts.bodyLarge}>
          This feature will include much more.
        </Text>{" "}
        <Text style={theme.fonts.bodyLarge}>
          This feature will include much more.
        </Text>{" "}
        <Text style={theme.fonts.bodyLarge}>
          This feature will include much more.
        </Text>{" "}
        <Text style={theme.fonts.bodyLarge}>
          This feature will include much more.
        </Text>{" "}
        <Text style={theme.fonts.bodyLarge}>
          This feature will include much more.
        </Text>{" "}
        <Text style={theme.fonts.bodyLarge}>
          This feature will include much more.
        </Text>{" "}
        <Text style={theme.fonts.bodyLarge}>
          This feature will include much more.
        </Text>{" "}
        <Text style={theme.fonts.bodyLarge}>
          This feature will include much more.
        </Text>{" "}
        <Text style={theme.fonts.bodyLarge}>
          This feature will include much more.
        </Text>{" "}
        <Text style={theme.fonts.bodyLarge}>
          This feature will include much more.
        </Text>{" "}
        <Text style={theme.fonts.bodyLarge}>
          This feature will include much more.
        </Text>{" "}
        <Text style={theme.fonts.bodyLarge}>
          This feature will include much more.
        </Text>{" "}
        <Text style={theme.fonts.bodyLarge}>
          This feature will include much more.
        </Text>{" "}
        <Text style={theme.fonts.bodyLarge}>
          This feature will include much more.
        </Text>{" "}
        <Text style={theme.fonts.bodyLarge}>
          This feature will include much more.
        </Text>{" "}
        <Text style={theme.fonts.bodyLarge}>
          This feature will include much more.
        </Text>{" "}
        <Text style={theme.fonts.bodyLarge}>
          This feature will include much more.
        </Text>
        <VerticalSpacer size={12} />
        <Button mode="contained" onPress={handleAddNewHive}>
          {userViewModel.i18n.t("add hive")}
        </Button>
        {/*//TODO Add more functionality to add hive.*/}
      </View>
    </>
  );
};

export default AddHiveModal;
