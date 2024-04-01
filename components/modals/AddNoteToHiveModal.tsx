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
import { isValidString } from "@/domain/validation/stringValidation";

interface AddNoteToHiveModalProps {
  isOverlayModalVisible: boolean;
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
  onClose: () => void;
  onAddNote: (notes: HiveNote[]) => void;
}

interface ModalContentProps {
  onClose: () => void;
  onAddNote: (notes: HiveNote[]) => void;
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
  const [isNoteValid, setIsNoteValid] = useState<boolean>();
  const [noteErrorMessage, setNoteErrorMessage] = useState<string>("");

  const handleModifyNote = (input: string) => {
    setNote(input);

    if (isValidString(input, 1, 256, true, true)) {
      setIsNoteValid(true);
    } else {
      setIsNoteValid(false);
    }
  };

  const handleAddNewNote = () => {
    if (isNoteValid) {
      //TODO DB - ID might be better generated in firebase? Might be hard to refresh in the app if the
      // ID needs to be generated in firebase though.
      const hive: HiveModel = hiveViewModel.selectedHive;
      const newNote: HiveNote = {
        id: `${userViewModel.userId}-note-${Date.now()}`,
        note: note,
        isSticky: sticky,
        timestamp: new Date(Date.now()),
      };

      hive.notes.push(newNote);

      hiveViewModel.updateHive(hive);

      // Sorts notes
      props.onAddNote(hiveViewModel.selectedHive.notes);
      props.onClose();
    } else {
      setNoteErrorMessage(userViewModel.i18n.t("invalid note"));
    }
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
        <VerticalSpacer size={8} />
        <TextInput
          label={
            note.length > 256
              ? userViewModel.i18n.t("too many characters")
              : userViewModel.i18n.t("note text") +
                (note.length >= 224
                  ? userViewModel.i18n.t("characters_remaining", {
                      character: 256 - note.length,
                    })
                  : "")
          }
          value={note}
          error={!isNoteValid}
          onChangeText={(input) => handleModifyNote(input)}
        />
        {noteErrorMessage ? (
          <>
            <VerticalSpacer size={8} />
            <Text
              style={{
                ...theme.fonts.bodyLarge,
                flex: 1,
                textAlign: "center",
                color: theme.colors.error,
              }}
            >
              {noteErrorMessage}
            </Text>
          </>
        ) : null}
        <VerticalSpacer size={8} />
        <Button mode="contained" onPress={handleAddNewNote}>
          {userViewModel.i18n.t("add note")}
        </Button>
      </View>
    </>
  );
};

export default AddNoteToHiveModal;
