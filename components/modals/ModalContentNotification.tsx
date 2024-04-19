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

  const [errorValidationMessage, setIsErrorValidationMessage] =
    useState<string>("");

  //Thresholds weights
  const [thresholdWeightDecreaseInAutumn, setThresholdWeightDecreaseInAutumn] =
    useState<number>(userViewModel.getThresholdWeightDecreaseInAutumn());
  const [
    isThresholdWeightDecreaseInAutumnValid,
    setIsThresholdWeightDecreaseInAutumnValid,
  ] = useState<boolean>();
  const [
    thresholdWeightDecreaseEarlySpring,
    setThresholdWeightDecreaseEarlySpring,
  ] = useState<number>(userViewModel.getThresholdWeightDecreaseEarlySpring());
  const [
    isThresholdWeightDecreaseEarlySpringValid,
    setIsThresholdWeightDecreaseEarlySpringValid,
  ] = useState<boolean>();
  const [thresholdWeightDecrease, setThresholdWeightDecrease] =
    useState<number>(userViewModel.getThresholdWeightDecrease());
  const [isThresholdWeightDecreaseValid, setIsThresholdWeightDecreaseValid] =
    useState<boolean>();
  const [thresholdWeightIncrease, setThresholdWeightIncrease] =
    useState<number>(userViewModel.getThresholdWeightIncrease());
  const [isThresholdWeightIncreaseValid, setIsThresholdWeightIncreaseValid] =
    useState<boolean>();
  const [productionPeriodDays, setProductionPeriodDays] = useState<number>(
    userViewModel.getProductionPeriodDays()
  );
  const [isProductionPeriodDaysValid, setIsProductionPeriodDaysValid] =
    useState<boolean>();
  const [productionPeriodThreshold, setProductionPeriodThreshold] =
    useState<number>(userViewModel.getProductionPeriodThreshold());
  const [
    isProductionPeriodThresholdValid,
    setIsProductionPeriodThresholdValid,
  ] = useState<boolean>();

  //Exit
  const [thresholdExitCountHigh, setThresholdExitCountHigh] = useState<number>(
    userViewModel.getThresholdExitCountHigh()
  );
  const [isThresholdExitCountHighValid, setIsThresholdExitCountHighValid] =
    useState<boolean>();
  const [thresholdExitCountLow, setThresholdExitCountLow] = useState<number>(
    userViewModel.getThresholdExitCountLow()
  );
  const [isThresholdExitCountLowValid, setIsThresholdExitCountLowValid] =
    useState<boolean>();

  //Temp
  const [thresholdTemperatureOptimal, setThresholdTemperatureOptimal] =
    useState<number>(userViewModel.getThresholdTemperatureOptimal());
  const [
    isThresholdTemperatureOptimalValid,
    setIsThresholdTemperatureOptimalValid,
  ] = useState<boolean>();
  const [thresholdTemperatureMax, setThresholdTemperatureMax] =
    useState<number>(userViewModel.getThresholdTemperatureMax());
  const [isThresholdTemperatureMaxValid, setIsThresholdTemperatureMaxValid] =
    useState<boolean>();
  const [thresholdTemperatureMin, setThresholdTemperatureMin] =
    useState<number>(userViewModel.getThresholdTemperatureMin());
  const [isThresholdTemperatureMinValid, setIsThresholdTemperatureMinValid] =
    useState<boolean>();
  const [thresholdMinTempInHive, setThresholdMinTempInHive] = useState<number>(
    userViewModel.getThresholdMinTempInHive()
  );
  const [isThresholdMinTempInHiveValid, setIsThresholdMinTempInHiveValid] =
    useState<boolean>();
  const [thresholdMaxTempInHive, setThresholdMaxTempInHive] = useState<number>(
    userViewModel.getThresholdMaxTempInHive()
  );
  const [isThresholdMaxTempInHiveValid, setIsThresholdMaxTempInHiveValid] =
    useState<boolean>();

  //Windspeed
  const [thresholdWindSpeedStrong, setThresholdWindSpeedStrong] =
    useState<number>(userViewModel.getThresholdWindSpeedStrong());
  const [isThresholdWindSpeedStrongValid, setIsThresholdWindSpeedStrongValid] =
    useState<boolean>();
  const [thresholdWindSpeedLow, setThresholdWindSpeedLow] = useState<number>(
    userViewModel.getThresholdWindSpeedLow()
  );
  const [isThresholdWindSpeedLowValid, setIsThresholdWindSpeedLowValid] =
    useState<boolean>();

  //Humidity
  const [thresholdHumidityMax, setThresholdHumidityMax] = useState<number>(
    userViewModel.getThresholdHumidityMax()
  );
  const [isThresholdHumidityMaxValid, setIsThresholdHumidityMaxValid] =
    useState<boolean>();
  const [thresholdHumidityMin, setThresholdHumidityMin] = useState<number>(
    userViewModel.getThresholdHumidityMin()
  );
  const [isThresholdHumidityMinValid, setIsThresholdHumidityMinValid] =
    useState<boolean>();

  //Spring
  const [earlySpringStartMonth, setEarlySpringStartMonth] = useState<Date>(
    userViewModel.getEarlySpringStartMonth()
  );
  const [isEarlySpringStartMonthValid, setIsEarlySpringStartMonthValid] =
    useState<boolean>();
  const [earlySpringEndMonth, setEarlySpringEndMonth] = useState<Date>(
    userViewModel.getEarlySpringEndMonth()
  );
  const [isEarlySpringEndMonthValid, setIsEarlySpringEndMonthValid] =
    useState<boolean>();
  const [earlySpringMonths, setEarlySpringMonths] = useState<Date[]>(
    userViewModel.getEarlySpringMonths()
  );
  const [isEarlySpringMonthsValid, setIsEarlySpringMonthsValid] =
    useState<boolean>();
  const [lateSpringStartMonth, setLateSpringStartMonth] = useState<Date>(
    userViewModel.getLateSpringStartMonth()
  );
  const [isLateSpringStartMonthValid, setIsLateSpringStartMonthValid] =
    useState<boolean>();
  const [springStartMonth, setSpringStartMonth] = useState<Date>(
    userViewModel.getSpringStartMonth()
  );
  const [isSpringStartMonthValid, setIsSpringStartMonthValid] =
    useState<boolean>();
  const [springEndMonth, setSpringEndMonth] = useState<Date>(
    userViewModel.getSpringEndMonth()
  );
  const [isSpringEndMonthValid, setIsSpringEndMonthValid] = useState<boolean>();

  //Autumn
  const [autumnStartMonth, setAutumnStartMonth] = useState<Date>(
    userViewModel.getAutumnStartMonth()
  );
  const [isAutumnStartMonthValid, setIsAutumnStartMonthValid] =
    useState<boolean>();
  const [autumnEndMonth, setAutumnEndMonth] = useState<Date>(
    userViewModel.getAutumnEndMonth()
  );
  const [isAutumnEndMonthValid, setIsAutumnEndMonthValid] = useState<boolean>();
  const [autumnMonths, setAutumnMonths] = useState<Date[]>(
    userViewModel.getAutumnMonths()
  );
  const [isAutumnMonthsValid, setIsAutumnMonthsValid] = useState<boolean>();
  const [earlyAutumnMonth, setEarlyAutumnMonth] = useState<Date>(
    userViewModel.getEarlyAutumnMonth()
  );
  const [isEarlyAutumnMonthValid, setIsEarlyAutumnMonthValid] =
    useState<boolean>();

  //Winter
  const [earlyWinterMonths, setEarlyWinterMonths] = useState<Date[]>(
    userViewModel.getEarlyWinterMonths()
  );
  const [isEarlyWinterMonthsValid, setIsEarlyWinterMonthsValid] =
    useState<boolean>();
  const [winterStart, setWinterStart] = useState<Date>(
    userViewModel.getWinterStart()
  );
  const [isWinterStartValid, setIsWinterStartValid] = useState<boolean>();
  const [winterEnd, setWinterEnd] = useState<Date>(userViewModel.winterEnd);
  const [isWinterEndValid, setIsWinterEndValid] = useState<boolean>();
  const [earlyWinterStart, setEarlyWinterStart] = useState<Date>(
    userViewModel.getEarlyWinterStart()
  );
  const [isEarlyWinterStartValid, setIsEarlyWinterStartValid] =
    useState<boolean>();
  const [earlyWinterEnd, setEarlyWinterEnd] = useState<Date>(
    userViewModel.getEarlyWinterEnd()
  );
  const [isEarlyWinterEndValid, setIsEarlyWinterEndValid] = useState<boolean>();

  //Summer
  const [summerStartMonth, setSummerStartMonth] = useState<Date>(
    userViewModel.getSummerStartMonth()
  );
  const [isSummerStartMonthValid, setIsSummerStartMonthValid] =
    useState<boolean>();
  const [summerEndMonth, setSummerEndMonth] = useState<Date>(
    userViewModel.getSummerEndMonth()
  );
  const [isSummerEndMonthValid, setIsSummerEndMonthValid] = useState<boolean>();
  const [earlySummerEndMonth, setEarlySummerEndMonth] = useState<Date>(
    userViewModel.getEarlySummerEndMonth()
  );
  const [isEarlySummerEndMonthValid, setIsEarlySummerEndMonthValid] =
    useState<boolean>();
  const [earlySummerStartMonth, setEarlySummerStartMonth] = useState<Date>(
    userViewModel.getEarlySummerStartMonth()
  );
  const [isEarlySummerStartMonthValid, setIsEarlySummerStartMonthValid] =
    useState<boolean>();

  const getSaveAction = (parameterName: NotificationType) => {
    const actions = {
      [NotificationType.Weather]: () => {
        if (
          isThresholdWindSpeedStrongValid &&
          isThresholdWindSpeedLowValid &&
          isEarlyWinterMonthsValid &&
          isWinterStartValid &&
          isWinterEndValid &&
          isEarlyWinterStartValid &&
          isWinterEndValid &&
          isEarlySpringMonthsValid &&
          isEarlySpringStartMonthValid &&
          isThresholdTemperatureMaxValid &&
          isThresholdTemperatureMinValid &&
          isThresholdTemperatureOptimalValid &&
          isAutumnMonthsValid &&
          isAutumnStartMonthValid &&
          isAutumnEndMonthValid
        ) {
          setIsErrorValidationMessage("");

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
        } else {
          setIsErrorValidationMessage(
            userViewModel.i18n.t("notification param error message")
          );
        }
      },
      [NotificationType.PossibleSwarm]: () => {
        if (
          isThresholdWeightDecreaseValid &&
          isThresholdExitCountHighValid &&
          isThresholdExitCountLowValid &&
          isProductionPeriodDaysValid &&
          isProductionPeriodThresholdValid &&
          isLateSpringStartMonthValid &&
          isEarlySummerEndMonthValid
        ) {
          setIsErrorValidationMessage("");

          userViewModel.setThresholdWeightDecrease(thresholdWeightDecrease);
          userViewModel.setThresholdExitCountHigh(thresholdExitCountHigh);
          userViewModel.setThresholdExitCountLow(thresholdExitCountLow);
          userViewModel.setProductionPeriodDays(productionPeriodDays);
          userViewModel.setProductionPeriodThreshold(productionPeriodThreshold);
          userViewModel.setLateSpringStartMonth(lateSpringStartMonth);
          userViewModel.setEarlySummerEndMonth(earlySummerEndMonth);
        } else {
          setIsErrorValidationMessage(
            userViewModel.i18n.t("notification param error message")
          );
        }
      },

      [NotificationType.ConsiderFeeding]: () => {
        if (
          isThresholdWeightDecreaseEarlySpringValid &&
          isThresholdWindSpeedStrongValid &&
          isEarlySpringStartMonthValid &&
          isEarlySpringEndMonthValid &&
          isEarlySpringMonthsValid &&
          isEarlyWinterMonthsValid &&
          isEarlyWinterStartValid &&
          isWinterStartValid &&
          isThresholdTemperatureMinValid &&
          isThresholdWeightDecreaseInAutumnValid &&
          isAutumnStartMonthValid &&
          isAutumnEndMonthValid &&
          isAutumnMonthsValid &&
          isProductionPeriodDaysValid &&
          isProductionPeriodThresholdValid &&
          isThresholdExitCountLowValid &&
          isSpringStartMonthValid &&
          isSpringEndMonthValid
        ) {
          setIsErrorValidationMessage("");

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
          userViewModel.setSpringEndMonth(springEndMonth);
        } else {
          setIsErrorValidationMessage(
            userViewModel.i18n.t("notification param error message")
          );
        }
      },
      [NotificationType.HoneyHarvest]: () => {
        if (
          isThresholdTemperatureMaxValid &&
          isThresholdWindSpeedLowValid &&
          isSummerStartMonthValid &&
          isEarlyAutumnMonthValid &&
          isEarlySpringStartMonthValid &&
          isAutumnEndMonthValid &&
          isProductionPeriodDaysValid &&
          isProductionPeriodThresholdValid &&
          isThresholdWeightIncreaseValid &&
          isThresholdTemperatureOptimalValid &&
          isSummerEndMonthValid
        ) {
          setIsErrorValidationMessage("");

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
        } else {
          setIsErrorValidationMessage(
            userViewModel.i18n.t("notification param error message")
          );
        }
      },
      [NotificationType.Maintenance]: () => {
        if (
          isEarlySpringStartMonthValid &&
          isAutumnEndMonthValid &&
          isThresholdWindSpeedLowValid &&
          isThresholdTemperatureMaxValid &&
          isSummerStartMonthValid &&
          isEarlyAutumnMonthValid &&
          isThresholdTemperatureOptimalValid &&
          isEarlySummerStartMonthValid &&
          isSpringStartMonthValid &&
          isSpringEndMonthValid
        ) {
          setIsErrorValidationMessage("");

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
          userViewModel.setSpringEndMonth(springEndMonth);
        } else {
          setIsErrorValidationMessage(
            userViewModel.i18n.t("notification param error message")
          );
        }
      },

      [NotificationType.ConsiderExpanding]: () => {
        if (
          isThresholdWeightIncreaseValid &&
          isThresholdTemperatureMaxValid &&
          isProductionPeriodDaysValid &&
          isProductionPeriodThresholdValid &&
          isEarlySummerStartMonthValid &&
          isSpringStartMonthValid &&
          isSpringEndMonthValid &&
          isSummerEndMonthValid &&
          isSummerStartMonthValid
        ) {
          setIsErrorValidationMessage("");

          userViewModel.setThresholdWeightIncrease(thresholdWeightIncrease);
          userViewModel.setThresholdTemperatureMax(thresholdTemperatureMax);
          userViewModel.setProductionPeriodDays(productionPeriodDays);
          userViewModel.setProductionPeriodThreshold(productionPeriodThreshold);
          userViewModel.setEarlySummerStartMonth(earlySummerStartMonth);
          userViewModel.setSpringStartMonth(springStartMonth);
          userViewModel.setSpringEndMonth(springEndMonth);
          userViewModel.setSummerEndMonth(summerEndMonth);
          userViewModel.setSummerStartMonth(summerStartMonth);
        } else {
          setIsErrorValidationMessage(
            userViewModel.i18n.t("notification param error message")
          );
        }
      },

      [NotificationType.CheckHive]: () => {
        if (
          isThresholdMinTempInHiveValid &&
          isThresholdMaxTempInHiveValid &&
          isLateSpringStartMonthValid &&
          isEarlySummerEndMonthValid &&
          isEarlySpringMonthsValid &&
          isThresholdTemperatureMaxValid &&
          isThresholdTemperatureMinValid &&
          isThresholdHumidityMaxValid &&
          isThresholdHumidityMinValid &&
          isThresholdExitCountHighValid &&
          isWinterEndValid &&
          isEarlyWinterMonthsValid &&
          isAutumnMonthsValid &&
          isEarlySpringMonthsValid &&
          isEarlyWinterEndValid
        ) {
          setIsErrorValidationMessage("");

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
        } else {
          setIsErrorValidationMessage(
            userViewModel.i18n.t("notification param error message")
          );
        }
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

    if (
      errorValidationMessage != "" &&
      errorValidationMessage !=
        userViewModel.i18n.t("notification param error message")
    ) {
      props.onClose();
    }
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
              error={!isThresholdWindSpeedStrongValid}
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
              error={!isThresholdTemperatureMaxValid}
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
              error={!isAutumnMonthsValid}
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
              error={!isEarlyWinterMonthsValid}
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
              error={!isEarlySpringMonthsValid}
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
              error={!isAutumnStartMonthValid}
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
              error={!isAutumnEndMonthValid}
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
              error={!isThresholdWindSpeedLowValid}
              onChangeText={(text) => setThresholdWindSpeedLow(Number(text))}
              keyboardType="numeric"
            />
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t(
                "set threshold for optimal temperature"
              )}
              value={thresholdTemperatureOptimal.toString()}
              error={!isThresholdTemperatureOptimalValid}
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
              error={!isEarlySpringStartMonthValid}
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
              error={!isAutumnEndMonthValid}
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
              error={!isThresholdTemperatureMinValid}
              onChangeText={(text) => setThresholdTemperatureMin(Number(text))}
              keyboardType="numeric"
            />
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t("winter start month")}
              value={winterStart.toLocaleDateString(userViewModel.i18n.locale)}
              error={!isWinterStartValid}
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
              error={!isThresholdTemperatureMinValid}
              onChangeText={(text) => setThresholdTemperatureMin(Number(text))}
              keyboardType="numeric"
            />
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t("winter end month")}
              value={winterEnd.toLocaleDateString(userViewModel.i18n.locale)}
              error={!isWinterEndValid}
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
              error={!isEarlyWinterStartValid}
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
              error={!isSpringStartMonthValid}
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
              error={!isSpringEndMonthValid}
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
              error={!isLateSpringStartMonthValid}
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
              error={!isEarlySummerStartMonthValid}
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
              error={!isThresholdWeightDecreaseValid}
              onChangeText={(text) => setThresholdWeightDecrease(Number(text))}
              keyboardType="numeric"
            />
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t(
                "set number of days for production period"
              )}
              value={productionPeriodDays.toString()}
              error={!isProductionPeriodDaysValid}
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
              error={!isThresholdExitCountHighValid}
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
              error={!isThresholdExitCountLowValid}
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
              error={!isProductionPeriodDaysValid}
              onChangeText={(text) => setProductionPeriodDays(Number(text))}
              keyboardType="numeric"
            />
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t(
                "set number for threshold value for production period"
              )}
              value={productionPeriodThreshold.toString()}
              error={!isProductionPeriodThresholdValid}
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
              error={!isLateSpringStartMonthValid}
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
              error={!isEarlySummerEndMonthValid}
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
              error={!isThresholdWindSpeedLowValid}
              onChangeText={(text) => setThresholdWindSpeedLow(Number(text))}
              keyboardType="numeric"
            />
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t(
                "set threshold for optimal temperature"
              )}
              value={thresholdTemperatureOptimal.toString()}
              error={!isThresholdTemperatureOptimalValid}
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
              error={!isEarlyAutumnMonthValid}
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
              error={!isSummerStartMonthValid}
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
              error={!isThresholdWindSpeedLowValid}
              onChangeText={(text) => setThresholdWindSpeedLow(Number(text))}
              keyboardType="numeric"
            />
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t(
                "set threshold for optimal temperature"
              )}
              value={thresholdTemperatureOptimal.toString()}
              error={!isThresholdTemperatureOptimalValid}
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
              error={!isEarlySpringStartMonthValid}
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
              error={!isAutumnEndMonthValid}
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
              error={!isThresholdWeightIncreaseValid}
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
              error={!isProductionPeriodDaysValid}
              onChangeText={(text) => setProductionPeriodDays(Number(text))}
              keyboardType="numeric"
            />
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t(
                "set number for threshold value for production period"
              )}
              value={productionPeriodThreshold.toString()}
              error={!isProductionPeriodThresholdValid}
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
              error={!isSummerStartMonthValid}
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
              error={!isSummerEndMonthValid}
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
              error={!isThresholdWindSpeedLowValid}
              onChangeText={(text) => setThresholdWindSpeedLow(Number(text))}
              keyboardType="numeric"
            />
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t(
                "set threshold for optimal temperature"
              )}
              value={thresholdTemperatureOptimal.toString()}
              error={!isThresholdTemperatureOptimalValid}
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
              error={!isEarlySpringStartMonthValid}
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
              error={!isAutumnEndMonthValid}
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
              error={!isThresholdWindSpeedLowValid}
              onChangeText={(text) => setThresholdWindSpeedLow(Number(text))}
              keyboardType="numeric"
            />
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t(
                "set threshold for optimal temperature"
              )}
              value={thresholdTemperatureOptimal.toString()}
              error={!isThresholdTemperatureOptimalValid}
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
              error={!isSummerStartMonthValid}
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
              error={!isEarlyAutumnMonthValid}
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
              error={!isEarlySummerStartMonthValid}
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
              error={!isSpringStartMonthValid}
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
              error={!isSpringEndMonthValid}
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
              error={!isThresholdWeightIncreaseValid}
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
              error={!isProductionPeriodDaysValid}
              onChangeText={(text) => setProductionPeriodDays(Number(text))}
              keyboardType="numeric"
            />
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t(
                "set number for threshold value for production period"
              )}
              value={productionPeriodThreshold.toString()}
              error={!isProductionPeriodThresholdValid}
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
              error={!isThresholdTemperatureMaxValid}
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
              error={!isEarlySummerStartMonthValid}
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
              error={!isSpringStartMonthValid}
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
              error={!isSpringEndMonthValid}
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
              error={!isSummerStartMonthValid}
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
              error={!isSummerEndMonthValid}
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
              error={!isThresholdMaxTempInHiveValid}
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
              error={!isThresholdMinTempInHiveValid}
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
              error={!isThresholdTemperatureMaxValid}
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
              error={!isThresholdTemperatureMinValid}
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
              error={!isThresholdHumidityMaxValid}
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
              error={!isThresholdHumidityMinValid}
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
              error={!isEarlyWinterEndValid}
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
              error={!isWinterEndValid}
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
              error={!isThresholdExitCountHighValid}
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
              error={!isThresholdWeightDecreaseEarlySpringValid}
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
              error={!isEarlySpringStartMonthValid}
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
              error={!isEarlySpringEndMonthValid}
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
              error={!isThresholdWeightDecreaseInAutumnValid}
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
              error={!isAutumnStartMonthValid}
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
              error={!isAutumnEndMonthValid}
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
              error={!isProductionPeriodDaysValid}
              onChangeText={(text) => setProductionPeriodDays(Number(text))}
              keyboardType="numeric"
            />
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t(
                "set number for threshold value for production period"
              )}
              value={productionPeriodThreshold.toString()}
              error={!isProductionPeriodThresholdValid}
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
              error={!isThresholdExitCountLowValid}
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

      {errorValidationMessage ? (
        <>
          <Text
            style={{
              ...theme.fonts.bodyLarge,
              flex: 1,
              textAlign: "center",
              color: theme.colors.error,
            }}
          >
            {errorValidationMessage}
          </Text>
          <VerticalSpacer size={4} />
        </>
      ) : null}

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
