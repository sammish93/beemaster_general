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

interface ModifyNoteModalProps {
  isOverlayModalVisible: boolean;
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
  onClose: () => void;
  onModifyNote: (notes: HiveNote[]) => void;
}

interface ModalContentProps {
  onClose: () => void;
  onModifyNote: (notes: HiveNote[]) => void;
}

const ModifyNoteModal = (props: ModifyNoteModalProps) => {
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
            onModifyNote={props.onModifyNote}
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
            onModifyNote={props.onModifyNote}
          />
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
  const [sticky, setSticky] = useState<boolean>(
    hiveViewModel.getSelectedNote().isSticky
  );
  const [note, setNote] = useState<string>(
    hiveViewModel.getSelectedNote().note
  );

  const handleDeleteNote = () => {
    //TODO Db writing and modify ID
    const note: HiveNote = hiveViewModel.selectedNote;

    hiveViewModel.removeNote(note.id);

    props.onModifyNote(hiveViewModel.selectedHive.notes);
    props.onClose();
  };

  const handleModifyNote = () => {
    //TODO Db writing and modify ID
    const existingNote: HiveNote = hiveViewModel.selectedNote;
    const newNote: HiveNote = {
      id: existingNote.id,
      note: note,
      isSticky: sticky,
      timestamp: existingNote.timestamp,
    };

    hiveViewModel.modifyNote(newNote);

    props.onModifyNote(hiveViewModel.selectedHive.notes);
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
          {userViewModel.i18n.t("modify an existing note")}
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
        <VerticalSpacer size={8} />
        <TextInput
          label={userViewModel.i18n.t("note text")}
          value={note}
          onChangeText={setNote}
        />
        <VerticalSpacer size={8} />
        <View style={{ flexDirection: "row" }}>
          <Button
            mode="contained"
            style={{ backgroundColor: theme.colors.error, flex: 1 }}
            textColor={theme.colors.onError}
            onPress={handleDeleteNote}
          >
            {userViewModel.i18n.t("delete note")}
          </Button>
          <HorizontalSpacer size={4} />
          <Button
            mode="contained"
            style={{ flex: 1 }}
            onPress={handleModifyNote}
          >
            {userViewModel.i18n.t("modify note")}
          </Button>
        </View>
      </View>
    </>
  );
};

export default ModifyNoteModal;
