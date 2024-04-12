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

  //Thresholds weights
  const [thresholdWeightDecreaseInAutumn, setThresholdWeightDecreaseInAutumn] = useState<number>(
    userViewModel.thresholdWeightDecreaseInAutumn
  );
  const [thresholdWeightDecreaseEarlySpring, setThresholdWeightDecreaseEarlySpring] = useState<number>(
    userViewModel.thresholdWeightDecreaseEarlySpring
  );
  const [thresholdWeightDecrease, setThresholdWeightDecrease] = useState<number>(
    userViewModel.thresholdWeightDecrease
  );
  const [thresholdWeightIncrease, setThresholdWeightIncrease] = useState<number>(
    userViewModel.thresholdWeightIncrease
  );
  const [productionPeriodDays, setProductionPeriodDays] = useState<number>(
    userViewModel.productionPeriodDays
  );
  const [productionPeriodThreshold, setProductionPeriodThreshold] = useState<number>(
    userViewModel.productionPeriodThreshold
  );

  //Exit
  const [thresholdExitCountHigh, setThresholdExitCountHigh] = useState<number>(
    userViewModel.thresholdExitCountHigh
  );
  const [thresholdExitCountLow, setThresholdExitCountLow] = useState<number>(
    userViewModel.thresholdExitCountLow
  );

  //Temp
  const [thresholdTemperatureOptimal, setThresholdTemperatureOptimal] = useState<number>(
    userViewModel.thresholdTemperatureOptimal
  );

  const [thresholdTemperatureMax, setThresholdTemperatureMax] = useState<number>(
    userViewModel.thresholdTemperatureMax
  );
  const [thresholdTemperatureMin, setThresholdTemperatureMin] = useState<number>(
    userViewModel.thresholdTemperatureMin
  );

  const [thresholdMinTempInHive, setThresholdMinTempInHive] = useState<number>(
    userViewModel.thresholdMinTempInHive
  );
  const [thresholdMaxTempInHive, setThresholdMaxTempInHive] = useState<number>(
    userViewModel.thresholdMaxTempInHive
  );

  //Windspeed
  const [thresholdWindSpeedStrong, setThresholdWindSpeedStrong] = useState<number>(
    userViewModel.thresholdWindSpeedStrong
  );
  const [thresholdWindSpeedLow, setThresholdWindSpeedLow] = useState<number>(
    userViewModel.thresholdWindSpeedLow
  );


  //Humidity
  const [thresholdHumidityMax, setThresholdHumidityMax] = useState<number>(
    userViewModel.thresholdHumidityMax
  );
  const [thresholdHumidityMin, setThresholdHumidityMin] = useState<number>(
    userViewModel.thresholdHumidityMin
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
  const [springStartMonth, setSpringStartMonth] = useState<Date>(
    userViewModel.springStartMonth
  );
  const [springEndMonth, setSpringEndMonth] = useState<Date>(
    userViewModel.springEndMonth
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
  const [winterStart, setWinterStart] = useState<Date>(
    userViewModel.winterStart
  );
  const [winterEnd, setWinterEnd] = useState<Date>(
    userViewModel.winterEnd
  );
  const [earlyWinterStart, setEarlyWinterStart] = useState<Date>(
    userViewModel.earlyWinterStart
  );
  const [earlyWinterEnd, setEarlyWinterEnd] = useState<Date>(
    userViewModel.earlyWinterEnd
  );


  //Summer
  const [summerStartMonth, setSummerStartMonth] = useState<Date>(
    userViewModel.summerStartMonth
  );
  const [summerEndMonth, setSummerEndMonth] = useState<Date>(
    userViewModel.summerEndMonth
  );
  const [earlySummerEndMonth, setEarlySummerEndMonth] = useState<Date>(
    userViewModel.earlySummerEndMonth
  );
  const [earlySummerStartMonth, setEarlySummerStartMonth] = useState<Date>(
    userViewModel.earlySummerStartMonth
  );





  const getSaveAction = (parameterName: NotificationType) => {
    const actions = {
      [NotificationType.Weather]: () => {
        userViewModel.setThresholdWindSpeedStrong(thresholdWindSpeedStrong);
        userViewModel.setThresholdWindSpeedLow(thresholdWindSpeedLow);

        userViewModel.setEarlyWinterMonths(earlyWinterMonths);
        userViewModel.setWinterStart(winterStart);
        userViewModel.setWinterEnd(winterEnd);
        userViewModel.setEarlyWinterStart(earlyWinterStart);
        userViewModel.setEarlyWinterEnd(earlyWinterEnd);

        userViewModel.setEarlySpringMonths(earlySpringMonths);
        userViewModel.setEarlySpringStartMonth(earlySpringStartMonth);

        userViewModel.setThresholdTemperatureMax(thresholdTemperatureMax);
        userViewModel.setThresholdTemperatureMin(thresholdTemperatureMin);
        userViewModel.setThresholdTemperatureOptimal(thresholdTemperatureOptimal);

        userViewModel.setAutumnMonths(autumnMonths);
        userViewModel.setAutumnStartMonth(autumnStartMonth);
        userViewModel.setAutumnEndMonth(autumnEndMonth);

      },
      [NotificationType.PossibleSwarm]: () => {
        userViewModel.setThresholdWeightDecrease(thresholdWeightDecrease);
        userViewModel.setThresholdExitCountHigh(thresholdExitCountHigh);
        userViewModel.setThresholdExitCountLow(thresholdExitCountLow);
        userViewModel.setProductionPeriodDays(productionPeriodDays);
        userViewModel.setProductionPeriodThreshold(productionPeriodThreshold);
        userViewModel.setLateSpringStartMonth(lateSpringStartMonth);
        userViewModel.setEarlySummerEndMonth(earlySummerEndMonth);
      },

      [NotificationType.ConsiderFeeding]: () => {
        userViewModel.setThresholdWeightDecreaseEarlySpring(
          thresholdWeightDecreaseEarlySpring
        );
        userViewModel.setThresholdWindSpeedStrong(thresholdWindSpeedStrong);
        userViewModel.setEarlySpringStartMonth(earlySpringStartMonth);
        userViewModel.setEarlySpringEndMonth(earlySpringEndMonth);
        userViewModel.setEarlySpringMonths(earlySpringMonths);
        userViewModel.setEarlyWinterMonths(earlyWinterMonths);
        userViewModel.setEarlyWinterStart(earlyWinterStart);
        userViewModel.setWinterStart(winterStart);
        userViewModel.thresholdTemperatureMin(thresholdTemperatureMin);
        userViewModel.setThresholdWeightDecreaseInAutumn(thresholdWeightDecreaseInAutumn);
        userViewModel.setAutumnStartMonth(autumnStartMonth);
        userViewModel.setAutumnEndMonth(autumnEndMonth);
        userViewModel.setAutumnMonths(autumnMonths);
        userViewModel.setProductionPeriodDays(productionPeriodDays);
        userViewModel.setProductionPeriodThreshold(productionPeriodThreshold);
        userViewModel.setThresholdExitCountLow(thresholdExitCountLow);
        userViewModel.setSpringStartMonth(springStartMonth);
        userViewModel.setSpringStartMonth(springEndMonth);

      },
      [NotificationType.HoneyHarvest]: () => {
        userViewModel.setThresholdTemperatureMax(thresholdTemperatureMax);
        userViewModel.setThresholdWindSpeedLow(thresholdWindSpeedLow);
        userViewModel.setSummerStartMonth(summerStartMonth);
        userViewModel.setEarlyAutumnMonth(earlyAutumnMonth);
        userViewModel.setEarlySpringStartMonth(earlySpringStartMonth);
        userViewModel.setAutumnEndMonth(autumnEndMonth);
        userViewModel.setProductionPeriodDays(productionPeriodDays);
        userViewModel.setProductionPeriodThreshold(productionPeriodThreshold);
        userViewModel.setThresholdWeightIncrease(thresholdWeightIncrease);
        userViewModel.setThresholdTemperatureOptimal(thresholdTemperatureOptimal);
        userViewModel.setSummerEndMonth(summerEndMonth);

      },
      [NotificationType.Maintenance]: () => {
        userViewModel.setEarlySpringStartMonth(earlySpringStartMonth);
        userViewModel.setAutumnEndMonth(autumnEndMonth);
        userViewModel.setThresholdWindSpeedLow(thresholdWindSpeedLow);
        userViewModel.setThresholdTemperatureMax(thresholdTemperatureMax);
        userViewModel.setSummerStartMonth(summerStartMonth);
        userViewModel.setEarlyAutumnMonth(earlyAutumnMonth);
        userViewModel.setThresholdTemperatureOptimal(thresholdTemperatureOptimal);
        userViewModel.setEarlySummerStartMonth(earlySummerStartMonth);
        userViewModel.setSpringStartMonth(springStartMonth);
        userViewModel.setSpringStartMonth(springEndMonth);

      },

      [NotificationType.ConsiderExpanding]: () => {
        userViewModel.setThresholdWeightIncrease(thresholdWeightIncrease);
        userViewModel.setThresholdTemperatureMax(thresholdTemperatureMax);
        userViewModel.setProductionPeriodDays(productionPeriodDays);
        userViewModel.setProductionPeriodThreshold(productionPeriodThreshold);
        userViewModel.setEarlySummerStartMonth(earlySummerStartMonth);
        userViewModel.setSpringStartMonth(springStartMonth);
        userViewModel.setSpringStartMonth(springEndMonth);
        userViewModel.setSummerEndMonth(summerEndMonth);
        userViewModel.setSummerStartMonth(summerStartMonth);

      },

      [NotificationType.CheckHive]: () => {
        userViewModel.setThresholdMinTempInHive(thresholdMinTempInHive);
        userViewModel.setThresholdMaxTempInHive(thresholdMaxTempInHive);

        userViewModel.setLateSpringStartMonth(lateSpringStartMonth);
        userViewModel.setEarlySummerEndMonth(earlySummerEndMonth);
        userViewModel.earlySpringMonths(earlySpringMonths);
        userViewModel.setThresholdTemperatureMax(thresholdTemperatureMax);
        userViewModel.setThresholdTemperatureMin(thresholdTemperatureMin);

        userViewModel.setThresholdHumidityMax(thresholdHumidityMax);
        userViewModel.setThresholdHumidityMin(thresholdHumidityMin);
        userViewModel.setThresholdExitCountHigh(thresholdExitCountHigh);
        userViewModel.setWinterEnd(winterEnd);
        userViewModel.setEarlyWinterMonths(earlyWinterMonths);
        userViewModel.setAutumnMonths(autumnMonths);
        userViewModel.setEarlySpringMonths(earlySpringMonths);
        userViewModel.setEarlyWinterEnd(earlyWinterEnd);

      },
      [NotificationType.CustomReminder]: () => { },
    };
    return actions[parameterName];
  };

  const handleSave = () => {
    if (parameterName !== undefined) {
      const action = getSaveAction(parameterName);
      if (action) {
        action();
      } else {
        console.log("Unknown parameterName:", parameterName);
      }
    } else {

      console.log("parameterName is undefined");
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
      case "autumnStartMonth":
        setAutumnStartMonth(date);
        break;
      case "autumnEndMonth":
        setAutumnEndMonth(date);
        break;

      case "summerStartMonth":
        setSummerStartMonth(date);
        break;
      case "summerEndMonth":
        setSummerEndMonth(date);
        break;
      case "earlySummerEndMonth":
        setEarlySummerEndMonth(date);
        break;
      case "earlySummerStartMonth":
        setEarlySummerStartMonth(date);
        break;

      case "earlySpringEndMonth":
        setEarlySpringEndMonth(date);
        break;
      case "earlySpringStartMonth":
        setEarlySpringStartMonth(date);
        break;
      case "springStartMonth":
        setSpringStartMonth(date);
        break;
      case "springEndMonth":
        setSpringEndMonth(date);
        break;
      case "lateSpringStartMonth":
        setLateSpringStartMonth(date);
        break;
      case "winterEnd":
        setWinterEnd(date);
        break;
      case "winterStart":
        setWinterStart(date);
        break;
      case "earlyWinterEnd":
        setEarlyWinterEnd(date);
        break;
      case "earlyWinterStart":
        setEarlyWinterStart(date);
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



  const renderContent = () => {
    switch (parameterName) {
      case NotificationType.Weather:
        return (
          <View>
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert for strong wind forecast")}
            </Text>
            <TextInput
              label={userViewModel.i18n.t("set threshold wind speed")}
              value={thresholdWindSpeedStrong.toString()}
              onChangeText={(text) => setThresholdWindSpeedStrong(Number(text))}
              keyboardType="numeric"
            />

            <VerticalSpacer size={12} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert for consistently high temperature")}
            </Text>
            <TextInput
              label={userViewModel.i18n.t("set threshold max temperature")}
              value={thresholdTemperatureMax.toString()}
              onChangeText={(text) => setThresholdTemperatureMax(Number(text))}
              keyboardType="numeric"
            />

            <VerticalSpacer size={12} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert for is 'snow' forecasted during specific seasons")}
            </Text>
            <TextInput
              label={userViewModel.i18n.t("autumn months")}
              value={autumnMonths.map(date => date.toLocaleDateString()).join(", ")}
              editable={false}
            />
            <Button
              mode="contained"
              onPress={() => openCalendarModal("autumnMonths")}
            >
              {userViewModel.i18n.t("set autumn months")}
            </Button>
            <TextInput
              label={userViewModel.i18n.t("early winter months")}
              value={earlyWinterMonths.map(date => date.toLocaleDateString()).join(", ")}
              editable={false}
            />
            <Button
              mode="contained"
              onPress={() => openCalendarModal("earlyWinterMonths")}
            >
              {userViewModel.i18n.t("set early winter months")}
            </Button>
            <TextInput
              label={userViewModel.i18n.t("early spring months")}
              value={earlySpringMonths.map(date => date.toLocaleDateString()).join(", ")}
              editable={false}
            />
            <Button
              mode="contained"
              onPress={() => openCalendarModal("earlySpringMonths")}
            >
              {userViewModel.i18n.t("set early spring months")}
            </Button>

            <VerticalSpacer size={12} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert for is 'snow' forecasted during autumn")}
            </Text>
            <TextInput
              label={userViewModel.i18n.t("autumn start month")}
              value={autumnStartMonth.toLocaleDateString()}
              editable={false}
            />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("autumnStartMonth");
                setDatePickerVisible(true);
              }}
            > {userViewModel.i18n.t("set autumn start month")}
            </Button>
            <TextInput
              label={userViewModel.i18n.t("autumn end month")}
              value={autumnEndMonth.toLocaleDateString()}
              editable={false}
            />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("autumnEndMonth");
                setDatePickerVisible(true);
              }}
            > {userViewModel.i18n.t("set autumn end month")}
            </Button>

            <VerticalSpacer size={12} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert for ideal bee weather between early spring and end autumn")}
            </Text>
            <TextInput
              label={userViewModel.i18n.t("set threshold for low wind speed")}
              value={thresholdWindSpeedLow.toString()}
              onChangeText={(text) => setThresholdWindSpeedLow(Number(text))}
              keyboardType="numeric"
            />
            <TextInput
              label={userViewModel.i18n.t("set threshold for optimal temperature")}
              value={thresholdTemperatureOptimal.toString()}
              onChangeText={(text) => setThresholdTemperatureOptimal(Number(text))}
              keyboardType="numeric"
            />
            <TextInput
              label={userViewModel.i18n.t("early spring start month")}
              value={earlySpringStartMonth.toLocaleDateString()}
              editable={false}
            />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("earlySpringStartMonth");
                setDatePickerVisible(true);
              }}
            > {userViewModel.i18n.t("set early spring start month")}
            </Button>
            <TextInput
              label={userViewModel.i18n.t("autumn end month")}
              value={autumnEndMonth.toLocaleDateString()}
              editable={false}
            />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("autumnEndMonth");
                setDatePickerVisible(true);
              }}
            > {userViewModel.i18n.t("set autumn end month")}
            </Button>

            <VerticalSpacer size={12} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert for is winter starting")}
            </Text>
            <TextInput
              label={userViewModel.i18n.t("winter start month")}
              value={winterStart.toLocaleDateString()}
              editable={false}
            />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("winterStart");
                setDatePickerVisible(true);
              }}
            > {userViewModel.i18n.t("set winter start month")}
            </Button>
            <TextInput
              label={userViewModel.i18n.t("set threshold temperature minimum")}
              value={thresholdTemperatureMin.toString()}
              onChangeText={(text) => setThresholdTemperatureMin(Number(text))}
              keyboardType="numeric"
            />

            <VerticalSpacer size={12} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert for is winter ending")}
            </Text>
            <TextInput
              label={userViewModel.i18n.t("winter end month")}
              value={winterEnd.toLocaleDateString()}
              editable={false}
            />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("winterEnd");
                setDatePickerVisible(true);
              }}
            > {userViewModel.i18n.t("set winter end month")}
            </Button>
            <TextInput
              label={userViewModel.i18n.t("set threshold temperature minimum")}
              value={thresholdTemperatureMin.toString()}
              onChangeText={(text) => setThresholdTemperatureMin(Number(text))}
              keyboardType="numeric"
            />

            <VerticalSpacer size={12} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert for is early winter starting")}
            </Text>
            <TextInput
              label={userViewModel.i18n.t("early winter start month")}
              value={earlyWinterStart.toLocaleDateString()}
              editable={false}
            />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("earlyWinterStart");
                setDatePickerVisible(true);
              }}
            > {userViewModel.i18n.t("set early winter start month")}
            </Button>

            <VerticalSpacer size={12} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert for is currently spring season")}
            </Text>
            <TextInput
              label={userViewModel.i18n.t("spring start month")}
              value={springStartMonth.toLocaleDateString()}
              editable={false}
            />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("springStartMonth");
                setDatePickerVisible(true);
              }}
            > {userViewModel.i18n.t("set spring start month")}
            </Button>
            <TextInput
              label={userViewModel.i18n.t("spring end month")}
              value={springEndMonth.toLocaleDateString()}
              editable={false}
            />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("springEndMonth");
                setDatePickerVisible(true);
              }}
            > {userViewModel.i18n.t("set spring end month")}
            </Button>
          </View>
        );

      case NotificationType.PossibleSwarm:
        return (
          <View>
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert between late spring and early summer")}
            </Text>
            <TextInput
              label={userViewModel.i18n.t("late spring start month")}
              value={lateSpringStartMonth.toLocaleDateString()}
              editable={false}
            />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("lateSpringStartMonth");
                setDatePickerVisible(true);
              }}
            > {userViewModel.i18n.t("set late spring start month")}
            </Button>
            <TextInput
              label={userViewModel.i18n.t("early summer start month")}
              value={earlySummerStartMonth.toLocaleDateString()}
              editable={false}
            />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("earlySummerStartMonth");
                setDatePickerVisible(true);
              }}
            > {userViewModel.i18n.t("set early summer start month")}
            </Button>

            <VerticalSpacer size={12} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert for hive weight decreases significantly")}
            </Text>
            <TextInput
              label={userViewModel.i18n.t("set number for threshold value for weight decrease")}
              value={thresholdWeightDecrease.toString()}
              onChangeText={(text) => setThresholdWeightDecrease(Number(text))}
              keyboardType="numeric"
            />
            <TextInput
              label={userViewModel.i18n.t("set number of days for production period")}
              value={productionPeriodDays.toString()}
              onChangeText={(text) => setProductionPeriodDays(Number(text))}
              keyboardType="numeric"
            />

            <VerticalSpacer size={12} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert to check if many bees have exited the hive")}
            </Text>
            <TextInput
              label={userViewModel.i18n.t("set threshold for high exit count")}
              value={thresholdExitCountHigh.toString()}
              onChangeText={(text) => setThresholdExitCountHigh(Number(text))}
              keyboardType="numeric"
            />

            <VerticalSpacer size={12} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert for have few bees been exited the hive")}
            </Text>
            <TextInput
              label={userViewModel.i18n.t("set threshold for low exit count")}
              value={thresholdExitCountLow.toString()}
              onChangeText={(text) => setThresholdExitCountLow(Number(text))}
              keyboardType="numeric"
            />

            <VerticalSpacer size={12} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert for total weight decrease over a period")}
            </Text>
            <TextInput
              label={userViewModel.i18n.t("set number of days for production period")}
              value={productionPeriodDays.toString()}
              onChangeText={(text) => setProductionPeriodDays(Number(text))}
              keyboardType="numeric"
            />
            <TextInput
              label={userViewModel.i18n.t("set number for threshold value for production period")}
              value={productionPeriodThreshold.toString()}
              onChangeText={(text) => setProductionPeriodThreshold(Number(text))}
              keyboardType="numeric"
            />

            <VerticalSpacer size={12} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert for possible swarming based on defined season")}
            </Text>
            <TextInput
              label={userViewModel.i18n.t("late spring start month")}
              value={lateSpringStartMonth.toLocaleDateString()}
              editable={false}
            />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("lateSpringStartMonth");
                setDatePickerVisible(true);
              }}
            > {userViewModel.i18n.t("set late spring start month")}
            </Button>
            <TextInput
              label={userViewModel.i18n.t("early summer end month")}
              value={earlySummerEndMonth.toLocaleDateString()}
              editable={false}
            />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("earlySummerEndMonth");
                setDatePickerVisible(true);
              }}
            > {userViewModel.i18n.t("set early summer end month")}
            </Button>
          </View>
        );

      case NotificationType.HoneyHarvest:
        return (
          <View>
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert for ideal bee weather between summer and early autumn")}
            </Text>
            <TextInput
              label={userViewModel.i18n.t("set threshold for low wind speed")}
              value={thresholdWindSpeedLow.toString()}
              onChangeText={(text) => setThresholdWindSpeedLow(Number(text))}
              keyboardType="numeric"
            />
            <TextInput
              label={userViewModel.i18n.t("set threshold for optimal temperature")}
              value={thresholdTemperatureOptimal.toString()}
              onChangeText={(text) => setThresholdTemperatureOptimal(Number(text))}
              keyboardType="numeric"
            />
            <TextInput
              label={userViewModel.i18n.t("early autumn month")}
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
              {userViewModel.i18n.t("set early autumn month")}
            </Button>
            <TextInput
              label={userViewModel.i18n.t("summer start month")}
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
              {userViewModel.i18n.t("set summer start month")}
            </Button>

            <VerticalSpacer size={12} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert for ideal bee weather between early spring and end autumn")}
            </Text>
            <TextInput
              label={userViewModel.i18n.t("set threshold for low wind speed")}
              value={thresholdWindSpeedLow.toString()}
              onChangeText={(text) => setThresholdWindSpeedLow(Number(text))}
              keyboardType="numeric"
            />
            <TextInput
              label={userViewModel.i18n.t("set threshold for optimal temperature")}
              value={thresholdTemperatureOptimal.toString()}
              onChangeText={(text) => setThresholdTemperatureOptimal(Number(text))}
              keyboardType="numeric"
            />
            <TextInput
              label={userViewModel.i18n.t("early spring start month")}
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
              {userViewModel.i18n.t("set early spring start month")}
            </Button>
            <TextInput
              label={userViewModel.i18n.t("autumn end month")}
              value={autumnEndMonth.toLocaleDateString()}
              editable={false}
            />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("autumnEndMonth");
                setDatePickerVisible(true);
              }}
            > {userViewModel.i18n.t("set autumn end month")}
            </Button>

            <VerticalSpacer size={12} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert for significant increase in hive weight")}
            </Text>
            <TextInput
              label={userViewModel.i18n.t("set number for threshold value for weight increase")}
              value={thresholdWeightIncrease.toString()}
              onChangeText={(text) => setThresholdWeightIncrease(Number(text))}
              keyboardType="numeric"
            />

            <VerticalSpacer size={12} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert for total weight increase over a period")}
            </Text>
            <TextInput
              label={userViewModel.i18n.t("set number of days for production period")}
              value={productionPeriodDays.toString()}
              onChangeText={(text) => setProductionPeriodDays(Number(text))}
              keyboardType="numeric"
            />
            <TextInput
              label={userViewModel.i18n.t("set number for threshold value for production period")}
              value={productionPeriodThreshold.toString()}
              onChangeText={(text) => setProductionPeriodThreshold(Number(text))}
              keyboardType="numeric"
            />

            <VerticalSpacer size={12} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert for summer season")}
            </Text>
            <TextInput
              label={userViewModel.i18n.t("summer start month")}
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
              {userViewModel.i18n.t("set summer start month")}
            </Button>
            <TextInput
              label={userViewModel.i18n.t("summer end month")}
              value={summerEndMonth.toLocaleDateString()}
              editable={false}
            />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("summerEndMonth");
                setDatePickerVisible(true);
              }}
            >
              {userViewModel.i18n.t("set summer end month")}
            </Button>
          </View>
        );

      case NotificationType.Maintenance:
        return (
          <View>
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert for ideal bee weather between early spring and end autumn")}
            </Text>
            <TextInput
              label={userViewModel.i18n.t("early spring start month")}
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
              {userViewModel.i18n.t("set early spring start month")}
            </Button>
            <TextInput
              label={userViewModel.i18n.t("autumn end month")}
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
              {userViewModel.i18n.t("set autumn end month")}
            </Button>
            <TextInput
              label={userViewModel.i18n.t("set threshold for low wind speed")}
              value={thresholdWindSpeedLow.toString()}
              onChangeText={(text) => setThresholdWindSpeedLow(Number(text))}
              keyboardType="numeric"
            />
            <TextInput
              label={userViewModel.i18n.t("set threshold for optimal temperature")}
              value={thresholdTemperatureOptimal.toString()}
              onChangeText={(text) => setThresholdTemperatureOptimal(Number(text))}
              keyboardType="numeric"
            />

            <VerticalSpacer size={12} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert for ideal bee weather between summer and early autumn")}
            </Text>
            <TextInput
              label={userViewModel.i18n.t("summer start month")}
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
              {userViewModel.i18n.t("set summer start month")}
            </Button>
            <TextInput
              label={userViewModel.i18n.t("early autumn month")}
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
              {userViewModel.i18n.t("set early autumn month")}
            </Button>
            <TextInput
              label={userViewModel.i18n.t("set threshold for low wind speed")}
              value={thresholdWindSpeedLow.toString()}
              onChangeText={(text) => setThresholdWindSpeedLow(Number(text))}
              keyboardType="numeric"
            />
            <TextInput
              label={userViewModel.i18n.t("set threshold for optimal temperature")}
              value={thresholdTemperatureOptimal.toString()}
              onChangeText={(text) => setThresholdTemperatureOptimal(Number(text))}
              keyboardType="numeric"
            />

            <VerticalSpacer size={12} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert for is early summer starting")}
            </Text>
            <TextInput
              label={userViewModel.i18n.t("early summer start month")}
              value={earlySummerStartMonth.toLocaleDateString()}
              editable={false}
            />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("earlySummerStartMonth");
                setDatePickerVisible(true);
              }}
            >
              {userViewModel.i18n.t("set early summer start month")}
            </Button>

            <VerticalSpacer size={12} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert to check if it's spring")}
            </Text>
            <TextInput
              label={userViewModel.i18n.t("spring start month")}
              value={springStartMonth.toLocaleDateString()}
              editable={false}
            />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("springStartMonth");
                setDatePickerVisible(true);
              }}
            >
              {userViewModel.i18n.t("set spring start month")}
            </Button>
            <TextInput
              label={userViewModel.i18n.t("spring end month")}
              value={springEndMonth.toLocaleDateString()}
              editable={false}
            />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("springEndMonth");
                setDatePickerVisible(true);
              }}
            >
              {userViewModel.i18n.t("set spring end month")}
            </Button>
          </View>
        );

      case NotificationType.ConsiderExpanding:
        return (
          <View>
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert for significant increase in hive weigh")}
            </Text>
            <TextInput
              label={userViewModel.i18n.t("set number for threshold value for weight increase")}
              value={thresholdWeightIncrease.toString()}
              onChangeText={(text) => setThresholdWeightIncrease(Number(text))}
              keyboardType="numeric"
            />

            <VerticalSpacer size={12} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert for total weight increase over a period")}
            </Text>
            <TextInput
              label={userViewModel.i18n.t("set number of days for production period")}
              value={productionPeriodDays.toString()}
              onChangeText={(text) => setProductionPeriodDays(Number(text))}
              keyboardType="numeric"
            />
            <TextInput
              label={userViewModel.i18n.t("set number for threshold value for production period")}
              value={productionPeriodThreshold.toString()}
              onChangeText={(text) => setProductionPeriodThreshold(Number(text))}
              keyboardType="numeric"
            />

            <VerticalSpacer size={12} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert for consistently high temperature")}
            </Text>
            <TextInput
              label={userViewModel.i18n.t("set threshold max temperature")}
              value={thresholdTemperatureMax.toString()}
              onChangeText={(text) => setThresholdTemperatureMax(Number(text))}
              keyboardType="numeric"
            />

            <VerticalSpacer size={12} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert for is early summer starting")}
            </Text>
            <TextInput
              label={userViewModel.i18n.t("early summer start month")}
              value={earlySummerStartMonth.toLocaleDateString()}
              editable={false}
            />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("earlySummerStartMonth");
                setDatePickerVisible(true);
              }}
            >
              {userViewModel.i18n.t("set early summer start month")}
            </Button>

            <VerticalSpacer size={12} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert for is spring season")}
            </Text>
            <TextInput
              label={userViewModel.i18n.t("spring start month")}
              value={springStartMonth.toLocaleDateString()}
              editable={false}
            />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("springStartMonth");
                setDatePickerVisible(true);
              }}
            >
              {userViewModel.i18n.t("set spring start month")}
            </Button>
            <TextInput
              label={userViewModel.i18n.t("spring end month")}
              value={springEndMonth.toLocaleDateString()}
              editable={false}
            />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("springEndMonth");
                setDatePickerVisible(true);
              }}
            >
              {userViewModel.i18n.t("set spring end month")}
            </Button>

            <VerticalSpacer size={12} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert for summer season")}
            </Text>
            <TextInput
              label={userViewModel.i18n.t("summer start month")}
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
              {userViewModel.i18n.t("set summer start month")}
            </Button>
            <TextInput
              label={userViewModel.i18n.t("summer end month")}
              value={summerEndMonth.toLocaleDateString()}
              editable={false}
            />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("summerEndMonth");
                setDatePickerVisible(true);
              }}
            >
              {userViewModel.i18n.t("set summer end month")}
            </Button>
          </View>
        );

      case NotificationType.CheckHive:
        return (
          <View>
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert to check if hive temperature is too warm")}
            </Text>
            <TextInput
              label={userViewModel.i18n.t("set threshold max temperature for hive")}
              value={thresholdMaxTempInHive.toString()}
              onChangeText={(text) => setThresholdMaxTempInHive(Number(text))}
              keyboardType="numeric"
            />
            <VerticalSpacer size={12} />

            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert to check if hive temperature is too cold")}
            </Text>
            <TextInput
              label={userViewModel.i18n.t("set threshold minimum temperature for hive")}
              value={thresholdMinTempInHive.toString()}
              onChangeText={(text) => setThresholdMinTempInHive(Number(text))}
              keyboardType="numeric"
            />

            <VerticalSpacer size={12} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert for consistently high temperature")}
            </Text>
            <TextInput
              label={userViewModel.i18n.t("set threshold max temperature")}
              value={thresholdTemperatureMax.toString()}
              onChangeText={(text) => setThresholdTemperatureMax(Number(text))}
              keyboardType="numeric"
            />

            <VerticalSpacer size={12} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert for consistently low temperature")}
            </Text>
            <TextInput
              label={userViewModel.i18n.t("set threshold temperature minimum")}
              value={thresholdTemperatureMin.toString()}
              onChangeText={(text) => setThresholdTemperatureMin(Number(text))}
              keyboardType="numeric"
            />

            <VerticalSpacer size={12} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert to check if humidity in hive is above maximum threshold")}
            </Text>
            <TextInput
              label={userViewModel.i18n.t("threshold max humidity")}
              value={thresholdHumidityMax.toString()}
              onChangeText={(text) => setThresholdHumidityMax(Number(text))}
              keyboardType="numeric"
            />

            <VerticalSpacer size={12} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert to check if humidity in hive is below minimum threshold")}
            </Text>
            <TextInput
              label={userViewModel.i18n.t("threshold min humidity")}
              value={thresholdHumidityMin.toString()}
              onChangeText={(text) => setThresholdHumidityMin(Number(text))}
              keyboardType="numeric"
            />

            <VerticalSpacer size={12} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert for is early winter ending")}
            </Text>
            <TextInput
              label={userViewModel.i18n.t("early winter end month")}
              value={earlyWinterEnd.toLocaleDateString()}
              editable={false}
            />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("earlyWinterEnd");
                setDatePickerVisible(true);
              }}
            >
              {userViewModel.i18n.t("set early winter end month")}
            </Button>

            <VerticalSpacer size={12} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert for is winter ending")}
            </Text>
            <TextInput
              label={userViewModel.i18n.t("winter end month")}
              value={winterEnd.toLocaleDateString()}
              editable={false}
            />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("winterEnd");
                setDatePickerVisible(true);
              }}
            >
              {userViewModel.i18n.t("set winter end month")}
            </Button>

            <VerticalSpacer size={12} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert to check if many bees have exited the hive")}
            </Text>
            <TextInput
              label={userViewModel.i18n.t("set threshold for high exit count")}
              value={thresholdExitCountHigh.toString()}
              onChangeText={(text) => setThresholdExitCountHigh(Number(text))}
              keyboardType="numeric"
            />
          </View>
        );

      case NotificationType.ConsiderFeeding:
        return (
          <View>
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert for hive weight decrease in early spring")}
            </Text>
            <TextInput
              label={userViewModel.i18n.t("set number for thresholdvalue for weight decrease")}
              value={thresholdWeightDecreaseEarlySpring.toString()}
              onChangeText={(text) => setThresholdWeightDecreaseEarlySpring(Number(text))}
              keyboardType="numeric"
            />
            <TextInput
              label={userViewModel.i18n.t("early spring start month")}
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
              {userViewModel.i18n.t("set early spring start month")}
            </Button>
            <TextInput
              label={userViewModel.i18n.t("early spring end month")}
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
              {userViewModel.i18n.t("set early spring end month")}
            </Button>

            <VerticalSpacer size={12} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert for hive weight decreases in autumn")}
            </Text>
            <TextInput
              label={userViewModel.i18n.t("set number for threshold value for weight decrease")}
              value={thresholdWeightDecreaseInAutumn.toString()}
              onChangeText={(text) => setThresholdWeightDecreaseInAutumn(Number(text))}
              keyboardType="numeric"
            />
            <TextInput
              label={userViewModel.i18n.t("autumn start month")}
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
              {userViewModel.i18n.t("set autumn start month")}
            </Button>

            <TextInput
              label={userViewModel.i18n.t("autumn end month")}
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
              {userViewModel.i18n.t("set autumn end month")}
            </Button>

            <VerticalSpacer size={12} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert for total weight decrease over a period")}
            </Text>
            <TextInput
              label={userViewModel.i18n.t("set number of days for production period")}
              value={productionPeriodDays.toString()}
              onChangeText={(text) => setProductionPeriodDays(Number(text))}
              keyboardType="numeric"
            />
            <TextInput
              label={userViewModel.i18n.t("set number for threshold value for production period")}
              value={productionPeriodThreshold.toString()}
              onChangeText={(text) => setProductionPeriodThreshold(Number(text))}
              keyboardType="numeric"
            />

            <VerticalSpacer size={12} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert for have few bees been exited the hive")}
            </Text>
            <TextInput
              label={userViewModel.i18n.t("set threshold for low exit count")}
              value={thresholdExitCountLow.toString()}
              onChangeText={(text) => setThresholdExitCountLow(Number(text))}
              keyboardType="numeric"
            />
          </View>
        );

      case NotificationType.CustomReminder:
        return <View>{/* Future feature */}</View>;

      default:
        return (
          <View>
            <Text>{userViewModel.i18n.t("unknown parameter")}</Text>
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
          {userViewModel.i18n.t(`notificationType.${props.parameterName}`)}
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
            {userViewModel.i18n.t("confirm")}
          </Button>
        </Modal>
      </Portal>
      <VerticalSpacer size={12} />
      {/*TODO: Save button should be under each threshold-value choice*/}
      <Button mode="contained" onPress={handleSave}>
        {userViewModel.i18n.t("save")}
      </Button>

    </>
  );
};
export default ModalContent;
