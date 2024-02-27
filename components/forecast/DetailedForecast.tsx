import {
  PrecipitationMeasurement,
  TemperatureMeasurement,
  WindSpeedMeasurement,
} from "@/constants/Measurements";
import { dateTimeToDateFormatter } from "@/domain/dateTimeFormatter";
import { roundToOneDecimalPlace } from "@/domain/numberFormatter";
import getWeatherTypeIconFromString from "@/domain/weatherIconMapper";
import getWindDirectionIconFromAngle from "@/domain/windDirectionMapper";
import {
  ForecastPeriod,
  WeeklyDetailedForecast,
  WeeklySimpleForecast,
} from "@/models/forecast";
import { View, Image, ScrollView } from "react-native";
import {
  Card,
  Divider,
  FAB,
  Icon,
  Text,
  Title,
  useTheme,
} from "react-native-paper";
import { HorizontalSpacer, VerticalSpacer } from "../Spacers";
import { useContext } from "react";
import { MobXProviderContext } from "mobx-react";
import styles from "@/assets/styles";
import React from "react";

interface DetailedForecastProps {
  forecast: WeeklyDetailedForecast;
  locale: string;
  temperatureFormat: TemperatureMeasurement;
  precipitationFormat: PrecipitationMeasurement;
  windFormat: WindSpeedMeasurement;
}

interface DailyDetailedForecastProps {
  hourlyForecasts: { [key: string]: ForecastPeriod };
  locale: string;
  temperatureFormat: TemperatureMeasurement;
  precipitationFormat: PrecipitationMeasurement;
  windFormat: WindSpeedMeasurement;
}

const DetailedForecastSummary = (props: DetailedForecastProps) => {
  const days = [
    "dayOneForecast",
    "dayTwoForecast",
    "dayThreeForecast",
    "dayFourForecast",
    "dayFiveForecast",
    "daySixForecast",
    "daySevenForecast",
  ];

  return (
    <>
      {days.map((day, index) => (
        <React.Fragment key={`${day}-fragment`}>
          {index !== 0 && <VerticalSpacer size={8} key={`spacer-${day}`} />}
          <DailyDetailedForecastSummary
            key={`summary-${day}`}
            hourlyForecasts={props.forecast[day].hourlyForecasts}
            locale={props.locale}
            temperatureFormat={props.temperatureFormat}
            precipitationFormat={props.precipitationFormat}
            windFormat={props.windFormat}
          />
        </React.Fragment>
      ))}
    </>
  );
};

const DailyDetailedForecastSummary = (props: DailyDetailedForecastProps) => {
  const hours = [
    "00HundredHours",
    "01HundredHours",
    "02HundredHours",
    "03HundredHours",
    "04HundredHours",
    "05HundredHours",
    "06HundredHours",
    "07HundredHours",
    "08HundredHours",
    "09HundredHours",
    "10HundredHours",
    "11HundredHours",
    "12HundredHours",
    "13HundredHours",
    "14HundredHours",
    "15HundredHours",
    "16HundredHours",
    "17HundredHours",
    "18HundredHours",
    "19HundredHours",
    "20HundredHours",
    "21HundredHours",
    "22HundredHours",
    "23HundredHours",
  ];

  return (
    <Card>
      <Card.Content>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={{
            justifyContent: "space-between",
            flex: 1,
            paddingVertical: 12,
          }}
        >
          <HorizontalSpacer size={12} />
          {hours.map((hour, index) =>
            props.hourlyForecasts[hour] ? (
              <Text key={`summary-${hour}`}>
                {props.hourlyForecasts[hour].dateTime}
              </Text>
            ) : null
          )}
          <HorizontalSpacer size={12} />
        </ScrollView>
      </Card.Content>
    </Card>
  );
};

export default DetailedForecastSummary;
