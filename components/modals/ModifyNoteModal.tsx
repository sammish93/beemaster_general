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
import Toast from "react-native-toast-message";
import { toastCrossPlatform } from "../ToastCustom";

interface ModifyNoteModalProps {
  isOverlayModalVisible: boolean;
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
  onClose: () => void;
  onModifyNote: () => void;
}

interface ModalContentProps {
  onClose: () => void;
  onModifyNote: () => void;
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
  const [isNoteValid, setIsNoteValid] = useState<boolean>(true);
  const [noteErrorMessage, setNoteErrorMessage] = useState<string>("");

  const handleDeleteNote = () => {
    const note: HiveNote = hiveViewModel.getSelectedNote();

    hiveViewModel.removeNote(note.id);
    props.onModifyNote();

    Toast.show(
      toastCrossPlatform({
        title: userViewModel.i18n.t("success"),
        text: userViewModel.i18n.t("deleted note"),
        type: "success",
      })
    );

    props.onClose();
  };

  const handleModifyNote = (input: string) => {
    setNote(input);

    if (isValidString(input, 1, 256, true, true)) {
      setIsNoteValid(true);
    } else {
      setIsNoteValid(false);
    }
  };

  const handleUpdateNote = () => {
    if (isNoteValid) {
      const existingNote: HiveNote = hiveViewModel.getSelectedNote();
      const newNote: HiveNote = {
        id: existingNote.id,
        note: note,
        isSticky: sticky,
        timestamp: existingNote.timestamp,
      };

      hiveViewModel.modifyNote(newNote);

      props.onModifyNote();
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
          error={!isNoteValid}
          value={note}
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
            onPress={handleUpdateNote}
          >
            {userViewModel.i18n.t("modify note")}
          </Button>
        </View>
      </View>
    </>
  );
};

export default ModifyNoteModal;
