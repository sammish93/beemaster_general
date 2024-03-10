import { useContext, useState } from "react";
import { useTheme } from "react-native-paper";
import { Button, TextInput, IconButton, Text } from "react-native-paper";
import { Platform, View } from "react-native";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { BottomModal, OverlayModal } from "./Modals";
import { VerticalSpacer } from "../Spacers";
import { MobXProviderContext } from "mobx-react";

interface NotificationModalProps {
    isOverlayModalVisible: boolean;
    bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
    onClose: () => void;
    onSave: (newValue: string) => void;
    parameterName: string;
}



const NotificationModal = (props: NotificationModalProps) => {
    return (() => {
        if (Platform.OS === "android" || Platform.OS === "ios") {
            return (
                <BottomModal
                    isOverlayModalVisible={props.isOverlayModalVisible}
                    bottomSheetModalRef={props.bottomSheetModalRef}
                    onClose={props.onClose}
                >
                    <ModalContent onClose={props.onClose}
                        onSave={props.onSave}
                        parameterName={props.parameterName} />
                </BottomModal>
            );
        } else {
            return (
                <OverlayModal
                    isOverlayModalVisible={props.isOverlayModalVisible}
                    bottomSheetModalRef={props.bottomSheetModalRef}
                    onClose={props.onClose}
                >
                    <ModalContent parameterName={props.parameterName}
                        onClose={props.onClose}
                        onSave={props.onSave} />
                </OverlayModal>
            );
        }
    })();
};
interface ModalContentProps {
    onClose: () => void;
    onSave: (newValue: string) => void;
    parameterName: string;
}

const ModalContent = (props: ModalContentProps & { onSave: (newValue: any) => void; parameterName: string }) => {
    const theme = useTheme();
    const userViewModel = useContext(MobXProviderContext).userViewModel;
    const [thresholdWeightDecrease, setThresholdWeightDecrease] = useState(`${userViewModel.thresholdWeightDecrease}`);
    const [earlySpringStartMonth, setEarlySpringStartMonth] = useState(`${userViewModel.earlySpringStartMonth}`);
    const [earlySpringEndMonth, setEarlySpringEndMonth] = useState(`${userViewModel.earlySpringEndMonth}`);
    const [autumnStartMonth, setAutumnStartMonth] = useState(`${userViewModel.autumnStartMonth}`);
    const [autumnEndMonth, setAutumnEndMonth] = useState(`${userViewModel.autumnEndMonth}`);
    const [thresholdExitCount, setThresholdExitCount] = useState(`${userViewModel.thresholdExitCount}`);
    const handleSave = () => {
        userViewModel.setThresholdWeightDecrease(parseFloat(thresholdWeightDecrease));
        userViewModel.setEarlySpringStartMonth(parseInt(earlySpringStartMonth, 10));
        userViewModel.setEarlySpringEndMonth(parseInt(earlySpringEndMonth, 10));
        userViewModel.setAutumnStartMonth(parseInt(autumnStartMonth, 10));
        userViewModel.setAutumnEndMonth(parseInt(autumnEndMonth, 10));
        userViewModel.setThresholdExitCount(parseInt(thresholdExitCount));
        props.onClose();
    };

    return (
        <>
            <View
                style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} >

                <Text style={{ ...theme.fonts.headlineSmall, flex: 1 }}>
                    {props.parameterName}
                </Text>
                <IconButton
                    icon="close"
                    iconColor={theme.colors.onSurfaceVariant}
                    onPress={props.onClose}
                />
            </View>


            <View>
                <Text style={{ ...theme.fonts.bodyMedium, flex: 1 }}>
                    Hive Decrease in Early spring: Adjust Early Spring Parameters
                </Text>
                <TextInput label="Threshold Weight Decrease" value={thresholdWeightDecrease} onChangeText={setThresholdWeightDecrease} keyboardType="numeric" />
                <TextInput label="Early Spring Start Month" value={earlySpringStartMonth} onChangeText={setEarlySpringStartMonth} keyboardType="numeric" />
                <TextInput label="Early Spring End Month" value={earlySpringEndMonth} onChangeText={setEarlySpringEndMonth} keyboardType="numeric" />
                <VerticalSpacer size={12} />


                <Text style={{ ...theme.fonts.bodyMedium, flex: 1 }}>
                    Hive Decreases in Autumn: Adjust Autumn Parameters
                </Text>
                <TextInput label="Threshold Weight Decrease" value={thresholdWeightDecrease} onChangeText={setThresholdWeightDecrease} keyboardType="numeric" />
                <TextInput label="Autumn Start Month" value={autumnStartMonth} onChangeText={setAutumnStartMonth} keyboardType="numeric" />
                <TextInput label="Autumn End Month" value={autumnEndMonth} onChangeText={setAutumnEndMonth} keyboardType="numeric" />
                <VerticalSpacer size={12} />


                <Text style={{ ...theme.fonts.bodyMedium, flex: 1 }}>
                    Snow Forecast in Autumn: Adjust Autumn Parameters
                </Text>
                <TextInput label="Autumn Start Month" value={autumnStartMonth} onChangeText={setAutumnStartMonth} keyboardType="numeric" />
                <TextInput label="Autumn End Month" value={autumnEndMonth} onChangeText={setAutumnEndMonth} keyboardType="numeric" />
                <VerticalSpacer size={12} />


                <Text style={{ ...theme.fonts.bodyMedium, flex: 1 }}>
                    Bee Exits is Consistently Low: Adjust Threshold Exit Parameter
                </Text>
                <TextInput label=" Count for Threshold Exit " value={thresholdExitCount} onChangeText={setThresholdExitCount} keyboardType="numeric" />
                <VerticalSpacer size={12} />


                <Button mode="contained" onPress={handleSave}>
                    {userViewModel.i18n.t("save")}
                </Button>
            </View>
        </>
    );
};

export default NotificationModal;
