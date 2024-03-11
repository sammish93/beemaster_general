import { useContext, useState } from "react";
import { Checkbox, useTheme } from "react-native-paper";
import { Button, TextInput, IconButton, Text } from "react-native-paper";
import { Platform, View } from "react-native";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { BottomModal, OverlayModal } from "./Modals";
import { HorizontalSpacer, VerticalSpacer } from "../Spacers";
import { MobXProviderContext } from "mobx-react";
import { HiveModel } from "@/models/hiveModel";
import { HiveNote } from "@/models/note";

interface AddNoteToHiveModalProps {
  isOverlayModalVisible: boolean;
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
  onClose: () => void;
  onAddNote: (notes: HiveNote[]) => HiveNote[];
}

interface ModalContentProps {
  onClose: () => void;
  onAddNote: (notes: HiveNote[]) => HiveNote[];
}

const AddNoteToHiveModal = (props: AddNoteToHiveModalProps) => {
  return (() => {
    if (Platform.OS === "android" || Platform.OS === "ios") {
      return (
        <BottomModal
          isOverlayModalVisible={props.isOverlayModalVisible}
          bottomSheetModalRef={props.bottomSheetModalRef}
          onClose={props.onClose}
        >
          <ModalContent onClose={props.onClose} onAddNote={props.onAddNote} />
        </BottomModal>
      );
    } else {
      return (
        <OverlayModal
          isOverlayModalVisible={props.isOverlayModalVisible}
          bottomSheetModalRef={props.bottomSheetModalRef}
          onClose={props.onClose}
        >
          <ModalContent onClose={props.onClose} onAddNote={props.onAddNote} />
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
  const [sticky, setSticky] = useState<boolean>(false);
  const [note, setNote] = useState<string>("");

  const handleAddNewNote = () => {
    //TODO Db writing and modify ID
    const hive: HiveModel = hiveViewModel.selectedHive;
    const newNote: HiveNote = {
      id: "test-abc-123",
      note: note,
      isSticky: sticky,
      timestamp: new Date(Date.now()),
    };

    hive.notes.push(newNote);
    hive.notes = props.onAddNote(hive.notes);

    hiveViewModel.addSelectedHive(hive);

    props.onClose();
  };

  const handleStickyCheckboxPress = (isSticky: boolean) => {
    setSticky(isSticky);
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
          {userViewModel.i18n.t("add a new note")}
        </Text>
        <IconButton
          icon="close"
          iconColor={theme.colors.onSurfaceVariant}
          onPress={props.onClose}
        />
      </View>
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Checkbox
            status={sticky ? "checked" : "unchecked"}
            onPress={() => handleStickyCheckboxPress(!sticky)}
          />
          <HorizontalSpacer size={4} />
          <Text style={theme.fonts.bodyLarge}>
            {userViewModel.i18n.t("pinned note")}
          </Text>
        </View>
        <TextInput
          label={userViewModel.i18n.t("note text")}
          value={note}
          onChangeText={setNote}
        />
        <Button mode="contained" onPress={handleAddNewNote}>
          {userViewModel.i18n.t("add note")}
        </Button>
      </View>
    </>
  );
};

export default AddNoteToHiveModal;
