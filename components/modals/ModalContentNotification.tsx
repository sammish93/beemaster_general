import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  Button,
  TextInput,
  IconButton,
  useTheme,
  Modal,
  Portal,
} from "react-native-paper";
import { MobXProviderContext } from "mobx-react";
import DatePickerModal from "./DatePickerModal";
import { VerticalSpacer } from "../Spacers";
import { Calendar } from "react-native-calendars";
import { View } from "react-native";
import { NotificationType } from "@/constants/Notifications";

interface ModalContentProps {
  onClose: () => void;
  onSave: (newValue: string) => void;
  parameterName: NotificationType | undefined;
}

const ModalContent = (props: ModalContentProps) => {
  const { onClose, onSave, parameterName } = props;
  const theme = useTheme();
  const userViewModel = useContext(MobXProviderContext).userViewModel;

  //Thresholds
  const [thresholdWeightDecreaseInAutumn, setThresholdWeightDecreaseInAutumn] = useState<number>(
    userViewModel.thresholdWeightDecreaseInAutumn
  );
  const [thresholdWeightDecreaseEarlySpring, setThresholdWeightDecreaseEarlySpring] = useState<number>(
    userViewModel.thresholdWeightDecreaseEarlySpring
  );
  const [thresholdWeightDecreaseSwarm, setThresholdWeightDecreaseSwarm] = useState<number>(
    userViewModel.thresholdWeightDecreaseSwarm
  );
  const [thresholdExitCountHigh, setThresholdExitCountHigh] = useState<number>(
    userViewModel.thresholdExitCountHigh
  );
  const [thresholdExitCountLow, setThresholdExitCountLow] = useState<number>(
    userViewModel.thresholdExitCountLow
  );
  const [thresholdWindSpeedStrong, setThresholdWindSpeedStrong] = useState<number>(
    userViewModel.thresholdWindSpeedStrong
  );
  const [thresholdWindSpeedLow, setThresholdWindSpeedLow] = useState<number>(
    userViewModel.thresholdWindSpeedLow
  );
  const [thresholdTempWarm, setThresholdTempWarm] = useState<number>(
    userViewModel.thresholdTempWarm
  );
  const [thresholdWeightIncrease, setThresholdWeightIncrease] = useState<number>(
    userViewModel.thresholdWeightIncrease
  );
  const [thresholdMaxTempChangeInHive, setThresholdMaxTempChangeInHive] = useState<number>(
    userViewModel.thresholdMaxTempChangeInHive
  );
  const [thresholdMaxHumidityChangeInHive, setThresholdMaxHumidityChangeInHive] = useState<number>(
    userViewModel.thresholdMaxHumidityChangeInHive
  );
  const [humidityThreshold, setHumidityThreshold] = useState<number>(
    userViewModel.humidityThreshold
  );

  //Spring
  const [earlySpringStartMonth, setEarlySpringStartMonth] = useState<Date>(
    userViewModel.earlySpringStartMonth
  );
  const [earlySpringEndMonth, setEarlySpringEndMonth] = useState<Date>(
    userViewModel.earlySpringEndMonth
  );
  const [earlySpringMonths, setEarlySpringMonths] = useState<Date[]>(
    userViewModel.earlySpringMonths
  );
  const [lateSpringStartMonth, setLateSpringStartMonth] = useState<Date>(
    userViewModel.lateSpringStartMonth
  );

  //Autumn
  const [autumnStartMonth, setAutumnStartMonth] = useState<Date>(
    userViewModel.autumnStartMonth
  );
  const [autumnEndMonth, setAutumnEndMonth] = useState<Date>(
    userViewModel.autumnEndMonth
  );
  const [autumnMonths, setAutumnMonths] = useState<Date[]>(
    userViewModel.autumnMonths
  );
  const [earlyAutumnMonth, setEarlyAutumnMonth] = useState<Date>(
    userViewModel.earlyAutumnMonth
  );

  //Winter
  const [earlyWinterMonths, setEarlyWinterMonths] = useState<Date[]>(
    userViewModel.earlyWinterMonths
  );

  //Summer
  const [summerStartMonth, setSummerStartMonth] = useState<Date>(
    userViewModel.summerStartMonth
  );
  const [earlySummerEndMonth, setEarlySummerEndMonth] = useState<Date>(
    userViewModel.earlySummerEndMonth
  );



  const getSaveAction = (parameterName: NotificationType) => {
    const actions = {
      [NotificationType.Weather]: () => {
        userViewModel.setThresholdWindSpeedStrong(
          thresholdWindSpeedStrong
        );
        userViewModel.setAutumnMonths(autumnMonths);
        userViewModel.setEarlyWinterMonths(earlyWinterMonths);
        userViewModel.setEarlySpringMonths(earlySpringMonths);
      },
      [NotificationType.PossibleSwarm]: () => {
        userViewModel.setThresholdWeightDecreaseSwarm(thresholdWeightDecreaseSwarm);
        userViewModel.setThresholdExitCountHigh(thresholdExitCountHigh);
      },
      [NotificationType.ConsiderFeeding]: () => {
        userViewModel.setThresholdWeightDecreaseEarlySpring(
          thresholdWeightDecreaseEarlySpring
        );
        userViewModel.setEarlySpringStartMonth(earlySpringStartMonth);
        userViewModel.setEarlySpringEndMonth(earlySpringEndMonth);
        userViewModel.setAutumnStartMonth(autumnStartMonth);
        userViewModel.setAutumnEndMonth(autumnEndMonth);
        userViewModel.setThresholdExitCountLow(thresholdExitCountLow);
      },
      [NotificationType.HoneyHarvest]: () => {
        userViewModel.setHumidityThreshold(humidityThreshold);
        userViewModel.setThresholdTempWarm(thresholdTempWarm);
        userViewModel.setThresholdWindSpeedLow(thresholdWindSpeedLow);
        userViewModel.setSummerStartMonth(summerStartMonth);
        userViewModel.setEarlyAutumnMonth(earlyAutumnMonth);
      },
      [NotificationType.Maintenance]: () => {
        userViewModel.setEarlySpringStartMonth(earlySpringStartMonth);
        userViewModel.setAutumnEndMonth(autumnEndMonth);
        userViewModel.setThresholdWindSpeedLow(thresholdWindSpeedLow);
        userViewModel.setThresholdTempWarm(thresholdTempWarm);
        userViewModel.setHumidityThreshold(humidityThreshold);
      },
      [NotificationType.ConsiderExpanding]: () => {
        userViewModel.setThresholdWeightIncrease(thresholdWeightIncrease);
      },
      [NotificationType.CheckHive]: () => {
        userViewModel.setThresholdMaxTempChangeInHive(
          thresholdMaxTempChangeInHive
        );
        userViewModel.setThresholdMaxHumidityChangeInHive(
          thresholdMaxHumidityChangeInHive
        );
        userViewModel.setLateSpringStartMonth(lateSpringStartMonth);
        userViewModel.setEarlySummerEndMonth(earlySummerEndMonth);
      },
      [NotificationType.CustomReminder]: () => { },
    };
    return actions[parameterName];
  };

  const handleSave = () => {
    const action = getSaveAction(parameterName);
    if (action) {
      action();
    } else {
      console.log("Unknown parameterName:", parameterName);
    }
    props.onClose();
  };

  //One month
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [activeField, setActiveField] = useState("");

  const onConfirm = (date: Date) => {
    //const selectedMonth = selectedDate.getMonth() + 1;
    switch (activeField) {
      case "earlyAutumnMonth":
        setEarlyAutumnMonth(date);
        break;
      case "summerStartMonth":
        setSummerStartMonth(date);
        break;
      case "earlySpringStartMonth":
        setEarlySpringStartMonth(date);
        break;
      case "autumnEndMonth":
        setAutumnEndMonth(date);
        break;
      case "lateSpringStartMonth":
        setLateSpringStartMonth(date);
        break;
      case "earlySummerEndMonth":
        setEarlySummerEndMonth(date);
        break;
      case "earlySpringEndMonth":
        setEarlySpringEndMonth(date);
        break;
      case "autumnStartMonth":
        setAutumnStartMonth(date);
        break;

      default:
        console.log("unknown error");
    }
    setDatePickerVisible(false);
  };

  //More than one month
  const [isCalendarModalVisible, setCalendarModalVisible] = useState(false);
  const [markedDates, setMarkedDates] = useState<{ [key: string]: { selected: boolean } }>({});
  const [selectedMonths, setSelectedMonths] = useState<Date[]>([]);
  const [activeField2, setActiveField2] = useState("");

  const onDayPress = (day: { dateString: string }) => {
    const newMarkedDates = {
      ...markedDates,
      [day.dateString]: { selected: !markedDates[day.dateString]?.selected },
    };
    setMarkedDates(newMarkedDates);
  };

  const openCalendarModal = (field: string) => {
    setActiveField2(field);
    setCalendarModalVisible(true);
  };

  const onConfirmSelection = () => {
    // Generer en array av Date-objekter basert på de merkede datoene
    const selectedDates = Object.entries(markedDates)
      .filter(([_, value]) => value.selected)
      .map(([key]) => new Date(key));

    setSelectedMonths(selectedDates);

    switch (activeField2) {
      case "autumnMonths":
        setAutumnMonths(selectedDates);
        break;
      case "earlyWinterMonths":
        setEarlyWinterMonths(selectedDates);
        break;
      case "earlySpringMonths":
        setEarlySpringMonths(selectedDates);
        break;
    }

    setMarkedDates({});
    setCalendarModalVisible(false);
  };

  //TODO:Add Translation
  const renderContent = () => {
    switch (parameterName) {
      case NotificationType.Weather:
        return (
          <View>
            <Text style={{ ...theme.fonts.bodyMedium, flex: 1 }}>
              Strong Wind Forecast: Threshold Parameter
            </Text>
            <TextInput
              label="Threshold Wind Speed"
              value={thresholdWindSpeedStrong.toString()}
              onChangeText={(text) => setThresholdWindSpeedStrong(Number(text))}
              keyboardType="numeric"
            />
            <VerticalSpacer size={12} />

            <Text style={{ ...theme.fonts.bodyMedium, flex: 1 }}>
              'snow' is forecasted during specific seasons
            </Text>
            <TextInput
              label="Autumn Months"
              value={autumnMonths.map(date => date.toLocaleDateString()).join(", ")}
              editable={false}

            />
            <Button
              mode="contained"
              onPress={() => openCalendarModal("autumnMonths")}
            >
              Set Autumn Months
            </Button>

            <TextInput
              label="Early Winter Months"
              value={earlyWinterMonths.map(date => date.toLocaleDateString()).join(", ")}
              editable={false}

            />
            <Button
              mode="contained"
              onPress={() => openCalendarModal("earlyWinterMonths")}
            >
              Set Autumn Months
            </Button>
            <TextInput
              label="Early Spring Months"
              value={earlySpringMonths.map(date => date.toLocaleDateString()).join(", ")}
              editable={false}

            />
            <Button
              mode="contained"
              onPress={() => openCalendarModal("earlySpringMonths")}
            >
              Set Autumn Months
            </Button>
            <VerticalSpacer size={12} />
          </View>
        );
      case NotificationType.PossibleSwarm:
        return (
          <View>
            <Text style={{ ...theme.fonts.bodyMedium, flex: 1 }}>
              Hive weight decreases: Threshold Parameter
            </Text>
            <TextInput
              label="Threshold Weight Decrease"
              value={thresholdWeightDecreaseSwarm.toString()}
              onChangeText={(text) => setThresholdWeightDecreaseSwarm(Number(text))}
              keyboardType="numeric"
            />

            <Text style={{ ...theme.fonts.bodyMedium, flex: 1 }}>
              Number of bees have been exiting the hive: Threshold Parameter
            </Text>
            <TextInput
              label="Threshold Exit Count"
              value={thresholdExitCountHigh.toString()}
              onChangeText={(text) => setThresholdExitCountHigh(Number(text))}
              keyboardType="numeric"
            />
          </View>
        );
      case NotificationType.HoneyHarvest:
        return (
          <View>
            <Text style={{ ...theme.fonts.bodyMedium, flex: 1 }}>
              Warm, dry days with low wind speed between summer and early autumn
            </Text>
            <TextInput
              label="Threshold Wind Speed"
              value={thresholdWindSpeedLow.toString()}
              onChangeText={(text) => setThresholdWindSpeedLow(Number(text))}
              keyboardType="numeric"
            />
            <TextInput
              label="Threshold Temperature"
              value={thresholdTempWarm.toString()}
              onChangeText={(text) => setThresholdTempWarm(Number(text))}
              keyboardType="numeric"
            />
            <TextInput
              label="Humidity Threshold %"
              value={humidityThreshold.toString()}
              onChangeText={(text) => setHumidityThreshold(Number(text))}
              keyboardType="numeric"
            />
            <TextInput
              label="Early Autumn Month"
              value={earlyAutumnMonth.toLocaleDateString()}
              editable={false}

            />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("earlyAutumnMonth");
                setDatePickerVisible(true);
              }}
            >
              Set Early Autumn Month
            </Button>

            <TextInput
              label="Summer Start Month"
              value={summerStartMonth.toLocaleDateString()}
              editable={false}

            />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("summerStartMonth");
                setDatePickerVisible(true);
              }}
            >
              Set Summer Start Month
            </Button>

            <VerticalSpacer size={12} />
          </View>
        );
      case NotificationType.Maintenance:
        return (
          <View>
            <Text style={{ ...theme.fonts.bodyMedium, flex: 1 }}>
              Warm and/or Dry Days With Low Wind Speed between early spring and
              late autumn
            </Text>
            <TextInput
              label="Early Spring Start Month"
              value={earlySpringStartMonth.toLocaleDateString()}
              editable={false}
            />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("earlySpringStartMonth");
                setDatePickerVisible(true);
              }}
            >
              Set Early Spring Start Month
            </Button>

            <TextInput
              label="Autumn End Month"
              value={autumnEndMonth.toLocaleDateString()}
              editable={false}
            />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("autumnEndMonth");
                setDatePickerVisible(true);
              }}
            >
              Set Autumn End Month
            </Button>

            <TextInput
              label="Threshold Wind Speed"
              value={thresholdWindSpeedLow.toString()}
              onChangeText={(text) => setThresholdWindSpeedLow(Number(text))}
              keyboardType="numeric"
            />
            <TextInput
              label="Threshold Temperature"
              value={thresholdTempWarm.toString()}
              onChangeText={(text) => setThresholdTempWarm(Number(text))}
              keyboardType="numeric"
            />
            <TextInput
              label="Humidity Threshold %"
              value={humidityThreshold.toString()}
              onChangeText={(text) => setHumidityThreshold(Number(text))}
              keyboardType="numeric"
            />
            <VerticalSpacer size={12} />
          </View>
        );
      case NotificationType.ConsiderExpanding:
        return (
          <View>
            <Text style={{ ...theme.fonts.bodyMedium, flex: 1 }}>
              Hive Weight Increases: Threshold Parameter
            </Text>
            <TextInput
              label="Threshold Weight Parameter Increase"
              value={thresholdWeightIncrease.toString()}
              onChangeText={(text) => setThresholdWeightIncrease(Number(text))}
              keyboardType="numeric"
            />
          </View>
        );

      case NotificationType.CheckHive:
        return (
          <View>
            <Text style={{ ...theme.fonts.bodyMedium, flex: 1 }}>
              Hive temperature increases or decreases: Threshold Parameter
            </Text>
            <TextInput
              label="Threshold Max Temperature Change"
              value={thresholdMaxTempChangeInHive.toString()}
              onChangeText={(text) => setThresholdMaxTempChangeInHive(Number(text))}
              keyboardType="numeric"
            />
            <Text style={{ ...theme.fonts.bodyMedium, flex: 1 }}>
              Humidity increases or decreases : Threshold Parameter
            </Text>
            <TextInput
              label="Threshold Max Humidity Change"
              value={thresholdMaxHumidityChangeInHive.toString()}
              onChangeText={(text) => setThresholdMaxHumidityChangeInHive(Number(text))}
              keyboardType="numeric"
            />
            <Text style={{ ...theme.fonts.bodyMedium, flex: 1 }}>
              The risk of swarming: Threshold Parameter for late spring and
              early summer
            </Text>
            <TextInput
              label="Late Spring Start Month"
              value={lateSpringStartMonth.toLocaleDateString()}
              editable={false}
            />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("lateSpringStartMonth");
                setDatePickerVisible(true);
              }}
            >
              Set Late Spring Start Month
            </Button>

            <TextInput
              label="Early Summer End Month"
              value={earlySummerEndMonth.toLocaleDateString()}
              editable={false}
            />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("earlySummerEndMonth");
                setDatePickerVisible(true);
              }}
            >
              Set Early Summer End Month
            </Button>
          </View>
        );

      case NotificationType.ConsiderFeeding:
        return (
          <View>
            <Text style={{ ...theme.fonts.bodyMedium, flex: 1 }}>
              Hive Decrease in Early spring: Adjust Early Spring Parameters
            </Text>
            <TextInput
              label="Threshold Weight Decrease"
              value={thresholdWeightDecreaseEarlySpring.toString()}
              onChangeText={(text) => setThresholdWeightDecreaseEarlySpring(Number(text))}
              keyboardType="numeric"
            />
            <TextInput
              label="Early Spring Start Month"
              value={earlySpringStartMonth.toLocaleDateString()}
              editable={false}
            />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("earlySpringStartMonth");
                setDatePickerVisible(true);
              }}
            >
              Set Early Spring Start Month
            </Button>

            <TextInput
              label="Early Spring End Month"
              value={earlySpringEndMonth.toLocaleDateString()}
              editable={false}
            />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("earlySpringEndMonth");
                setDatePickerVisible(true);
              }}
            >
              Set Early Spring End Month
            </Button>

            <VerticalSpacer size={12} />

            <Text style={{ ...theme.fonts.bodyMedium, flex: 1 }}>
              Hive Decreases in Autumn: Adjust Autumn Parameters
            </Text>
            <TextInput
              label="Threshold Weight Decrease"
              value={thresholdWeightDecreaseInAutumn.toString()}
              onChangeText={(text) => setThresholdWeightDecreaseInAutumn(Number(text))}
              keyboardType="numeric"
            />
            <TextInput
              label="Autumn Start Month"
              value={autumnStartMonth.toLocaleDateString()}
              editable={false}
            />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("autumnStartMonth");
                setDatePickerVisible(true);
              }}
            >
              Set Autumn Start Month
            </Button>

            <TextInput
              label="Autumn End Month"
              value={autumnEndMonth.toLocaleDateString()}
              editable={false}
            />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("autumnEndMonth");
                setDatePickerVisible(true);
              }}
            >
              Set Autumn End Month
            </Button>

            <VerticalSpacer size={12} />

            <Text style={{ ...theme.fonts.bodyMedium, flex: 1 }}>
              Snow Forecast in Autumn: Adjust Autumn Parameters
            </Text>
            <TextInput
              label="Autumn Start Month"
              value={autumnStartMonth.toLocaleDateString()}
              editable={false}
            />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("autumnStartMonth");
                setDatePickerVisible(true);
              }}
            >
              Set Autumn Start Month
            </Button>

            <TextInput
              label="Autumn End Month"
              value={autumnEndMonth.toLocaleDateString()}
              editable={false}
            />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("autumnEndMonth");
                setDatePickerVisible(true);
              }}
            >
              Set Autumn End Month
            </Button>

            <VerticalSpacer size={12} />

            <Text style={{ ...theme.fonts.bodyMedium, flex: 1 }}>
              Bee Exits is Consistently Low: Adjust Threshold Exit Parameter
            </Text>
            <TextInput
              label=" Count for Threshold Exit "
              value={thresholdExitCountLow.toString()}
              onChangeText={(text) => setThresholdExitCountLow(Number(text))}
              keyboardType="numeric"
            />
            <VerticalSpacer size={12} />
          </View>
        );
      case NotificationType.CustomReminder:
        return <View>{/*TODO:Add functionality */}</View>;

      default:
        return (
          <View>
            <Text>Ukjent parameter</Text>
          </View>
        );
    }
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
          {props.parameterName}
        </Text>
        <IconButton
          icon="close"
          iconColor={theme.colors.onSurfaceVariant}
          onPress={props.onClose}
        />
      </View>
      {datePickerVisible && <DatePickerModal onConfirm={onConfirm} />}
      {renderContent()}

      <VerticalSpacer size={12} />

      <Portal>
        <Modal
          visible={isCalendarModalVisible}
          onDismiss={() => setCalendarModalVisible(false)}
        >
          <Calendar
            onDayPress={onDayPress}
            markedDates={markedDates}
            markingType={"multi-dot"}
          />
          <Button mode="contained" onPress={onConfirmSelection}>
            Confirm
          </Button>
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
