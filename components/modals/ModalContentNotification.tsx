import React, { useContext, useState } from "react";
import { Text, Button, TextInput, IconButton, useTheme, Modal, Portal } from "react-native-paper";
import { MobXProviderContext } from "mobx-react";
import DatePickerModal from "./DatePickerModal";
import { VerticalSpacer } from "../Spacers";
import { Calendar } from 'react-native-calendars';
import { View } from "react-native";


interface ModalContentProps {
    onClose: () => void;
    onSave: (newValue: string) => void;
    parameterName: string;

}


const ModalContent = (props: ModalContentProps) => {
    const { onClose, onSave, parameterName } = props;
    const theme = useTheme();
    const userViewModel = useContext(MobXProviderContext).userViewModel;

    //Thresholds
    const [thresholdWeightDecreaseInAutumn, setThresholdWeightDecreaseInAutumn] = useState(`${userViewModel.thresholdWeightDecreaseInAutumn}`);
    const [thresholdWeightDecreaseEarlySpring, setThresholdWeightDecreaseEarlySpring] = useState(`${userViewModel.thresholdWeightDecreaseEarlySpring}`);
    const [thresholdWeightDecreaseSwarm, setThresholdWeightDecreaseSwarm] = useState(`${userViewModel.thresholdWeightDecreaseSwarm}`);
    const [thresholdExitCountHigh, setThresholdExitCountHigh] = useState(`${userViewModel.thresholdExitCountHigh}`);
    const [thresholdExitCountLow, setThresholdExitCountLow] = useState(`${userViewModel.thresholdExitCountLow}`);
    const [thresholdWindSpeedStrong, setThresholdWindSpeedStrong] = useState(`${userViewModel.thresholdWindSpeedStrong}`);
    const [thresholdWindSpeedLow, setThresholdWindSpeedLow] = useState(`${userViewModel.thresholdWindSpeedLow}`);
    const [thresholdTempWarm, setThresholdTempWarm] = useState(`${userViewModel.thresholdTempWarm}`);
    const [thresholdWeightIncrease, setThresholdWeightIncrease] = useState(`${userViewModel.thresholdWeightIncrease}`);
    const [thresholdMaxTempChange, setThresholdMaxTempChange] = useState(`${userViewModel.thresholdMaxTempChange}`);
    const [thresholdMaxHumidityChange, setThresholdMaxHumidityChange] = useState(`${userViewModel.thresholdMaxHumidityChange}`);
    const [humidityThreshold, setHumidityThreshold] = useState(`${userViewModel.humidityThreshold}`);

    //Spring
    const [earlySpringStartMonth, setEarlySpringStartMonth] = useState(`${userViewModel.earlySpringStartMonth}`);
    const [earlySpringEndMonth, setEarlySpringEndMonth] = useState(`${userViewModel.earlySpringEndMonth}`);
    const [earlySpringMonths, setEarlySpringMonths] = useState(`${userViewModel.earlySpringMonths}`);
    const [lateSpringStartMonth, setLateSpringStartMonth] = useState(`${userViewModel.lateSpringStartMonth}`);

    //Autumn
    const [autumnStartMonth, setAutumnStartMonth] = useState(`${userViewModel.autumnStartMonth}`);
    const [autumnEndMonth, setAutumnEndMonth] = useState(`${userViewModel.autumnEndMonth}`);
    const [autumnMonths, setAutumnMonths] = useState(`${userViewModel.autumnMonths}`);
    const [earlyAutumnMonth, setEarlyAutumnMonth] = useState(`${userViewModel.earlyAutumnMonth}`);

    //Winter
    const [earlyWinterMonths, setEarlyWinterMonths] = useState(`${userViewModel.earlyWinterMonths}`);

    //Summer
    const [summerStartMonth, setSummerStartMonth] = useState(`${userViewModel.summerStartMonth}`);
    const [earlySummerEndMonth, setEarlySummerEndMonth] = useState(`${userViewModel.earlySummerEndMonth}`);

    const getSaveAction = (parameterName: any) => {
        const translations = {
            weather: userViewModel.i18n.t('weather'),
            potentialSwarm: userViewModel.i18n.t('potential swarm'),
            considerFeeding: userViewModel.i18n.t('consider feeding'),
            honeyHarvest: userViewModel.i18n.t('honey harvest'),
            maintenance: userViewModel.i18n.t('maintenance'),
            expandHive: userViewModel.i18n.t('expand hive'),
            checkHive: userViewModel.i18n.t('check hive'),
            reminder: userViewModel.i18n.t('reminder')

        };
        const actions = {
            [translations.weather]: () => {
                userViewModel.setThresholdWindSpeedStrong(parseInt(thresholdWindSpeedStrong));
                userViewModel.setAutumnMonths(parseInt(autumnMonths));
                userViewModel.setEarlyWinterMonths(parseInt(earlyWinterMonths));
                userViewModel.setEarlySpringMonths(parseInt(earlySpringMonths));

            },
            [translations.potentialSwarm]: () => {
                userViewModel.setThresholdWeightDecreaseSwarm(parseInt(thresholdWeightDecreaseSwarm));
                userViewModel.setThresholdExitCountHigh(parseInt(thresholdExitCountHigh));

            },
            [translations.considerFeeding]: () => {
                userViewModel.setThresholdWeightDecreaseEarlySpring(parseFloat(thresholdWeightDecreaseEarlySpring));
                userViewModel.setEarlySpringStartMonth(parseInt(earlySpringStartMonth, 10));
                userViewModel.setEarlySpringEndMonth(parseInt(earlySpringEndMonth, 10));
                userViewModel.setAutumnStartMonth(parseInt(autumnStartMonth, 10));
                userViewModel.setAutumnEndMonth(parseInt(autumnEndMonth, 10));
                userViewModel.setThresholdExitCountLow(parseInt(thresholdExitCountLow));
            },
            [translations.honeyHarvest]: () => {
                userViewModel.setHumidityThreshold(parseInt(humidityThreshold));
                userViewModel.setThresholdTempWarm(parseInt(thresholdTempWarm));
                userViewModel.setThresholdWindSpeedLow(parseInt(thresholdWindSpeedLow));
                userViewModel.setSummerStartMonth(parseInt(summerStartMonth));
                userViewModel.setEarlyAutumnMonth(parseInt(earlyAutumnMonth));

            },
            [translations.maintenance]: () => {
                userViewModel.setEarlySpringStartMonth(parseInt(earlySpringStartMonth, 10));
                userViewModel.setAutumnEndMonth(parseInt(autumnEndMonth, 10));
                userViewModel.setThresholdWindSpeedLow(parseInt(thresholdWindSpeedLow));
                userViewModel.setThresholdTempWarm(parseInt(thresholdTempWarm));
                userViewModel.setHumidityThreshold(parseInt(humidityThreshold));

            },
            [translations.expandHive]: () => {
                userViewModel.setThresholdWeightIncrease(parseInt(thresholdWeightIncrease));

            },
            [translations.checkHive]: () => {
                userViewModel.setThresholdMaxTempChange(parseInt(thresholdMaxTempChange));
                userViewModel.setThresholdMaxHumidityChange(parseInt(thresholdMaxHumidityChange));
                userViewModel.setLateSpringStartMonth(parseInt(lateSpringStartMonth));
                userViewModel.setEarlySummerEndMonth(parseInt(earlySummerEndMonth));
            },
            [translations.reminder]: () => {

            },

        };
        return actions[parameterName];
    };

    const handleSave = () => {
        const action = getSaveAction(parameterName);
        if (action) {
            action();
        } else {
            console.log('Unknown parameterName:', parameterName);
        }
        props.onClose();

    };


    //One month
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const [activeField, setActiveField] = useState('');

    const onConfirm = (selectedDate: Date) => {
        const selectedMonth = selectedDate.getMonth() + 1;
        switch (activeField) {
            case 'earlyAutumnMonth':
                setEarlyAutumnMonth(selectedMonth.toString());
                break;
            case 'summerStartMonth':
                setSummerStartMonth(selectedMonth.toString());
                break;
            case 'earlySpringStartMonth':
                setEarlySpringStartMonth(selectedMonth.toString());
                break;
            case 'autumnEndMonth':
                setAutumnEndMonth(selectedMonth.toString());
                break;
            case 'lateSpringStartMonth':
                setLateSpringStartMonth(selectedMonth.toString());
                break;
            case 'earlySummerEndMonth':
                setEarlySummerEndMonth(selectedMonth.toString());
                break;
            case 'earlySpringEndMonth':
                setEarlySpringEndMonth(selectedMonth.toString());
                break;
            case 'autumnStartMonth':
                setAutumnStartMonth(selectedMonth.toString());
                break;
            case 'autumnStartMonth':
                setAutumnStartMonth(selectedMonth.toString());
                break;

            default:
                console.log('unknown error');
        }
        setDatePickerVisible(false);
    };


    //More than one month
    const [isCalendarModalVisible, setCalendarModalVisible] = useState(false);
    const [markedDates, setMarkedDates] = useState({});
    const [selectedMonths, setSelectedMonths] = useState({});
    const [activeField2, setActiveField2] = useState('');

    const onDayPress = (day: { dateString: string; }) => {
        const newMarkedDates = { ...markedDates, [day.dateString]: { selected: true } };
        setMarkedDates(newMarkedDates);
    };

    const openCalendarModal = (field: string) => {
        setActiveField2(field);
        setCalendarModalVisible(true);
    };
    const onConfirmSelection = () => {

        const months = Object.keys(markedDates).map(date => new Date(date).getMonth() + 1);
        const monthsString = months.join(',');

        setSelectedMonths(prev => ({ ...prev, [activeField]: monthsString }));


        switch (activeField2) {
            case 'autumnMonths':
                setAutumnMonths(monthsString);
                break;
            case 'earlyWinterMonths':
                setEarlyWinterMonths(monthsString);
                break;
            case 'earlySpringMonths':
                setEarlySpringMonths(monthsString);
                break;

        }
        setCalendarModalVisible(false)
    };



    //TODO:Add Translation
    const renderContent = () => {
        switch (parameterName) {
            case userViewModel.i18n.t('weather'):
                return (
                    <View>
                        <Text style={{ ...theme.fonts.bodyMedium, flex: 1 }}>
                            Strong Wind Forecast: Threshold Parameter
                        </Text>
                        <TextInput label="Threshold Wind Speed" value={thresholdWindSpeedStrong} onChangeText={setThresholdWindSpeedStrong} keyboardType="numeric" />
                        <VerticalSpacer size={12} />

                        <Text style={{ ...theme.fonts.bodyMedium, flex: 1 }}>
                            'snow' is forecasted during specific seasons
                        </Text>
                        <TextInput label="Autumn Months" value={autumnMonths} onChangeText={setAutumnMonths} keyboardType="numeric" />
                        <Button mode="contained" onPress={() => openCalendarModal('autumnMonths')}>
                            Set Autumn Months
                        </Button>

                        <TextInput label="Early Winter Months" value={earlyWinterMonths} onChangeText={setEarlyWinterMonths} keyboardType="numeric" />
                        <Button mode="contained" onPress={() => openCalendarModal('earlyWinterMonths')}>
                            Set Autumn Months
                        </Button>
                        <TextInput label="Early Spring Months" value={earlySpringMonths} onChangeText={setEarlySpringMonths} keyboardType="numeric" />
                        <Button mode="contained" onPress={() => openCalendarModal('earlySpringMonths')}>
                            Set Autumn Months
                        </Button>
                        <VerticalSpacer size={12} />

                    </View>
                );
            case userViewModel.i18n.t('potential swarm'):
                return (
                    <View>
                        <Text style={{ ...theme.fonts.bodyMedium, flex: 1 }}>
                            Hive weight decreases: Threshold Parameter
                        </Text>
                        <TextInput label="Threshold Weight Decrease" value={thresholdWeightDecreaseSwarm} onChangeText={setThresholdWeightDecreaseSwarm} keyboardType="numeric" />

                        <Text style={{ ...theme.fonts.bodyMedium, flex: 1 }}>
                            Number of bees have been exiting the hive: Threshold Parameter
                        </Text>
                        <TextInput label="Threshold Exit Count" value={thresholdExitCountHigh} onChangeText={setThresholdExitCountHigh} keyboardType="numeric" />

                    </View>
                );
            case userViewModel.i18n.t('honey harvest'):
                return (
                    <View>
                        <Text style={{ ...theme.fonts.bodyMedium, flex: 1 }}>
                            Warm, dry days with low wind speed between summer and early autumn
                        </Text>
                        <TextInput label="Threshold Wind Speed" value={thresholdWindSpeedLow} onChangeText={setThresholdWindSpeedLow} keyboardType="numeric" />
                        <TextInput label="Threshold Temperature" value={thresholdTempWarm} onChangeText={setThresholdTempWarm} keyboardType="numeric" />
                        <TextInput label="Humidity Threshold %" value={humidityThreshold} onChangeText={setHumidityThreshold} keyboardType="numeric" />
                        <TextInput label="Early Autumn Month" value={earlyAutumnMonth} onChangeText={setEarlyAutumnMonth} keyboardType="numeric" />
                        <Button mode="contained" onPress={() => { setActiveField('earlyAutumnMonth'); setDatePickerVisible(true); }}>Set Early Autumn Month</Button>

                        <TextInput label="Summer Start Month" value={summerStartMonth} onChangeText={setSummerStartMonth} keyboardType="numeric" />
                        <Button mode="contained" onPress={() => { setActiveField('summerStartMonth'); setDatePickerVisible(true); }}>Set Summer Start Month</Button>

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
                        <Button mode="contained" onPress={() => { setActiveField('earlySpringStartMonth'); setDatePickerVisible(true); }}>Set Early Spring Start Month</Button>

                        <TextInput label="Autumn End Month" value={autumnEndMonth} onChangeText={setAutumnEndMonth} keyboardType="numeric" />
                        <Button mode="contained" onPress={() => { setActiveField('autumnEndMonth'); setDatePickerVisible(true); }}>Set Autumn End Month</Button>

                        <TextInput label="Threshold Wind Speed" value={thresholdWindSpeedLow} onChangeText={setThresholdWindSpeedLow} keyboardType="numeric" />
                        <TextInput label="Threshold Temperature" value={thresholdTempWarm} onChangeText={setThresholdTempWarm} keyboardType="numeric" />
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
                        <Button mode="contained" onPress={() => { setActiveField('lateSpringStartMonth'); setDatePickerVisible(true); }}>Set Late Spring Start Month</Button>

                        <TextInput label="Early Summer End Month" value={earlySummerEndMonth} onChangeText={setEarlySummerEndMonth} keyboardType="numeric" />
                        <Button mode="contained" onPress={() => { setActiveField('earlySummerEndMonth'); setDatePickerVisible(true); }}>Set Early Summer End Month</Button>

                    </View>
                );

            case userViewModel.i18n.t('consider feeding'):
                return (
                    <View>
                        <Text style={{ ...theme.fonts.bodyMedium, flex: 1 }}>
                            Hive Decrease in Early spring: Adjust Early Spring Parameters
                        </Text>
                        <TextInput label="Threshold Weight Decrease" value={thresholdWeightDecreaseEarlySpring} onChangeText={setThresholdWeightDecreaseEarlySpring} keyboardType="numeric" />
                        <TextInput label="Early Spring Start Month" value={earlySpringStartMonth} onChangeText={setEarlySpringStartMonth} keyboardType="numeric" />
                        <Button mode="contained" onPress={() => { setActiveField('earlySpringStartMonth'); setDatePickerVisible(true); }}>Set Early Spring Start Month</Button>

                        <TextInput label="Early Spring End Month" value={earlySpringEndMonth} onChangeText={setEarlySpringEndMonth} keyboardType="numeric" />
                        <Button mode="contained" onPress={() => { setActiveField('earlySpringEndMonth'); setDatePickerVisible(true); }}>Set Early Spring End Month</Button>

                        <VerticalSpacer size={12} />


                        <Text style={{ ...theme.fonts.bodyMedium, flex: 1 }}>
                            Hive Decreases in Autumn: Adjust Autumn Parameters
                        </Text>
                        <TextInput label="Threshold Weight Decrease" value={thresholdWeightDecreaseInAutumn} onChangeText={setThresholdWeightDecreaseInAutumn} keyboardType="numeric" />
                        <TextInput label="Autumn Start Month" value={autumnStartMonth} onChangeText={setAutumnStartMonth} keyboardType="numeric" />
                        <Button mode="contained" onPress={() => { setActiveField('autumnStartMonth'); setDatePickerVisible(true); }}>Set Autumn Start Month</Button>

                        <TextInput label="Autumn End Month" value={autumnEndMonth} onChangeText={setAutumnEndMonth} keyboardType="numeric" />
                        <Button mode="contained" onPress={() => { setActiveField('autumnEndMonth'); setDatePickerVisible(true); }}>Set Autumn End Month</Button>

                        <VerticalSpacer size={12} />


                        <Text style={{ ...theme.fonts.bodyMedium, flex: 1 }}>
                            Snow Forecast in Autumn: Adjust Autumn Parameters
                        </Text>
                        <TextInput label="Autumn Start Month" value={autumnStartMonth} onChangeText={setAutumnStartMonth} keyboardType="numeric" />
                        <Button mode="contained" onPress={() => { setActiveField('autumnStartMonth'); setDatePickerVisible(true); }}>Set Autumn Start Month</Button>

                        <TextInput label="Autumn End Month" value={autumnEndMonth} onChangeText={setAutumnEndMonth} keyboardType="numeric" />
                        <Button mode="contained" onPress={() => { setActiveField('autumnEndMonth'); setDatePickerVisible(true); }}>Set Autumn End Month</Button>

                        <VerticalSpacer size={12} />


                        <Text style={{ ...theme.fonts.bodyMedium, flex: 1 }}>
                            Bee Exits is Consistently Low: Adjust Threshold Exit Parameter
                        </Text>
                        <TextInput label=" Count for Threshold Exit " value={thresholdExitCountLow} onChangeText={setThresholdExitCountLow} keyboardType="numeric" />
                        <VerticalSpacer size={12} />
                    </View>
                );
            case userViewModel.i18n.t('reminder'):
                return (
                    <View>
                        {/*TODO:Add functionality */}

                    </View>
                );

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
            {datePickerVisible && (
                <DatePickerModal onConfirm={onConfirm} />
            )}
            {renderContent()}
            <VerticalSpacer size={12} />

            <Portal>
                <Modal visible={isCalendarModalVisible} onDismiss={() => setCalendarModalVisible(false)}>
                    <Calendar
                        onDayPress={onDayPress}
                        markedDates={markedDates}
                        markingType={'multi-dot'}
                    />
                    <Button mode="contained" onPress={onConfirmSelection}>Confirm</Button>
                </Modal>
            </Portal>
            <VerticalSpacer size={12} />
            <Button mode="contained" onPress={handleSave}>
                {userViewModel.i18n.t("save")}
            </Button>

        </>
    );
};
export default ModalContent;