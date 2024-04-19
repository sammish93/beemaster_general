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
import { isValidString } from "@/domain/validation/stringValidation";
import { isValidNumber } from "@/domain/validation/numberValidation";
import {
  convertBeeCountFromDbFormat,
  convertBeeCountToDbFormat,
  convertTempFromDbFormat,
  convertTempToDbFormat,
  convertWeightFromDbFormat,
  convertWeightToDbFormat,
  convertWindSpeedFromDbFormat,
  convertWindSpeedToDbFormat,
} from "@/domain/measurementConverter";

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
    useState<string>(
      convertWeightFromDbFormat(
        userViewModel.getThresholdWeightDecreaseInAutumn(),
        userViewModel.weightPreference
      ).toString()
    );
  const [
    isThresholdWeightDecreaseInAutumnValid,
    setIsThresholdWeightDecreaseInAutumnValid,
  ] = useState<boolean>(true);
  const [
    thresholdWeightDecreaseEarlySpring,
    setThresholdWeightDecreaseEarlySpring,
  ] = useState<string>(
    convertWeightFromDbFormat(
      userViewModel.getThresholdWeightDecreaseEarlySpring(),
      userViewModel.weightPreference
    ).toString()
  );
  const [
    isThresholdWeightDecreaseEarlySpringValid,
    setIsThresholdWeightDecreaseEarlySpringValid,
  ] = useState<boolean>(true);
  const [thresholdWeightDecrease, setThresholdWeightDecrease] =
    useState<string>(
      convertWeightFromDbFormat(
        userViewModel.getThresholdWeightDecrease(),
        userViewModel.weightPreference
      ).toString()
    );
  const [isThresholdWeightDecreaseValid, setIsThresholdWeightDecreaseValid] =
    useState<boolean>(true);
  const [thresholdWeightIncrease, setThresholdWeightIncrease] =
    useState<string>(
      convertWeightFromDbFormat(
        userViewModel.getThresholdWeightIncrease(),
        userViewModel.weightPreference
      ).toString()
    );
  const [isThresholdWeightIncreaseValid, setIsThresholdWeightIncreaseValid] =
    useState<boolean>(true);
  const [productionPeriodDays, setProductionPeriodDays] = useState<string>(
    userViewModel.getProductionPeriodDays()
  );
  const [isProductionPeriodDaysValid, setIsProductionPeriodDaysValid] =
    useState<boolean>(true);
  const [productionPeriodThreshold, setProductionPeriodThreshold] =
    useState<string>(userViewModel.getProductionPeriodThreshold());
  const [
    isProductionPeriodThresholdValid,
    setIsProductionPeriodThresholdValid,
  ] = useState<boolean>(true);

  //Exit
  const [thresholdExitCountHigh, setThresholdExitCountHigh] = useState<string>(
    convertBeeCountFromDbFormat(
      userViewModel.getThresholdExitCountHigh(),
      userViewModel.beeCountPreference
    ).toString()
  );
  const [isThresholdExitCountHighValid, setIsThresholdExitCountHighValid] =
    useState<boolean>(true);
  const [thresholdExitCountLow, setThresholdExitCountLow] = useState<string>(
    convertBeeCountFromDbFormat(
      userViewModel.getThresholdExitCountLow(),
      userViewModel.beeCountPreference
    ).toString()
  );
  const [isThresholdExitCountLowValid, setIsThresholdExitCountLowValid] =
    useState<boolean>(true);

  //Temp
  const [thresholdTemperatureOptimal, setThresholdTemperatureOptimal] =
    useState<string>(
      convertTempFromDbFormat(
        userViewModel.getThresholdTemperatureOptimal(),
        userViewModel.temperaturePreference
      ).toString()
    );
  const [
    isThresholdTemperatureOptimalValid,
    setIsThresholdTemperatureOptimalValid,
  ] = useState<boolean>(true);
  const [thresholdTemperatureMax, setThresholdTemperatureMax] =
    useState<string>(
      convertTempFromDbFormat(
        userViewModel.getThresholdTemperatureMax(),
        userViewModel.temperaturePreference
      ).toString()
    );
  const [isThresholdTemperatureMaxValid, setIsThresholdTemperatureMaxValid] =
    useState<boolean>(true);
  const [thresholdTemperatureMin, setThresholdTemperatureMin] =
    useState<string>(
      convertTempFromDbFormat(
        userViewModel.getThresholdTemperatureMin(),
        userViewModel.temperaturePreference
      ).toString()
    );
  const [isThresholdTemperatureMinValid, setIsThresholdTemperatureMinValid] =
    useState<boolean>(true);
  const [thresholdMinTempInHive, setThresholdMinTempInHive] = useState<string>(
    convertTempFromDbFormat(
      userViewModel.getThresholdMinTempInHive(),
      userViewModel.temperaturePreference
    ).toString()
  );
  const [isThresholdMinTempInHiveValid, setIsThresholdMinTempInHiveValid] =
    useState<boolean>(true);
  const [thresholdMaxTempInHive, setThresholdMaxTempInHive] = useState<string>(
    convertTempFromDbFormat(
      userViewModel.getThresholdMaxTempInHive(),
      userViewModel.temperaturePreference
    ).toString()
  );
  const [isThresholdMaxTempInHiveValid, setIsThresholdMaxTempInHiveValid] =
    useState<boolean>(true);

  //Windspeed
  const [thresholdWindSpeedStrong, setThresholdWindSpeedStrong] =
    useState<string>(
      convertWindSpeedFromDbFormat(
        userViewModel.getThresholdWindSpeedStrong(),
        userViewModel.windSpeedPreference
      ).toString()
    );
  const [isThresholdWindSpeedStrongValid, setIsThresholdWindSpeedStrongValid] =
    useState<boolean>(true);
  const [thresholdWindSpeedLow, setThresholdWindSpeedLow] = useState<string>(
    convertWindSpeedFromDbFormat(
      userViewModel.getThresholdWindSpeedLow(),
      userViewModel.windSpeedPreference
    ).toString()
  );
  const [isThresholdWindSpeedLowValid, setIsThresholdWindSpeedLowValid] =
    useState<boolean>(true);

  //Humidity
  const [thresholdHumidityMax, setThresholdHumidityMax] = useState<string>(
    userViewModel.getThresholdHumidityMax()
  );
  const [isThresholdHumidityMaxValid, setIsThresholdHumidityMaxValid] =
    useState<boolean>(true);
  const [thresholdHumidityMin, setThresholdHumidityMin] = useState<string>(
    userViewModel.getThresholdHumidityMin()
  );
  const [isThresholdHumidityMinValid, setIsThresholdHumidityMinValid] =
    useState<boolean>(true);

  //Spring
  const [earlySpringStartMonth, setEarlySpringStartMonth] = useState<Date>(
    userViewModel.getEarlySpringStartMonth()
  );
  const [isEarlySpringStartMonthValid, setIsEarlySpringStartMonthValid] =
    useState<boolean>(true);
  const [earlySpringEndMonth, setEarlySpringEndMonth] = useState<Date>(
    userViewModel.getEarlySpringEndMonth()
  );
  const [isEarlySpringEndMonthValid, setIsEarlySpringEndMonthValid] =
    useState<boolean>(true);
  const [earlySpringMonths, setEarlySpringMonths] = useState<Date[]>(
    userViewModel.getEarlySpringMonths()
  );
  const [isEarlySpringMonthsValid, setIsEarlySpringMonthsValid] =
    useState<boolean>(true);
  const [lateSpringStartMonth, setLateSpringStartMonth] = useState<Date>(
    userViewModel.getLateSpringStartMonth()
  );
  const [isLateSpringStartMonthValid, setIsLateSpringStartMonthValid] =
    useState<boolean>(true);
  const [springStartMonth, setSpringStartMonth] = useState<Date>(
    userViewModel.getSpringStartMonth()
  );
  const [isSpringStartMonthValid, setIsSpringStartMonthValid] =
    useState<boolean>(true);
  const [springEndMonth, setSpringEndMonth] = useState<Date>(
    userViewModel.getSpringEndMonth()
  );
  const [isSpringEndMonthValid, setIsSpringEndMonthValid] =
    useState<boolean>(true);

  //Autumn
  const [autumnStartMonth, setAutumnStartMonth] = useState<Date>(
    userViewModel.getAutumnStartMonth()
  );
  const [isAutumnStartMonthValid, setIsAutumnStartMonthValid] =
    useState<boolean>(true);
  const [autumnEndMonth, setAutumnEndMonth] = useState<Date>(
    userViewModel.getAutumnEndMonth()
  );
  const [isAutumnEndMonthValid, setIsAutumnEndMonthValid] =
    useState<boolean>(true);
  const [autumnMonths, setAutumnMonths] = useState<Date[]>(
    userViewModel.getAutumnMonths()
  );
  const [isAutumnMonthsValid, setIsAutumnMonthsValid] = useState<boolean>(true);
  const [earlyAutumnMonth, setEarlyAutumnMonth] = useState<Date>(
    userViewModel.getEarlyAutumnMonth()
  );
  const [isEarlyAutumnMonthValid, setIsEarlyAutumnMonthValid] =
    useState<boolean>(true);

  //Winter
  const [earlyWinterMonths, setEarlyWinterMonths] = useState<Date[]>(
    userViewModel.getEarlyWinterMonths()
  );
  const [isEarlyWinterMonthsValid, setIsEarlyWinterMonthsValid] =
    useState<boolean>(true);
  const [winterStart, setWinterStart] = useState<Date>(
    userViewModel.getWinterStart()
  );
  const [isWinterStartValid, setIsWinterStartValid] = useState<boolean>(true);
  const [winterEnd, setWinterEnd] = useState<Date>(userViewModel.winterEnd);
  const [isWinterEndValid, setIsWinterEndValid] = useState<boolean>(true);
  const [earlyWinterStart, setEarlyWinterStart] = useState<Date>(
    userViewModel.getEarlyWinterStart()
  );
  const [isEarlyWinterStartValid, setIsEarlyWinterStartValid] =
    useState<boolean>(true);
  const [earlyWinterEnd, setEarlyWinterEnd] = useState<Date>(
    userViewModel.getEarlyWinterEnd()
  );
  const [isEarlyWinterEndValid, setIsEarlyWinterEndValid] =
    useState<boolean>(true);

  //Summer
  const [summerStartMonth, setSummerStartMonth] = useState<Date>(
    userViewModel.getSummerStartMonth()
  );
  const [isSummerStartMonthValid, setIsSummerStartMonthValid] =
    useState<boolean>(true);
  const [summerEndMonth, setSummerEndMonth] = useState<Date>(
    userViewModel.getSummerEndMonth()
  );
  const [isSummerEndMonthValid, setIsSummerEndMonthValid] =
    useState<boolean>(true);
  const [earlySummerEndMonth, setEarlySummerEndMonth] = useState<Date>(
    userViewModel.getEarlySummerEndMonth()
  );
  const [isEarlySummerEndMonthValid, setIsEarlySummerEndMonthValid] =
    useState<boolean>(true);
  const [earlySummerStartMonth, setEarlySummerStartMonth] = useState<Date>(
    userViewModel.getEarlySummerStartMonth()
  );
  const [isEarlySummerStartMonthValid, setIsEarlySummerStartMonthValid] =
    useState<boolean>(true);

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

          userViewModel.setThresholdWindSpeedStrong(
            convertWindSpeedToDbFormat(
              Number(thresholdWindSpeedStrong),
              userViewModel.windSpeedPreference
            )
          );
          userViewModel.setThresholdWindSpeedLow(
            convertWindSpeedToDbFormat(
              Number(thresholdWindSpeedLow),
              userViewModel.windSpeedPreference
            )
          );

          userViewModel.setEarlyWinterMonths(earlyWinterMonths);
          userViewModel.setWinterStart(winterStart);
          userViewModel.setWinterEnd(winterEnd);
          userViewModel.setEarlyWinterStart(earlyWinterStart);
          userViewModel.setEarlyWinterEnd(earlyWinterEnd);

          userViewModel.setEarlySpringMonths(earlySpringMonths);
          userViewModel.setEarlySpringStartMonth(earlySpringStartMonth);

          userViewModel.setThresholdTemperatureMax(
            convertTempToDbFormat(
              Number(thresholdTemperatureMax),
              userViewModel.temperaturePreference
            )
          );
          userViewModel.setThresholdTemperatureMin(
            convertTempToDbFormat(
              Number(thresholdTemperatureMin),
              userViewModel.temperaturePreference
            )
          );
          userViewModel.setThresholdTemperatureOptimal(
            convertTempToDbFormat(
              Number(thresholdTemperatureOptimal),
              userViewModel.temperaturePreference
            )
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

          userViewModel.setThresholdWeightDecrease(
            convertWeightToDbFormat(
              Number(thresholdWeightDecrease),
              userViewModel.weightPreference
            )
          );
          userViewModel.setThresholdExitCountHigh(
            convertBeeCountToDbFormat(
              Number(thresholdExitCountHigh),
              userViewModel.beeCountPreference
            )
          );
          userViewModel.setThresholdExitCountLow(
            convertBeeCountToDbFormat(
              Number(thresholdExitCountLow),
              userViewModel.beeCountPreference
            )
          );
          userViewModel.setProductionPeriodDays(Number(productionPeriodDays));
          userViewModel.setProductionPeriodThreshold(
            Number(productionPeriodThreshold)
          );
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
          userViewModel.setThresholdWindSpeedStrong(
            convertWindSpeedToDbFormat(
              Number(thresholdWindSpeedStrong),
              userViewModel.windSpeedPreference
            )
          );
          userViewModel.setEarlySpringStartMonth(earlySpringStartMonth);
          userViewModel.setEarlySpringEndMonth(earlySpringEndMonth);
          userViewModel.setEarlySpringMonths(earlySpringMonths);
          userViewModel.setEarlyWinterMonths(earlyWinterMonths);
          userViewModel.setEarlyWinterStart(earlyWinterStart);
          userViewModel.setWinterStart(winterStart);
          userViewModel.thresholdTemperatureMin(
            convertTempToDbFormat(
              Number(thresholdTemperatureMin),
              userViewModel.temperaturePreference
            )
          );
          userViewModel.setThresholdWeightDecreaseInAutumn(
            convertWeightToDbFormat(
              Number(thresholdWeightDecreaseInAutumn),
              userViewModel.weightPreference
            )
          );
          userViewModel.setAutumnStartMonth(autumnStartMonth);
          userViewModel.setAutumnEndMonth(autumnEndMonth);
          userViewModel.setAutumnMonths(autumnMonths);
          userViewModel.setProductionPeriodDays(Number(productionPeriodDays));
          userViewModel.setProductionPeriodThreshold(
            Number(productionPeriodThreshold)
          );
          userViewModel.setThresholdExitCountLow(
            convertBeeCountToDbFormat(
              Number(thresholdExitCountLow),
              userViewModel.beeCountPreference
            )
          );
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

          userViewModel.setThresholdTemperatureMax(
            convertTempToDbFormat(
              Number(thresholdTemperatureMax),
              userViewModel.temperaturePreference
            )
          );
          userViewModel.setThresholdWindSpeedLow(
            convertWindSpeedToDbFormat(
              Number(thresholdWindSpeedLow),
              userViewModel.windSpeedPreference
            )
          );
          userViewModel.setSummerStartMonth(summerStartMonth);
          userViewModel.setEarlyAutumnMonth(earlyAutumnMonth);
          userViewModel.setEarlySpringStartMonth(earlySpringStartMonth);
          userViewModel.setAutumnEndMonth(autumnEndMonth);
          userViewModel.setProductionPeriodDays(Number(productionPeriodDays));
          userViewModel.setProductionPeriodThreshold(
            Number(productionPeriodThreshold)
          );
          userViewModel.setThresholdWeightIncrease(
            convertWeightToDbFormat(
              Number(thresholdWeightIncrease),
              userViewModel.weightPreference
            )
          );
          userViewModel.setThresholdTemperatureOptimal(
            convertTempToDbFormat(
              Number(thresholdTemperatureOptimal),
              userViewModel.temperaturePreference
            )
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
          userViewModel.setThresholdWindSpeedLow(
            convertWindSpeedToDbFormat(
              Number(thresholdWindSpeedLow),
              userViewModel.windSpeedPreference
            )
          );
          userViewModel.setThresholdTemperatureMax(
            convertTempToDbFormat(
              Number(thresholdTemperatureMax),
              userViewModel.temperaturePreference
            )
          );
          userViewModel.setSummerStartMonth(summerStartMonth);
          userViewModel.setEarlyAutumnMonth(earlyAutumnMonth);
          userViewModel.setThresholdTemperatureOptimal(
            convertTempToDbFormat(
              Number(thresholdTemperatureOptimal),
              userViewModel.temperaturePreference
            )
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

          userViewModel.setThresholdWeightIncrease(
            convertWeightToDbFormat(
              Number(thresholdWeightIncrease),
              userViewModel.weightPreference
            )
          );
          userViewModel.setThresholdTemperatureMax(
            convertTempToDbFormat(
              Number(thresholdTemperatureMax),
              userViewModel.temperaturePreference
            )
          );
          userViewModel.setProductionPeriodDays(Number(productionPeriodDays));
          userViewModel.setProductionPeriodThreshold(
            Number(productionPeriodThreshold)
          );
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

          userViewModel.setThresholdMinTempInHive(
            convertTempToDbFormat(
              Number(thresholdMinTempInHive),
              userViewModel.temperaturePreference
            )
          );
          userViewModel.setThresholdMaxTempInHive(
            convertTempToDbFormat(
              Number(thresholdMaxTempInHive),
              userViewModel.temperaturePreference
            )
          );

          userViewModel.setLateSpringStartMonth(lateSpringStartMonth);
          userViewModel.setEarlySummerEndMonth(earlySummerEndMonth);
          userViewModel.earlySpringMonths(earlySpringMonths);
          userViewModel.setThresholdTemperatureMax(thresholdTemperatureMax);
          userViewModel.setThresholdTemperatureMin(thresholdTemperatureMin);

          userViewModel.setThresholdHumidityMax(Number(thresholdHumidityMax));
          userViewModel.setThresholdHumidityMin(Number(thresholdHumidityMin));
          userViewModel.setThresholdExitCountHigh(
            convertBeeCountToDbFormat(
              Number(thresholdExitCountHigh),
              userViewModel.beeCountPreference
            )
          );
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

  const handleModifyTextInput = (
    input: string,
    setTextInput: React.Dispatch<React.SetStateAction<string>>,
    setIsValidFunc: React.Dispatch<React.SetStateAction<boolean>>,
    minVal: number = 1,
    maxVal: number = 999,
    minChars: number = 1,
    maxChars: number = 5
  ) => {
    if (Number.isNaN(Number(input))) {
      if (input[0] === "-") {
        setTextInput(input);
      } else if (input[input.length - 1] === ".") {
        setTextInput(input);
      }
    } else {
      setTextInput(input);
    }

    if (isValidNumber(input, minChars, maxChars, minVal, maxVal)) {
      setIsValidFunc(true);
    } else {
      setIsValidFunc(false);
    }
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
              onChangeText={(text) =>
                handleModifyTextInput(
                  text,
                  setThresholdWindSpeedStrong,
                  setIsThresholdWindSpeedStrongValid
                )
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
              onChangeText={(text) =>
                handleModifyTextInput(
                  text,
                  setThresholdTemperatureMax,
                  setIsThresholdTemperatureMaxValid,
                  -99
                )
              }
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
              onChangeText={(text) =>
                handleModifyTextInput(
                  text,
                  setThresholdWindSpeedLow,
                  setIsThresholdWindSpeedLowValid
                )
              }
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
                handleModifyTextInput(
                  text,
                  setThresholdTemperatureOptimal,
                  setIsThresholdTemperatureOptimalValid,
                  -99
                )
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
              onChangeText={(text) =>
                handleModifyTextInput(
                  text,
                  setThresholdTemperatureMin,
                  setIsThresholdTemperatureMinValid,
                  -99
                )
              }
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
              onChangeText={(text) =>
                handleModifyTextInput(
                  text,
                  setThresholdTemperatureMin,
                  setIsThresholdTemperatureMinValid,
                  -99
                )
              }
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
              onChangeText={(text) =>
                handleModifyTextInput(
                  text,
                  setThresholdWeightDecrease,
                  setIsThresholdWeightDecreaseValid
                )
              }
              keyboardType="numeric"
            />
            <VerticalSpacer size={4} />
            <TextInput
              label={userViewModel.i18n.t(
                "set number of days for production period"
              )}
              value={productionPeriodDays.toString()}
              error={!isProductionPeriodDaysValid}
              onChangeText={(text) =>
                handleModifyTextInput(
                  text,
                  setProductionPeriodDays,
                  setIsProductionPeriodDaysValid
                )
              }
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
              onChangeText={(text) =>
                handleModifyTextInput(
                  text,
                  setThresholdExitCountHigh,
                  setIsThresholdExitCountHighValid
                )
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
              onChangeText={(text) =>
                handleModifyTextInput(
                  text,
                  setThresholdExitCountLow,
                  setIsThresholdExitCountLowValid
                )
              }
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
              onChangeText={(text) =>
                handleModifyTextInput(
                  text,
                  setProductionPeriodDays,
                  setIsProductionPeriodDaysValid
                )
              }
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
                handleModifyTextInput(
                  text,
                  setProductionPeriodThreshold,
                  setIsProductionPeriodThresholdValid
                )
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
              onChangeText={(text) =>
                handleModifyTextInput(
                  text,
                  setThresholdWindSpeedLow,
                  setIsThresholdWindSpeedLowValid
                )
              }
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
                handleModifyTextInput(
                  text,
                  setThresholdTemperatureOptimal,
                  setIsThresholdTemperatureOptimalValid,
                  -99
                )
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
              onChangeText={(text) =>
                handleModifyTextInput(
                  text,
                  setThresholdWindSpeedLow,
                  setIsThresholdWindSpeedLowValid
                )
              }
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
                handleModifyTextInput(
                  text,
                  setThresholdTemperatureOptimal,
                  setIsThresholdTemperatureOptimalValid,
                  -99
                )
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
              onChangeText={(text) =>
                handleModifyTextInput(
                  text,
                  setThresholdWeightIncrease,
                  setIsThresholdWeightIncreaseValid
                )
              }
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
              onChangeText={(text) =>
                handleModifyTextInput(
                  text,
                  setProductionPeriodDays,
                  setIsProductionPeriodDaysValid
                )
              }
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
                handleModifyTextInput(
                  text,
                  setProductionPeriodThreshold,
                  setIsProductionPeriodThresholdValid
                )
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
              onChangeText={(text) =>
                handleModifyTextInput(
                  text,
                  setThresholdWindSpeedLow,
                  setIsThresholdWindSpeedLowValid
                )
              }
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
                handleModifyTextInput(
                  text,
                  setThresholdTemperatureOptimal,
                  setIsThresholdTemperatureOptimalValid,
                  -99
                )
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
              onChangeText={(text) =>
                handleModifyTextInput(
                  text,
                  setThresholdWindSpeedLow,
                  setIsThresholdWindSpeedLowValid
                )
              }
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
                handleModifyTextInput(
                  text,
                  setThresholdTemperatureOptimal,
                  setIsThresholdTemperatureOptimalValid,
                  -99
                )
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
              onChangeText={(text) =>
                handleModifyTextInput(
                  text,
                  setThresholdWeightIncrease,
                  setIsThresholdWeightIncreaseValid
                )
              }
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
              onChangeText={(text) =>
                handleModifyTextInput(
                  text,
                  setProductionPeriodDays,
                  setIsProductionPeriodDaysValid
                )
              }
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
                handleModifyTextInput(
                  text,
                  setProductionPeriodThreshold,
                  setIsProductionPeriodThresholdValid
                )
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
              onChangeText={(text) =>
                handleModifyTextInput(
                  text,
                  setThresholdTemperatureMax,
                  setIsThresholdTemperatureMaxValid,
                  -99
                )
              }
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
              onChangeText={(text) =>
                handleModifyTextInput(
                  text,
                  setThresholdMaxTempInHive,
                  setIsThresholdMaxTempInHiveValid,
                  -99
                )
              }
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
              onChangeText={(text) =>
                handleModifyTextInput(
                  text,
                  setThresholdMinTempInHive,
                  setIsThresholdMinTempInHiveValid,
                  -99
                )
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
              onChangeText={(text) =>
                handleModifyTextInput(
                  text,
                  setThresholdTemperatureMax,
                  setIsThresholdTemperatureMaxValid,
                  -99
                )
              }
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
              onChangeText={(text) =>
                handleModifyTextInput(
                  text,
                  setThresholdTemperatureMin,
                  setIsThresholdTemperatureMinValid,
                  -99
                )
              }
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
              onChangeText={(text) =>
                handleModifyTextInput(
                  text,
                  setThresholdHumidityMax,
                  setIsThresholdHumidityMaxValid
                )
              }
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
              onChangeText={(text) =>
                handleModifyTextInput(
                  text,
                  setThresholdHumidityMin,
                  setIsThresholdHumidityMinValid
                )
              }
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
              onChangeText={(text) =>
                handleModifyTextInput(
                  text,
                  setThresholdExitCountHigh,
                  setIsThresholdExitCountHighValid
                )
              }
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
                handleModifyTextInput(
                  text,
                  setThresholdWeightDecreaseEarlySpring,
                  setIsThresholdWeightDecreaseEarlySpringValid
                )
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
                handleModifyTextInput(
                  text,
                  setThresholdWeightDecreaseInAutumn,
                  setIsThresholdWeightDecreaseInAutumnValid
                )
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
              onChangeText={(text) =>
                handleModifyTextInput(
                  text,
                  setProductionPeriodDays,
                  setIsProductionPeriodDaysValid
                )
              }
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
                handleModifyTextInput(
                  text,
                  setProductionPeriodThreshold,
                  setIsProductionPeriodThresholdValid
                )
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
              onChangeText={(text) =>
                handleModifyTextInput(
                  text,
                  setThresholdExitCountLow,
                  setIsThresholdExitCountLowValid
                )
              }
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
