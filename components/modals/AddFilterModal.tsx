import { useContext, useState } from "react";
import { useTheme } from "react-native-paper";
import { Button, TextInput, IconButton, Text } from "react-native-paper";
import { Platform, View } from "react-native";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { BottomModal, OverlayModal } from "./Modals";
import { VerticalSpacer } from "../Spacers";
import { MobXProviderContext } from "mobx-react";
import { isValidString } from "@/domain/validation/stringValidation";
import { hiveViewModel } from "@/viewModels/HiveViewModel";

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
  const [isFilterValid, setIsFilterValid] = useState<boolean>();
  const [filterErrorMessage, setFilterErrorMessage] = useState<string>("");

  const handleModifyFilter = (input: string) => {
    setNewFilterName(input);

    if (isValidString(input, 1, 64)) {
      setIsFilterValid(true);
    } else {
      setIsFilterValid(false);
    }
  };

  const handleAddNewFilter = () => {
    if (isFilterValid) {
      const isFilterExist = hiveViewModel.isFilterExists(newFilterName);

      if (!isFilterExist) {
        setFilterErrorMessage("");
        props.onAddFilter(newFilterName);
        resetFilterName();
      } else {
        setFilterErrorMessage(
          userViewModel.i18n.t("filter_already_exists", {
            filterName: newFilterName,
          })
        );
      }
    } else {
      setFilterErrorMessage(userViewModel.i18n.t("invalid filter name"));
    }
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
          label={
            newFilterName.length > 64
              ? userViewModel.i18n.t("too many characters")
              : userViewModel.i18n.t("filter name") +
                (newFilterName.length >= 32
                  ? userViewModel.i18n.t("characters_remaining", {
                      character: 64 - newFilterName.length,
                    })
                  : "")
          }
          value={newFilterName}
          error={!isFilterValid}
          onChangeText={(input) => handleModifyFilter(input)}
        />

        {filterErrorMessage ? (
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
              {filterErrorMessage}
            </Text>
          </>
        ) : null}
        <VerticalSpacer size={12} />
        <Button mode="contained" onPress={handleAddNewFilter}>
          {userViewModel.i18n.t("add filter")}
        </Button>
      </View>
    </>
  );
};

export default AddFilterModal;
