import { Permissions } from "./user";
import { MeasurementsPreference } from "";
import {
  BeeCountMeasurement,
  PrecipitationMeasurement,
  TemperatureMeasurement,
  WeightMeasurement,
  WindSpeedMeasurement,
} from "@/constants/Measurements";
import { NotificationTypePreference } from "@/constants/Notifications";

export interface User {
  email: string | null;
  filters: string[];
  id: string;
  isAnonymous: boolean;
  mobileNr: string | null;
  notificationPreferences: NotificationPreference;
  notificationTypePreferences: NotificationTypePreference;
  measurementsPreferences: MeasurementsPreference;
  preferences: Preferences;
  permissions: Permissions;
  notificationParameters: NotificationParameters;
  isDetailedView: boolean;
  gdprConsent: boolean;
}

export interface NotificationPreference {
  email: boolean;
  mobile: boolean;
  sms: boolean;
}

export interface Preferences {
  currentCountry: string;
  theme: string | null;
  language: string | null;
}
export interface MeasurementsPreference {
  temperature: TemperatureMeasurement;
  weight: WeightMeasurement;
  precipitation: PrecipitationMeasurement;
  windSpeed: WindSpeedMeasurement;
  beeCount: BeeCountMeasurement;
}
export interface Permissions {
  isCameraEnabled: boolean;
  isLocationEnabled: boolean;
  isMediaEnabled: boolean;
}

export interface NotificationParameters {
  thresholdWeightDecreaseInAutumn: number;
  thresholdWeightDecreaseEarlySpring: number;
  thresholdWeightDecrease: number;
  thresholdWeightIncrease: number;

  productionPeriodDays: number;
  productionPeriodThreshold: number;

  thresholdExitCountHigh: number;
  thresholdExitCountLow: number;

  thresholdTemperatureMin: number;
  thresholdTemperatureMax: number;
  thresholdTemperatureOptimal: number;

  thresholdMinTempInHive: number;
  thresholdMaxTempInHive: number;

  thresholdWindSpeedStrong: number;
  thresholdWindSpeedLow: number;

  thresholdHumidityMin: number;
  thresholdHumidityMax: number;

  autumnMonths: Date[];
  earlyWinterMonths: Date[];
  earlySpringMonths: Date[];
  lateSpringStartMonth: Date;
  earlyAutumnMonth: Date;

  earlySpringStartMonth: Date;
  earlySpringEndMonth: Date;
  earlySummerStartMonth: Date;
  earlySummerEndMonth: Date;
  earlyWinterStart: Date;
  earlyWinterEnd: Date;

  springStartMonth: Date;
  springEndMonth: Date;

  summerStartMonth: Date;
  summerEndMonth: Date;

  autumnStartMonth: Date;
  autumnEndMonth: Date;

  winterStart: Date;
  winterEnd: Date;
}
