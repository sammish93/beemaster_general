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
    const { onClose, onSave, parameterName } = props;
    const theme = useTheme();
    const userViewModel = useContext(MobXProviderContext).userViewModel;
    const [thresholdWeightDecrease, setThresholdWeightDecrease] = useState(`${userViewModel.thresholdWeightDecrease}`);
    const [earlySpringStartMonth, setEarlySpringStartMonth] = useState(`${userViewModel.earlySpringStartMonth}`);
    const [earlySpringEndMonth, setEarlySpringEndMonth] = useState(`${userViewModel.earlySpringEndMonth}`);
    const [autumnStartMonth, setAutumnStartMonth] = useState(`${userViewModel.autumnStartMonth}`);
    const [autumnEndMonth, setAutumnEndMonth] = useState(`${userViewModel.autumnEndMonth}`);
    const [thresholdExitCount, setThresholdExitCount] = useState(`${userViewModel.thresholdExitCount}`);
    const [thresholdWindSpeed, setThresholdWindSpeed] = useState(`${userViewModel.thresholdWindSpeed}`);
    const [autumnMonths, setAutumnMonths] = useState(`${userViewModel.autumnMonths}`);
    const [earlyWinterMonths, setEarlyWinterMonths] = useState(`${userViewModel.earlyWinterMonths}`);
    const [earlySpringMonths, setEarlySpringMonths] = useState(`${userViewModel.earlySpringMonths}`);
    const [thresholdTemp, setThresholdTemp] = useState(`${userViewModel.thresholdTemp}`);
    const [humidityThreshold, setHumidityThreshold] = useState(`${userViewModel.humidityThreshold}`);
    const [summerStartMonth, setSummerStartMonth] = useState(`${userViewModel.summerStartMonth}`);
    const [earlyAutumnMonth, setEarlyAutumnMonth] = useState(`${userViewModel.earlyAutumnMonth}`);
    const [thresholdWeightIncrease, setThresholdWeightIncrease] = useState(`${userViewModel.thresholdWeightIncrease}`);
    const [thresholdMaxTempChange, setThresholdMaxTempChange] = useState(`${userViewModel.thresholdMaxTempChange}`);
    const [thresholdMaxHumidityChange, setThresholdMaxHumidityChange] = useState(`${userViewModel.thresholdMaxHumidityChange}`)
    const [lateSpringStartMonth, setLateSpringStartMonth] = useState(`${userViewModel.lateSpringStartMonth}`)
    const [earlySummerEndMonth, setEarlySummerEndMonth] = useState(`${userViewModel.earlySummerEndMont}`)


    const handleSave = () => {
        switch (parameterName) {
            case userViewModel.i18n.t('weather'):
                userViewModel.setThresholdWindSpeed(parseInt(thresholdWindSpeed));
                userViewModel.setAutumnMonths(parseInt(autumnMonths));
                userViewModel.setEarlyWinterMonths(parseInt(earlyWinterMonths));
                userViewModel.setEarlySpringMonths(parseInt(earlySpringMonths));
                break;
            case userViewModel.i18n.t('potential swarm'):
                userViewModel.setThresholdWeightDecrease(parseInt(thresholdWeightDecrease));
                userViewModel.setThresholdExitCount(parseInt(thresholdExitCount));
                break;
            case userViewModel.i18n.t('consider feeding'):
                userViewModel.setThresholdWeightDecrease(parseFloat(thresholdWeightDecrease));
                userViewModel.setEarlySpringStartMonth(parseInt(earlySpringStartMonth, 10));
                userViewModel.setEarlySpringEndMonth(parseInt(earlySpringEndMonth, 10));
                userViewModel.setAutumnStartMonth(parseInt(autumnStartMonth, 10));
                userViewModel.setAutumnEndMonth(parseInt(autumnEndMonth, 10));
                userViewModel.setThresholdExitCount(parseInt(thresholdExitCount));
                break;
            case userViewModel.i18n.t('honey harvest'):
                userViewModel.setHumidityThreshold(parseInt(humidityThreshold));
                userViewModel.setThresholdTemp(parseInt(thresholdTemp));
                userViewModel.setThresholdWindSpeed(parseInt(thresholdWindSpeed));
                userViewModel.setSummerStartMonth(parseInt(summerStartMonth));
                userViewModel.setEarlyAutumnMonth(parseInt(earlyAutumnMonth));
                break;
            case userViewModel.i18n.t('maintenance'):
                userViewModel.setEarlySpringStartMonth(parseInt(earlySpringStartMonth, 10));
                userViewModel.setAutumnEndMonth(parseInt(autumnEndMonth, 10));
                userViewModel.setThresholdWindSpeed(parseInt(thresholdWindSpeed));
                userViewModel.setThresholdTemp(parseInt(thresholdTemp));
                userViewModel.setHumidityThreshold(parseInt(humidityThreshold));
                break;
            case userViewModel.i18n.t('expand hive'):
                userViewModel.setThresholdWeightIncrease(parseInt(thresholdWeightIncrease));
                break;
            case userViewModel.i18n.t('check hive'):
                userViewModel.setThresholdMaxTempChange(parseInt(thresholdMaxTempChange));
                userViewModel.setThresholdMaxHumidityChange(parseInt(thresholdMaxHumidityChange));
                userViewModel.setLateSpringStartMonth(parseInt(lateSpringStartMonth));
                userViewModel.setEarlySummerEndMonth(parseInt(earlySummerEndMonth));
                break;
            case userViewModel.i18n.t('reminder'):
                break;
            default:
                break;

        }

        props.onClose();
    };

    // Function to render content based on parameterName
    const renderContent = () => {
        switch (parameterName) {
            case userViewModel.i18n.t('weather'):
                return (
                    <View>
                        <Text style={{ ...theme.fonts.bodyMedium, flex: 1 }}>
                            Strong Wind Forecast: Threshold Parameter
                        </Text>
                        <TextInput label="Threshold Wind Speed" value={thresholdWindSpeed} onChangeText={setThresholdWindSpeed} keyboardType="numeric" />
                        <VerticalSpacer size={12} />

                        <Text style={{ ...theme.fonts.bodyMedium, flex: 1 }}>
                            'snow' is forecasted during specific seasons
                        </Text>
                        <TextInput label="Autumn Months" value={autumnMonths} onChangeText={setAutumnMonths} keyboardType="numeric" />
                        <TextInput label="Early Winter Months" value={earlyWinterMonths} onChangeText={setEarlyWinterMonths} keyboardType="numeric" />
                        <TextInput label="Early Spring Months" value={earlySpringMonths} onChangeText={setEarlySpringMonths} keyboardType="numeric" />
                        <VerticalSpacer size={12} />
                    </View>
                );
            case userViewModel.i18n.t('potential swarm'):
                return (
                    <View>
                        <Text style={{ ...theme.fonts.bodyMedium, flex: 1 }}>
                            Hive weight decreases: Threshold Parameter
                        </Text>
                        <TextInput label="thresholdWeightDecrease" value={thresholdWeightDecrease} onChangeText={setThresholdWeightDecrease} keyboardType="numeric" />

                        <Text style={{ ...theme.fonts.bodyMedium, flex: 1 }}>
                            Number of bees have been exiting the hive: Threshold Parameter
                        </Text>
                        <TextInput label="thresholdExitCount" value={thresholdExitCount} onChangeText={setThresholdWeightIncrease} keyboardType="numeric" />

                    </View>
                );
            case userViewModel.i18n.t('honey harvest'):
                return (
                    <View>
                        <Text style={{ ...theme.fonts.bodyMedium, flex: 1 }}>
                            Warm, dry days with low wind speed between summer and early autumn
                        </Text>
                        <TextInput label="Threshold Wind Speed" value={thresholdWindSpeed} onChangeText={setThresholdWindSpeed} keyboardType="numeric" />
                        <TextInput label="Threshold Temperature" value={thresholdTemp} onChangeText={setThresholdTemp} keyboardType="numeric" />
                        <TextInput label="Humidity Threshold %" value={humidityThreshold} onChangeText={setHumidityThreshold} keyboardType="numeric" />
                        <TextInput label="Early Autumn Month" value={earlyAutumnMonth} onChangeText={setEarlyAutumnMonth} keyboardType="numeric" />
                        <TextInput label="Summer Start Month" value={summerStartMonth} onChangeText={setSummerStartMonth} keyboardType="numeric" />

                        <VerticalSpacer size={12} />
                    </View>
                );
            case userViewModel.i18n.t('maintenance'):
                return (
                    <View>
                        <Text style={{ ...theme.fonts.bodyMedium, flex: 1 }}>
                            Warm and/or Dry Days With Low Wind Speed between early spring and late autumn
                        </Text>
                        <TextInput label="Early Spring Start Month" value={earlySpringStartMonth} onChangeText={setEarlySpringStartMonth} keyboardType="numeric" />
                        <TextInput label="Autumn End Month" value={autumnEndMonth} onChangeText={setAutumnEndMonth} keyboardType="numeric" />
                        <TextInput label="Threshold Wind Speed" value={thresholdWindSpeed} onChangeText={setThresholdWindSpeed} keyboardType="numeric" />
                        <TextInput label="Threshold Temperature" value={thresholdTemp} onChangeText={setThresholdTemp} keyboardType="numeric" />
                        <TextInput label="Humidity Threshold %" value={humidityThreshold} onChangeText={setHumidityThreshold} keyboardType="numeric" />
                        <VerticalSpacer size={12} />

                    </View>
                );
            case userViewModel.i18n.t('expand hive'):
                return (
                    <View>
                        <Text style={{ ...theme.fonts.bodyMedium, flex: 1 }}>
                            Hive Weight Increases: Threshold Parameter
                        </Text>
                        <TextInput label="Threshold Weight Parameter Increase" value={thresholdWeightIncrease} onChangeText={setThresholdWeightIncrease} keyboardType="numeric" />
                    </View>
                );

            case userViewModel.i18n.t('check hive'):
                return (
                    <View>
                        <Text style={{ ...theme.fonts.bodyMedium, flex: 1 }}>
                            Hive temperature increases or decreases: Threshold Parameter
                        </Text>
                        <TextInput label="Threshold Max Temperature Change" value={thresholdMaxTempChange} onChangeText={setThresholdMaxTempChange} keyboardType="numeric" />
                        <Text style={{ ...theme.fonts.bodyMedium, flex: 1 }}>
                            Humidity increases or decreases : Threshold Parameter
                        </Text>
                        <TextInput label="Threshold Max Humidity Change" value={thresholdMaxHumidityChange} onChangeText={setThresholdMaxHumidityChange} keyboardType="numeric" />
                        <Text style={{ ...theme.fonts.bodyMedium, flex: 1 }}>
                            The risk of swarming: Threshold Parameter for late spring and early summer
                        </Text>
                        <TextInput label="Late Spring Start Month" value={lateSpringStartMonth} onChangeText={setLateSpringStartMonth} keyboardType="numeric" />
                        <TextInput label="Early Summer End Month" value={earlySummerEndMonth} onChangeText={setEarlySummerEndMonth} keyboardType="numeric" />
                    </View>
                );
            case userViewModel.i18n.t('reminder'):
                return (
                    <View>
                        {/* Input fields and content specific to "Potensiell sverm" */}
                    </View>
                );
            case userViewModel.i18n.t('consider feeding'):
                return (
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
                    </View>
                );
            // More cases as per your notification types
            default:
                return <View><Text>Ukjent parameter</Text></View>;
        }
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

            {renderContent()}
            <VerticalSpacer size={12} />
            <Button mode="contained" onPress={handleSave}>
                {userViewModel.i18n.t("save")}
            </Button>

        </>
    );
};

export default NotificationModal;
