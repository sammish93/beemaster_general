import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  Button,
  TextInput,
  IconButton,
  useTheme,
  Modal,
  Portal,
  Divider,
} from "react-native-paper";
import { MobXProviderContext } from "mobx-react";
import DatePickerModal from "./DatePickerModal";
import { VerticalSpacer } from "../Spacers";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { ScrollView, View } from "react-native";
import { NotificationType } from "@/constants/Notifications";
import locales from "@/constants/localisation/calendar";
import Toast from "react-native-toast-message";
import { toastCrossPlatform } from "../ToastCustom";
import styles from "@/assets/styles";
import CalendarModal from "./CalendarModal";
import MonthModal from "./MonthModal";

interface ModalContentProps {
  onClose: () => void;
  onSave: (newValue: string) => void;
  parameterName: NotificationType | undefined;
}

interface DateDetails {
  selected: boolean;
  startingDay: boolean;
  endingDay: boolean;
  color: string;
  textColor: string;
}

interface MarkedDates {
  [key: string]: DateDetails;
}

const ModalContent = (props: ModalContentProps) => {
  const { onClose, onSave, parameterName } = props;
  const theme = useTheme();
  const userViewModel = useContext(MobXProviderContext).userViewModel;

  LocaleConfig.locales = locales;

  LocaleConfig.defaultLocale = userViewModel.i18n.locale;

  //Thresholds weights
  const [thresholdWeightDecreaseInAutumn, setThresholdWeightDecreaseInAutumn] =
    useState<number>(userViewModel.getThresholdWeightDecreaseInAutumn());
  const [
    thresholdWeightDecreaseEarlySpring,
    setThresholdWeightDecreaseEarlySpring,
  ] = useState<number>(userViewModel.getThresholdWeightDecreaseEarlySpring());
  const [thresholdWeightDecrease, setThresholdWeightDecrease] =
    useState<number>(userViewModel.getThresholdWeightDecrease());
  const [thresholdWeightIncrease, setThresholdWeightIncrease] =
    useState<number>(userViewModel.getThresholdWeightIncrease());
  const [productionPeriodDays, setProductionPeriodDays] = useState<number>(
    userViewModel.getProductionPeriodDays()
  );
  const [productionPeriodThreshold, setProductionPeriodThreshold] =
    useState<number>(userViewModel.getProductionPeriodThreshold());

  //Exit
  const [thresholdExitCountHigh, setThresholdExitCountHigh] = useState<number>(
    userViewModel.getThresholdExitCountHigh()
  );
  const [thresholdExitCountLow, setThresholdExitCountLow] = useState<number>(
    userViewModel.getThresholdExitCountLow()
  );

  //Temp
  const [thresholdTemperatureOptimal, setThresholdTemperatureOptimal] =
    useState<number>(userViewModel.getThresholdTemperatureOptimal());

  const [thresholdTemperatureMax, setThresholdTemperatureMax] =
    useState<number>(userViewModel.getThresholdTemperatureMax());
  const [thresholdTemperatureMin, setThresholdTemperatureMin] =
    useState<number>(userViewModel.getThresholdTemperatureMin());

  const [thresholdMinTempInHive, setThresholdMinTempInHive] = useState<number>(
    userViewModel.getThresholdMinTempInHive()
  );
  const [thresholdMaxTempInHive, setThresholdMaxTempInHive] = useState<number>(
    userViewModel.getThresholdMaxTempInHive()
  );

  //Windspeed
  const [thresholdWindSpeedStrong, setThresholdWindSpeedStrong] =
    useState<number>(userViewModel.getThresholdWindSpeedStrong());
  const [thresholdWindSpeedLow, setThresholdWindSpeedLow] = useState<number>(
    userViewModel.getThresholdWindSpeedLow()
  );

  //Humidity
  const [thresholdHumidityMax, setThresholdHumidityMax] = useState<number>(
    userViewModel.getThresholdHumidityMax()
  );
  const [thresholdHumidityMin, setThresholdHumidityMin] = useState<number>(
    userViewModel.getThresholdHumidityMin()
  );

  //Spring
  const [earlySpringStartMonth, setEarlySpringStartMonth] = useState<Date>(
    userViewModel.getEarlySpringStartMonth()
  );
  const [earlySpringEndMonth, setEarlySpringEndMonth] = useState<Date>(
    userViewModel.getEarlySpringEndMonth()
  );
  const [earlySpringMonths, setEarlySpringMonths] = useState<Date[]>(
    userViewModel.getEarlySpringMonths()
  );
  const [lateSpringStartMonth, setLateSpringStartMonth] = useState<Date>(
    userViewModel.getLateSpringStartMonth()
  );
  const [springStartMonth, setSpringStartMonth] = useState<Date>(
    userViewModel.getSpringStartMonth()
  );
  const [springEndMonth, setSpringEndMonth] = useState<Date>(
    userViewModel.getSpringEndMonth()
  );

  //Autumn
  const [autumnStartMonth, setAutumnStartMonth] = useState<Date>(
    userViewModel.getAutumnStartMonth()
  );
  const [autumnEndMonth, setAutumnEndMonth] = useState<Date>(
    userViewModel.getAutumnEndMonth()
  );
  const [autumnMonths, setAutumnMonths] = useState<Date[]>(
    userViewModel.getAutumnMonths()
  );
  const [earlyAutumnMonth, setEarlyAutumnMonth] = useState<Date>(
    userViewModel.getEarlyAutumnMonth()
  );

  //Winter
  const [earlyWinterMonths, setEarlyWinterMonths] = useState<Date[]>(
    userViewModel.getEarlyWinterMonths()
  );
  const [winterStart, setWinterStart] = useState<Date>(
    userViewModel.getWinterStart()
  );
  const [winterEnd, setWinterEnd] = useState<Date>(userViewModel.winterEnd);
  const [earlyWinterStart, setEarlyWinterStart] = useState<Date>(
    userViewModel.getEarlyWinterStart()
  );
  const [earlyWinterEnd, setEarlyWinterEnd] = useState<Date>(
    userViewModel.getEarlyWinterEnd()
  );

  //Summer
  const [summerStartMonth, setSummerStartMonth] = useState<Date>(
    userViewModel.getSummerStartMonth()
  );
  const [summerEndMonth, setSummerEndMonth] = useState<Date>(
    userViewModel.getSummerEndMonth()
  );
  const [earlySummerEndMonth, setEarlySummerEndMonth] = useState<Date>(
    userViewModel.getEarlySummerEndMonth()
  );
  const [earlySummerStartMonth, setEarlySummerStartMonth] = useState<Date>(
    userViewModel.getEarlySummerStartMonth()
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
        userViewModel.setThresholdTemperatureOptimal(
          thresholdTemperatureOptimal
        );

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
        userViewModel.setThresholdWeightDecreaseInAutumn(
          thresholdWeightDecreaseInAutumn
        );
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
        userViewModel.setThresholdTemperatureOptimal(
          thresholdTemperatureOptimal
        );
        userViewModel.setSummerEndMonth(summerEndMonth);
      },
      [NotificationType.Maintenance]: () => {
        userViewModel.setEarlySpringStartMonth(earlySpringStartMonth);
        userViewModel.setAutumnEndMonth(autumnEndMonth);
        userViewModel.setThresholdWindSpeedLow(thresholdWindSpeedLow);
        userViewModel.setThresholdTemperatureMax(thresholdTemperatureMax);
        userViewModel.setSummerStartMonth(summerStartMonth);
        userViewModel.setEarlyAutumnMonth(earlyAutumnMonth);
        userViewModel.setThresholdTemperatureOptimal(
          thresholdTemperatureOptimal
        );
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
      [NotificationType.CustomReminder]: () => {},
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
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});
  const [selectedMonths, setSelectedMonths] = useState<Date[]>([]);
  const [activeField2, setActiveField2] = useState("");

  const onDayPress = (day: { dateString: string }) => {
    let newMarkedDates = { ...markedDates };

    if (newMarkedDates[day.dateString]) {
      // Unmark date if already selected.
      delete newMarkedDates[day.dateString];
    } else {
      const selectedKeys = Object.keys(newMarkedDates).filter(
        (key) => newMarkedDates[key].selected
      );

      // Checks to see only 2 dates are displayed.
      if (selectedKeys.length < 2) {
        newMarkedDates[day.dateString] = {
          selected: true,
          startingDay: false,
          endingDay: false,
          color: theme.colors.primaryContainer,
          textColor: theme.colors.onPrimaryContainer,
        };
      } else {
        // TODO - Add mobile implementation.
        alert(
          "You can only select a maximum of 2 dates. Unselect another date first."
        );
        return;
      }
    }

    // Sorts selected dates ascending.
    const sortedKeys = Object.keys(newMarkedDates)
      .filter((key) => newMarkedDates[key].selected)
      .sort();

    // Adds additional properties for front-end display by filling in all dates in between dates chosen.
    const sortedMarkedDates: MarkedDates = {};
    if (sortedKeys.length === 2) {
      const startDate = new Date(sortedKeys[0]);
      const endDate = new Date(sortedKeys[1]);
      for (
        let dt = new Date(startDate);
        dt <= endDate;
        dt.setDate(dt.getDate() + 1)
      ) {
        const isoDate = dt.toISOString().split("T")[0];
        sortedMarkedDates[isoDate] = {
          selected: true,
          startingDay: false,
          endingDay: false,
          color: theme.colors.primaryContainer,
          textColor: theme.colors.onPrimaryContainer,
        };
      }

      // Adds additional properties to signal which dates have been chosen via front-end bezels.
      sortedMarkedDates[sortedKeys[0]].startingDay = true;
      sortedMarkedDates[sortedKeys[1]].endingDay = true;
    } else if (sortedKeys.length === 1) {
      sortedMarkedDates[sortedKeys[0]] = {
        selected: true,
        startingDay: true,
        endingDay: true,
        color: theme.colors.primaryContainer,
        textColor: theme.colors.onPrimaryContainer,
      };
    }

    setMarkedDates(sortedMarkedDates);
  };

  const openCalendarModal = (field: string) => {
    setActiveField2(field);
    setCalendarModalVisible(true);
  };

  const onConfirmSelection = () => {
    // Generate an array of Date objects based on the marked dates.
    const allSelectedDates = Object.entries(markedDates)
      .filter(([_, value]) => value.selected)
      .map(([key]) => new Date(key));

    // Restrict the dates to only the first and last object - gets rid of the dates in between
    // that were required for front-end date period display.
    const selectedDates =
      allSelectedDates.length > 1
        ? [allSelectedDates[0], allSelectedDates[allSelectedDates.length - 1]]
        : allSelectedDates; // TODO - throw an error that the user can't select a single date.

    setSelectedMonths(selectedDates);

    // Update the appropriate state based on activeField2
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
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t("set threshold wind speed")}
              value={thresholdWindSpeedStrong.toString()}
              onChangeText={(text) => setThresholdWindSpeedStrong(Number(text))}
              keyboardType="numeric"
            />

            <VerticalSpacer size={8} />
            <Divider style={{ backgroundColor: theme.colors.outline }} />
            <VerticalSpacer size={8} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert for consistently high temperature")}
            </Text>
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t("set threshold max temperature")}
              value={thresholdTemperatureMax.toString()}
              onChangeText={(text) => setThresholdTemperatureMax(Number(text))}
              keyboardType="numeric"
            />

            <VerticalSpacer size={8} />
            <Divider style={{ backgroundColor: theme.colors.outline }} />
            <VerticalSpacer size={8} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t(
                "alert for is 'snow' forecasted during specific seasons"
              )}
            </Text>
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t("autumn months")}
              value={autumnMonths
                .map((date) =>
                  date.toLocaleDateString(userViewModel.i18n.locale)
                )
                .join(", ")}
              editable={false}
            />
            <VerticalSpacer size={4} />
            <Button
              mode="contained"
              onPress={() => openCalendarModal("autumnMonths")}
            >
              {userViewModel.i18n.t("set autumn months")}
            </Button>
            <VerticalSpacer size={12} />
            <TextInput
              label={userViewModel.i18n.t("early winter months")}
              value={earlyWinterMonths
                .map((date) =>
                  date.toLocaleDateString(userViewModel.i18n.locale)
                )
                .join(", ")}
              editable={false}
            />
            <VerticalSpacer size={4} />
            <Button
              mode="contained"
              onPress={() => openCalendarModal("earlyWinterMonths")}
            >
              {userViewModel.i18n.t("set early winter months")}
            </Button>
            <VerticalSpacer size={12} />
            <TextInput
              label={userViewModel.i18n.t("early spring months")}
              value={earlySpringMonths
                .map((date) =>
                  date.toLocaleDateString(userViewModel.i18n.locale)
                )
                .join(", ")}
              editable={false}
            />
            <VerticalSpacer size={4} />
            <Button
              mode="contained"
              onPress={() => openCalendarModal("earlySpringMonths")}
            >
              {userViewModel.i18n.t("set early spring months")}
            </Button>

            <VerticalSpacer size={8} />
            <Divider style={{ backgroundColor: theme.colors.outline }} />
            <VerticalSpacer size={8} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t(
                "alert for is 'snow' forecasted during autumn"
              )}
            </Text>
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t("autumn start month")}
              value={autumnStartMonth.toLocaleDateString(
                userViewModel.i18n.locale
              )}
              editable={false}
            />
            <VerticalSpacer size={4} />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("autumnStartMonth");
                setDatePickerVisible(true);
              }}
            >
              {" "}
              {userViewModel.i18n.t("set autumn start month")}
            </Button>
            <VerticalSpacer size={12} />
            <TextInput
              label={userViewModel.i18n.t("autumn end month")}
              value={autumnEndMonth.toLocaleDateString(
                userViewModel.i18n.locale
              )}
              editable={false}
            />
            <VerticalSpacer size={4} />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("autumnEndMonth");
                setDatePickerVisible(true);
              }}
            >
              {" "}
              {userViewModel.i18n.t("set autumn end month")}
            </Button>

            <VerticalSpacer size={8} />
            <Divider style={{ backgroundColor: theme.colors.outline }} />
            <VerticalSpacer size={8} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t(
                "alert for ideal bee weather between early spring and end autumn"
              )}
            </Text>
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t("set threshold for low wind speed")}
              value={thresholdWindSpeedLow.toString()}
              onChangeText={(text) => setThresholdWindSpeedLow(Number(text))}
              keyboardType="numeric"
            />
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t(
                "set threshold for optimal temperature"
              )}
              value={thresholdTemperatureOptimal.toString()}
              onChangeText={(text) =>
                setThresholdTemperatureOptimal(Number(text))
              }
              keyboardType="numeric"
            />
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t("early spring start month")}
              value={earlySpringStartMonth.toLocaleDateString(
                userViewModel.i18n.locale
              )}
              editable={false}
            />
            <VerticalSpacer size={4} />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("earlySpringStartMonth");
                setDatePickerVisible(true);
              }}
            >
              {" "}
              {userViewModel.i18n.t("set early spring start month")}
            </Button>
            <VerticalSpacer size={12} />
            <TextInput
              label={userViewModel.i18n.t("autumn end month")}
              value={autumnEndMonth.toLocaleDateString(
                userViewModel.i18n.locale
              )}
              editable={false}
            />
            <VerticalSpacer size={4} />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("autumnEndMonth");
                setDatePickerVisible(true);
              }}
            >
              {" "}
              {userViewModel.i18n.t("set autumn end month")}
            </Button>

            <VerticalSpacer size={8} />
            <Divider style={{ backgroundColor: theme.colors.outline }} />
            <VerticalSpacer size={8} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert for is winter starting")}
            </Text>
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t("set threshold temperature minimum")}
              value={thresholdTemperatureMin.toString()}
              onChangeText={(text) => setThresholdTemperatureMin(Number(text))}
              keyboardType="numeric"
            />
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t("winter start month")}
              value={winterStart.toLocaleDateString(userViewModel.i18n.locale)}
              editable={false}
            />
            <VerticalSpacer size={4} />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("winterStart");
                setDatePickerVisible(true);
              }}
            >
              {" "}
              {userViewModel.i18n.t("set winter start month")}
            </Button>

            <VerticalSpacer size={8} />
            <Divider style={{ backgroundColor: theme.colors.outline }} />
            <VerticalSpacer size={8} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert for is winter ending")}
            </Text>
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t("set threshold temperature minimum")}
              value={thresholdTemperatureMin.toString()}
              onChangeText={(text) => setThresholdTemperatureMin(Number(text))}
              keyboardType="numeric"
            />
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t("winter end month")}
              value={winterEnd.toLocaleDateString(userViewModel.i18n.locale)}
              editable={false}
            />
            <VerticalSpacer size={4} />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("winterEnd");
                setDatePickerVisible(true);
              }}
            >
              {" "}
              {userViewModel.i18n.t("set winter end month")}
            </Button>

            <VerticalSpacer size={8} />
            <Divider style={{ backgroundColor: theme.colors.outline }} />
            <VerticalSpacer size={8} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert for is early winter starting")}
            </Text>
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t("early winter start month")}
              value={earlyWinterStart.toLocaleDateString(
                userViewModel.i18n.locale
              )}
              editable={false}
            />
            <VerticalSpacer size={4} />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("earlyWinterStart");
                setDatePickerVisible(true);
              }}
            >
              {" "}
              {userViewModel.i18n.t("set early winter start month")}
            </Button>

            <VerticalSpacer size={8} />
            <Divider style={{ backgroundColor: theme.colors.outline }} />
            <VerticalSpacer size={8} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert for is currently spring season")}
            </Text>
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t("spring start month")}
              value={springStartMonth.toLocaleDateString(
                userViewModel.i18n.locale
              )}
              editable={false}
            />
            <VerticalSpacer size={4} />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("springStartMonth");
                setDatePickerVisible(true);
              }}
            >
              {" "}
              {userViewModel.i18n.t("set spring start month")}
            </Button>
            <VerticalSpacer size={12} />
            <TextInput
              label={userViewModel.i18n.t("spring end month")}
              value={springEndMonth.toLocaleDateString(
                userViewModel.i18n.locale
              )}
              editable={false}
            />
            <VerticalSpacer size={4} />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("springEndMonth");
                setDatePickerVisible(true);
              }}
            >
              {" "}
              {userViewModel.i18n.t("set spring end month")}
            </Button>
          </View>
        );

      case NotificationType.PossibleSwarm:
        return (
          <View>
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t(
                "alert between late spring and early summer"
              )}
            </Text>
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t("late spring start month")}
              value={lateSpringStartMonth.toLocaleDateString(
                userViewModel.i18n.locale
              )}
              editable={false}
            />
            <VerticalSpacer size={4} />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("lateSpringStartMonth");
                setDatePickerVisible(true);
              }}
            >
              {" "}
              {userViewModel.i18n.t("set late spring start month")}
            </Button>
            <VerticalSpacer size={12} />
            <TextInput
              label={userViewModel.i18n.t("early summer start month")}
              value={earlySummerStartMonth.toLocaleDateString(
                userViewModel.i18n.locale
              )}
              editable={false}
            />
            <VerticalSpacer size={4} />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("earlySummerStartMonth");
                setDatePickerVisible(true);
              }}
            >
              {" "}
              {userViewModel.i18n.t("set early summer start month")}
            </Button>

            <VerticalSpacer size={8} />
            <Divider style={{ backgroundColor: theme.colors.outline }} />
            <VerticalSpacer size={8} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t(
                "alert for hive weight decreases significantly"
              )}
            </Text>
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t(
                "set number for threshold value for weight decrease"
              )}
              value={thresholdWeightDecrease.toString()}
              onChangeText={(text) => setThresholdWeightDecrease(Number(text))}
              keyboardType="numeric"
            />
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t(
                "set number of days for production period"
              )}
              value={productionPeriodDays.toString()}
              onChangeText={(text) => setProductionPeriodDays(Number(text))}
              keyboardType="numeric"
            />

            <VerticalSpacer size={8} />
            <Divider style={{ backgroundColor: theme.colors.outline }} />
            <VerticalSpacer size={8} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t(
                "alert to check if many bees have exited the hive"
              )}
            </Text>
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t("set threshold for high exit count")}
              value={thresholdExitCountHigh.toString()}
              onChangeText={(text) => setThresholdExitCountHigh(Number(text))}
              keyboardType="numeric"
            />

            <VerticalSpacer size={8} />
            <Divider style={{ backgroundColor: theme.colors.outline }} />
            <VerticalSpacer size={8} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t(
                "alert for have few bees been exited the hive"
              )}
            </Text>
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t("set threshold for low exit count")}
              value={thresholdExitCountLow.toString()}
              onChangeText={(text) => setThresholdExitCountLow(Number(text))}
              keyboardType="numeric"
            />

            <VerticalSpacer size={8} />
            <Divider style={{ backgroundColor: theme.colors.outline }} />
            <VerticalSpacer size={8} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t(
                "alert for total weight decrease over a period"
              )}
            </Text>
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t(
                "set number of days for production period"
              )}
              value={productionPeriodDays.toString()}
              onChangeText={(text) => setProductionPeriodDays(Number(text))}
              keyboardType="numeric"
            />
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t(
                "set number for threshold value for production period"
              )}
              value={productionPeriodThreshold.toString()}
              onChangeText={(text) =>
                setProductionPeriodThreshold(Number(text))
              }
              keyboardType="numeric"
            />

            <VerticalSpacer size={8} />
            <Divider style={{ backgroundColor: theme.colors.outline }} />
            <VerticalSpacer size={8} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t(
                "alert for possible swarming based on defined season"
              )}
            </Text>
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t("late spring start month")}
              value={lateSpringStartMonth.toLocaleDateString(
                userViewModel.i18n.locale
              )}
              editable={false}
            />
            <VerticalSpacer size={4} />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("lateSpringStartMonth");
                setDatePickerVisible(true);
              }}
            >
              {" "}
              {userViewModel.i18n.t("set late spring start month")}
            </Button>
            <VerticalSpacer size={12} />
            <TextInput
              label={userViewModel.i18n.t("early summer end month")}
              value={earlySummerEndMonth.toLocaleDateString(
                userViewModel.i18n.locale
              )}
              editable={false}
            />
            <VerticalSpacer size={4} />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("earlySummerEndMonth");
                setDatePickerVisible(true);
              }}
            >
              {" "}
              {userViewModel.i18n.t("set early summer end month")}
            </Button>
          </View>
        );

      case NotificationType.HoneyHarvest:
        return (
          <View>
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t(
                "alert for ideal bee weather between summer and early autumn"
              )}
            </Text>
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t("set threshold for low wind speed")}
              value={thresholdWindSpeedLow.toString()}
              onChangeText={(text) => setThresholdWindSpeedLow(Number(text))}
              keyboardType="numeric"
            />
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t(
                "set threshold for optimal temperature"
              )}
              value={thresholdTemperatureOptimal.toString()}
              onChangeText={(text) =>
                setThresholdTemperatureOptimal(Number(text))
              }
              keyboardType="numeric"
            />
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t("early autumn month")}
              value={earlyAutumnMonth.toLocaleDateString(
                userViewModel.i18n.locale
              )}
              editable={false}
            />
            <VerticalSpacer size={4} />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("earlyAutumnMonth");
                setDatePickerVisible(true);
              }}
            >
              {userViewModel.i18n.t("set early autumn month")}
            </Button>
            <VerticalSpacer size={12} />
            <TextInput
              label={userViewModel.i18n.t("summer start month")}
              value={summerStartMonth.toLocaleDateString(
                userViewModel.i18n.locale
              )}
              editable={false}
            />
            <VerticalSpacer size={4} />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("summerStartMonth");
                setDatePickerVisible(true);
              }}
            >
              {userViewModel.i18n.t("set summer start month")}
            </Button>

            <VerticalSpacer size={8} />
            <Divider style={{ backgroundColor: theme.colors.outline }} />
            <VerticalSpacer size={8} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t(
                "alert for ideal bee weather between early spring and end autumn"
              )}
            </Text>
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t("set threshold for low wind speed")}
              value={thresholdWindSpeedLow.toString()}
              onChangeText={(text) => setThresholdWindSpeedLow(Number(text))}
              keyboardType="numeric"
            />
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t(
                "set threshold for optimal temperature"
              )}
              value={thresholdTemperatureOptimal.toString()}
              onChangeText={(text) =>
                setThresholdTemperatureOptimal(Number(text))
              }
              keyboardType="numeric"
            />
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t("early spring start month")}
              value={earlySpringStartMonth.toLocaleDateString(
                userViewModel.i18n.locale
              )}
              editable={false}
            />
            <VerticalSpacer size={4} />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("earlySpringStartMonth");
                setDatePickerVisible(true);
              }}
            >
              {userViewModel.i18n.t("set early spring start month")}
            </Button>
            <VerticalSpacer size={12} />
            <TextInput
              label={userViewModel.i18n.t("autumn end month")}
              value={autumnEndMonth.toLocaleDateString(
                userViewModel.i18n.locale
              )}
              editable={false}
            />
            <VerticalSpacer size={4} />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("autumnEndMonth");
                setDatePickerVisible(true);
              }}
            >
              {" "}
              {userViewModel.i18n.t("set autumn end month")}
            </Button>

            <VerticalSpacer size={8} />
            <Divider style={{ backgroundColor: theme.colors.outline }} />
            <VerticalSpacer size={8} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t(
                "alert for significant increase in hive weight"
              )}
            </Text>
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t(
                "set number for threshold value for weight increase"
              )}
              value={thresholdWeightIncrease.toString()}
              onChangeText={(text) => setThresholdWeightIncrease(Number(text))}
              keyboardType="numeric"
            />

            <VerticalSpacer size={8} />
            <Divider style={{ backgroundColor: theme.colors.outline }} />
            <VerticalSpacer size={8} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t(
                "alert for total weight increase over a period"
              )}
            </Text>
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t(
                "set number of days for production period"
              )}
              value={productionPeriodDays.toString()}
              onChangeText={(text) => setProductionPeriodDays(Number(text))}
              keyboardType="numeric"
            />
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t(
                "set number for threshold value for production period"
              )}
              value={productionPeriodThreshold.toString()}
              onChangeText={(text) =>
                setProductionPeriodThreshold(Number(text))
              }
              keyboardType="numeric"
            />

            <VerticalSpacer size={8} />
            <Divider style={{ backgroundColor: theme.colors.outline }} />
            <VerticalSpacer size={8} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert for summer season")}
            </Text>
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t("summer start month")}
              value={summerStartMonth.toLocaleDateString(
                userViewModel.i18n.locale
              )}
              editable={false}
            />
            <VerticalSpacer size={4} />
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
            <TextInput
              label={userViewModel.i18n.t("summer end month")}
              value={summerEndMonth.toLocaleDateString(
                userViewModel.i18n.locale
              )}
              editable={false}
            />
            <VerticalSpacer size={4} />
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
              {userViewModel.i18n.t(
                "alert for ideal bee weather between early spring and end autumn"
              )}
            </Text>
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t("set threshold for low wind speed")}
              value={thresholdWindSpeedLow.toString()}
              onChangeText={(text) => setThresholdWindSpeedLow(Number(text))}
              keyboardType="numeric"
            />
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t(
                "set threshold for optimal temperature"
              )}
              value={thresholdTemperatureOptimal.toString()}
              onChangeText={(text) =>
                setThresholdTemperatureOptimal(Number(text))
              }
              keyboardType="numeric"
            />
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t("early spring start month")}
              value={earlySpringStartMonth.toLocaleDateString(
                userViewModel.i18n.locale
              )}
              editable={false}
            />
            <VerticalSpacer size={4} />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("earlySpringStartMonth");
                setDatePickerVisible(true);
              }}
            >
              {userViewModel.i18n.t("set early spring start month")}
            </Button>
            <VerticalSpacer size={12} />
            <TextInput
              label={userViewModel.i18n.t("autumn end month")}
              value={autumnEndMonth.toLocaleDateString(
                userViewModel.i18n.locale
              )}
              editable={false}
            />
            <VerticalSpacer size={4} />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("autumnEndMonth");
                setDatePickerVisible(true);
              }}
            >
              {userViewModel.i18n.t("set autumn end month")}
            </Button>

            <VerticalSpacer size={8} />
            <Divider style={{ backgroundColor: theme.colors.outline }} />
            <VerticalSpacer size={8} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t(
                "alert for ideal bee weather between summer and early autumn"
              )}
            </Text>
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t("set threshold for low wind speed")}
              value={thresholdWindSpeedLow.toString()}
              onChangeText={(text) => setThresholdWindSpeedLow(Number(text))}
              keyboardType="numeric"
            />
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t(
                "set threshold for optimal temperature"
              )}
              value={thresholdTemperatureOptimal.toString()}
              onChangeText={(text) =>
                setThresholdTemperatureOptimal(Number(text))
              }
              keyboardType="numeric"
            />
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t("summer start month")}
              value={summerStartMonth.toLocaleDateString(
                userViewModel.i18n.locale
              )}
              editable={false}
            />
            <VerticalSpacer size={4} />
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
            <TextInput
              label={userViewModel.i18n.t("early autumn month")}
              value={earlyAutumnMonth.toLocaleDateString(
                userViewModel.i18n.locale
              )}
              editable={false}
            />
            <VerticalSpacer size={4} />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("earlyAutumnMonth");
                setDatePickerVisible(true);
              }}
            >
              {userViewModel.i18n.t("set early autumn month")}
            </Button>

            <VerticalSpacer size={8} />
            <Divider style={{ backgroundColor: theme.colors.outline }} />
            <VerticalSpacer size={8} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert for is early summer starting")}
            </Text>
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t("early summer start month")}
              value={earlySummerStartMonth.toLocaleDateString(
                userViewModel.i18n.locale
              )}
              editable={false}
            />
            <VerticalSpacer size={4} />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("earlySummerStartMonth");
                setDatePickerVisible(true);
              }}
            >
              {userViewModel.i18n.t("set early summer start month")}
            </Button>

            <VerticalSpacer size={8} />
            <Divider style={{ backgroundColor: theme.colors.outline }} />
            <VerticalSpacer size={8} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert to check if it's spring")}
            </Text>
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t("spring start month")}
              value={springStartMonth.toLocaleDateString(
                userViewModel.i18n.locale
              )}
              editable={false}
            />
            <VerticalSpacer size={4} />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("springStartMonth");
                setDatePickerVisible(true);
              }}
            >
              {userViewModel.i18n.t("set spring start month")}
            </Button>
            <VerticalSpacer size={12} />
            <TextInput
              label={userViewModel.i18n.t("spring end month")}
              value={springEndMonth.toLocaleDateString(
                userViewModel.i18n.locale
              )}
              editable={false}
            />
            <VerticalSpacer size={4} />
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
              {userViewModel.i18n.t(
                "alert for significant increase in hive weigh"
              )}
            </Text>
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t(
                "set number for threshold value for weight increase"
              )}
              value={thresholdWeightIncrease.toString()}
              onChangeText={(text) => setThresholdWeightIncrease(Number(text))}
              keyboardType="numeric"
            />

            <VerticalSpacer size={8} />
            <Divider style={{ backgroundColor: theme.colors.outline }} />
            <VerticalSpacer size={8} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t(
                "alert for total weight increase over a period"
              )}
            </Text>
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t(
                "set number of days for production period"
              )}
              value={productionPeriodDays.toString()}
              onChangeText={(text) => setProductionPeriodDays(Number(text))}
              keyboardType="numeric"
            />
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t(
                "set number for threshold value for production period"
              )}
              value={productionPeriodThreshold.toString()}
              onChangeText={(text) =>
                setProductionPeriodThreshold(Number(text))
              }
              keyboardType="numeric"
            />

            <VerticalSpacer size={8} />
            <Divider style={{ backgroundColor: theme.colors.outline }} />
            <VerticalSpacer size={8} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert for consistently high temperature")}
            </Text>
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t("set threshold max temperature")}
              value={thresholdTemperatureMax.toString()}
              onChangeText={(text) => setThresholdTemperatureMax(Number(text))}
              keyboardType="numeric"
            />

            <VerticalSpacer size={8} />
            <Divider style={{ backgroundColor: theme.colors.outline }} />
            <VerticalSpacer size={8} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert for is early summer starting")}
            </Text>
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t("early summer start month")}
              value={earlySummerStartMonth.toLocaleDateString(
                userViewModel.i18n.locale
              )}
              editable={false}
            />
            <VerticalSpacer size={4} />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("earlySummerStartMonth");
                setDatePickerVisible(true);
              }}
            >
              {userViewModel.i18n.t("set early summer start month")}
            </Button>

            <VerticalSpacer size={8} />
            <Divider style={{ backgroundColor: theme.colors.outline }} />
            <VerticalSpacer size={8} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert for is spring season")}
            </Text>
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t("spring start month")}
              value={springStartMonth.toLocaleDateString(
                userViewModel.i18n.locale
              )}
              editable={false}
            />
            <VerticalSpacer size={4} />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("springStartMonth");
                setDatePickerVisible(true);
              }}
            >
              {userViewModel.i18n.t("set spring start month")}
            </Button>
            <VerticalSpacer size={12} />
            <TextInput
              label={userViewModel.i18n.t("spring end month")}
              value={springEndMonth.toLocaleDateString(
                userViewModel.i18n.locale
              )}
              editable={false}
            />
            <VerticalSpacer size={4} />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("springEndMonth");
                setDatePickerVisible(true);
              }}
            >
              {userViewModel.i18n.t("set spring end month")}
            </Button>

            <VerticalSpacer size={8} />
            <Divider style={{ backgroundColor: theme.colors.outline }} />
            <VerticalSpacer size={8} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert for summer season")}
            </Text>
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t("summer start month")}
              value={summerStartMonth.toLocaleDateString(
                userViewModel.i18n.locale
              )}
              editable={false}
            />
            <VerticalSpacer size={4} />
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
            <TextInput
              label={userViewModel.i18n.t("summer end month")}
              value={summerEndMonth.toLocaleDateString(
                userViewModel.i18n.locale
              )}
              editable={false}
            />
            <VerticalSpacer size={4} />
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
              {userViewModel.i18n.t(
                "alert to check if hive temperature is too warm"
              )}
            </Text>
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t(
                "set threshold max temperature for hive"
              )}
              value={thresholdMaxTempInHive.toString()}
              onChangeText={(text) => setThresholdMaxTempInHive(Number(text))}
              keyboardType="numeric"
            />
            <VerticalSpacer size={8} />
            <Divider style={{ backgroundColor: theme.colors.outline }} />
            <VerticalSpacer size={8} />

            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t(
                "alert to check if hive temperature is too cold"
              )}
            </Text>
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t(
                "set threshold minimum temperature for hive"
              )}
              value={thresholdMinTempInHive.toString()}
              onChangeText={(text) => setThresholdMinTempInHive(Number(text))}
              keyboardType="numeric"
            />

            <VerticalSpacer size={8} />
            <Divider style={{ backgroundColor: theme.colors.outline }} />
            <VerticalSpacer size={8} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert for consistently high temperature")}
            </Text>
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t("set threshold max temperature")}
              value={thresholdTemperatureMax.toString()}
              onChangeText={(text) => setThresholdTemperatureMax(Number(text))}
              keyboardType="numeric"
            />

            <VerticalSpacer size={8} />
            <Divider style={{ backgroundColor: theme.colors.outline }} />
            <VerticalSpacer size={8} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert for consistently low temperature")}
            </Text>
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t("set threshold temperature minimum")}
              value={thresholdTemperatureMin.toString()}
              onChangeText={(text) => setThresholdTemperatureMin(Number(text))}
              keyboardType="numeric"
            />

            <VerticalSpacer size={8} />
            <Divider style={{ backgroundColor: theme.colors.outline }} />
            <VerticalSpacer size={8} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t(
                "alert to check if humidity in hive is above maximum threshold"
              )}
            </Text>
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t("threshold max humidity")}
              value={thresholdHumidityMax.toString()}
              onChangeText={(text) => setThresholdHumidityMax(Number(text))}
              keyboardType="numeric"
            />

            <VerticalSpacer size={8} />
            <Divider style={{ backgroundColor: theme.colors.outline }} />
            <VerticalSpacer size={8} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t(
                "alert to check if humidity in hive is below minimum threshold"
              )}
            </Text>
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t("threshold min humidity")}
              value={thresholdHumidityMin.toString()}
              onChangeText={(text) => setThresholdHumidityMin(Number(text))}
              keyboardType="numeric"
            />

            <VerticalSpacer size={8} />
            <Divider style={{ backgroundColor: theme.colors.outline }} />
            <VerticalSpacer size={8} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert for is early winter ending")}
            </Text>
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t("early winter end month")}
              value={earlyWinterEnd.toLocaleDateString(
                userViewModel.i18n.locale
              )}
              editable={false}
            />
            <VerticalSpacer size={4} />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("earlyWinterEnd");
                setDatePickerVisible(true);
              }}
            >
              {userViewModel.i18n.t("set early winter end month")}
            </Button>

            <VerticalSpacer size={8} />
            <Divider style={{ backgroundColor: theme.colors.outline }} />
            <VerticalSpacer size={8} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t("alert for is winter ending")}
            </Text>
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t("winter end month")}
              value={winterEnd.toLocaleDateString(userViewModel.i18n.locale)}
              editable={false}
            />
            <VerticalSpacer size={4} />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("winterEnd");
                setDatePickerVisible(true);
              }}
            >
              {userViewModel.i18n.t("set winter end month")}
            </Button>

            <VerticalSpacer size={8} />
            <Divider style={{ backgroundColor: theme.colors.outline }} />
            <VerticalSpacer size={8} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t(
                "alert to check if many bees have exited the hive"
              )}
            </Text>
            <VerticalSpacer size={4} />
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
              {userViewModel.i18n.t(
                "alert for hive weight decrease in early spring"
              )}
            </Text>
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t(
                "set number for thresholdvalue for weight decrease"
              )}
              value={thresholdWeightDecreaseEarlySpring.toString()}
              onChangeText={(text) =>
                setThresholdWeightDecreaseEarlySpring(Number(text))
              }
              keyboardType="numeric"
            />
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t("early spring start month")}
              value={earlySpringStartMonth.toLocaleDateString(
                userViewModel.i18n.locale
              )}
              editable={false}
            />
            <VerticalSpacer size={4} />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("earlySpringStartMonth");
                setDatePickerVisible(true);
              }}
            >
              {userViewModel.i18n.t("set early spring start month")}
            </Button>
            <VerticalSpacer size={12} />
            <TextInput
              label={userViewModel.i18n.t("early spring end month")}
              value={earlySpringEndMonth.toLocaleDateString(
                userViewModel.i18n.locale
              )}
              editable={false}
            />
            <VerticalSpacer size={4} />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("earlySpringEndMonth");
                setDatePickerVisible(true);
              }}
            >
              {userViewModel.i18n.t("set early spring end month")}
            </Button>

            <VerticalSpacer size={8} />
            <Divider style={{ backgroundColor: theme.colors.outline }} />
            <VerticalSpacer size={8} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t(
                "alert for hive weight decreases in autumn"
              )}
            </Text>
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t(
                "set number for threshold value for weight decrease"
              )}
              value={thresholdWeightDecreaseInAutumn.toString()}
              onChangeText={(text) =>
                setThresholdWeightDecreaseInAutumn(Number(text))
              }
              keyboardType="numeric"
            />
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t("autumn start month")}
              value={autumnStartMonth.toLocaleDateString(
                userViewModel.i18n.locale
              )}
              editable={false}
            />
            <VerticalSpacer size={4} />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("autumnStartMonth");
                setDatePickerVisible(true);
              }}
            >
              {userViewModel.i18n.t("set autumn start month")}
            </Button>
            <VerticalSpacer size={12} />
            <TextInput
              label={userViewModel.i18n.t("autumn end month")}
              value={autumnEndMonth.toLocaleDateString(
                userViewModel.i18n.locale
              )}
              editable={false}
            />
            <VerticalSpacer size={4} />
            <Button
              mode="contained"
              onPress={() => {
                setActiveField("autumnEndMonth");
                setDatePickerVisible(true);
              }}
            >
              {userViewModel.i18n.t("set autumn end month")}
            </Button>

            <VerticalSpacer size={8} />
            <Divider style={{ backgroundColor: theme.colors.outline }} />
            <VerticalSpacer size={8} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t(
                "alert for total weight decrease over a period"
              )}
            </Text>
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t(
                "set number of days for production period"
              )}
              value={productionPeriodDays.toString()}
              onChangeText={(text) => setProductionPeriodDays(Number(text))}
              keyboardType="numeric"
            />
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t(
                "set number for threshold value for production period"
              )}
              value={productionPeriodThreshold.toString()}
              onChangeText={(text) =>
                setProductionPeriodThreshold(Number(text))
              }
              keyboardType="numeric"
            />

            <VerticalSpacer size={8} />
            <Divider style={{ backgroundColor: theme.colors.outline }} />
            <VerticalSpacer size={8} />
            <Text style={{ ...theme.fonts.bodyLarge, flex: 1 }}>
              {userViewModel.i18n.t(
                "alert for have few bees been exited the hive"
              )}
            </Text>
            <VerticalSpacer size={4} />
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
      {renderContent()}

      <VerticalSpacer size={12} />

      {/*TODO: Save button should be under each threshold-value choice*/}
      <Button mode="contained" onPress={handleSave}>
        {userViewModel.i18n.t("save")}
      </Button>
      <CalendarModal
        isOverlayModalVisible={isCalendarModalVisible}
        onClose={() => {
          setCalendarModalVisible(false);
          setMarkedDates({});
        }}
        onDayPress={onDayPress}
        markedDates={markedDates}
        setMarkedDates={() => setMarkedDates({})}
        onConfirmSelection={onConfirmSelection}
      />
      <MonthModal
        isOverlayModalVisible={datePickerVisible}
        onClose={() => {
          setDatePickerVisible(false);
        }}
        onConfirm={onConfirm}
      />
    </>
  );
};
export default ModalContent;
