import React, { useContext, useState } from "react";
import { useTheme } from "react-native-paper";
import { Button, TextInput, IconButton, Text } from "react-native-paper";
import { Platform, View } from "react-native";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { BottomModal, OverlayModal } from "./Modals";
import { MobXProviderContext } from "mobx-react";

interface AddFilterModalProps {
    isOverlayModalVisible: boolean;
    bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
    onClose: () => void;
    onSave: (newValue: string) => void;
    parameterName: string;
}

interface ModalContentProps {
    onClose: () => void;
    onSave: (newValue: string) => void;
    parameterName: string;
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
                        onSave={props.onSave}
                        parameterName={props.parameterName}
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
                        onSave={props.onSave}
                        parameterName={props.parameterName}
                    />
                </OverlayModal>
            );
        }
    })();
};

const ModalContent = (props: ModalContentProps & { onSave: (newValue: any) => void; parameterName: string }) => {
    const theme = useTheme();
    const { userViewModel } = useContext(MobXProviderContext);
    const [newValue, setNewValue] = useState("");

    const handleSave = () => {
        // Implement validation if needed
        props.onSave(newValue);
        props.onClose();
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
                    {userViewModel.i18n.t("change parameter")}: {props.parameterName}
                </Text>
                <IconButton
                    icon="close"
                    iconColor={theme.colors.onSurfaceVariant}
                    onPress={props.onClose}
                />
            </View>
            <View>
                <TextInput
                    label={props.parameterName}
                    value={newValue}
                    onChangeText={setNewValue}
                    keyboardType="numeric"
                />
                <Button mode="contained" onPress={handleSave}>
                    {userViewModel.i18n.t("save")}
                </Button>
            </View>
        </>
    );
};

export default AddFilterModal;
