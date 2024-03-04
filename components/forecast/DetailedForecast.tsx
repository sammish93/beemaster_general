import {
  PrecipitationMeasurement,
  TemperatureMeasurement,
  WindSpeedMeasurement,
} from "@/constants/Measurements";
import {
  dateTimeToDateFormatter,
  dateTimeToTimeFormatter,
} from "@/domain/dateTimeFormatter";
import { roundToOneDecimalPlace } from "@/domain/numberFormatter";
import getWeatherTypeIconFromString from "@/domain/weatherIconMapper";
import getWindDirectionIconFromAngle from "@/domain/windDirectionMapper";
import {
  DailyForecast,
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
import {
  calculateDailyHighTemperature,
  calculateDailyLowTemperature,
} from "@/domain/weatherForecastDeserialiser";

interface DetailedForecastProps {
  forecast: WeeklyDetailedForecast;
  locale: string;
  temperatureFormat: TemperatureMeasurement;
  precipitationFormat: PrecipitationMeasurement;
  windFormat: WindSpeedMeasurement;
}

interface DailyDetailedForecastProps {
  dailyForecast: DailyForecast;
  locale: string;
  temperatureFormat: TemperatureMeasurement;
  precipitationFormat: PrecipitationMeasurement;
  windFormat: WindSpeedMeasurement;
}

interface HourlyForecastCardProps {
  forecast: ForecastPeriod;
  locale: string;
  temperatureFormat: TemperatureMeasurement;
  precipitationFormat: PrecipitationMeasurement;
  windFormat: WindSpeedMeasurement;
}

interface DailyDetailedForecastHeaderProps {
  title: string;
  dailyHigh: number;
  dailyLow: number;
  temperatureFormat: TemperatureMeasurement;
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
            dailyForecast={props.forecast[day]}
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
  const theme = useTheme();

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

  const dateTime = props.dailyForecast.hourlyForecasts["18HundredHours"]
    ? props.dailyForecast.hourlyForecasts["18HundredHours"].dateTime
    : props.dailyForecast.hourlyForecasts["23HundredHours"].dateTime;

  const formattedDate = dateTimeToDateFormatter(dateTime, props.locale, "full");

  const dailyHighTemp = calculateDailyHighTemperature(props.dailyForecast);
  const dailyLowTemp = calculateDailyLowTemperature(props.dailyForecast);

  return (
    <Card>
      <Card.Content style={{ flexDirection: "row" }}>
        <DailyDetailedForecastHeader
          title={formattedDate}
          dailyHigh={dailyHighTemp}
          dailyLow={dailyLowTemp}
          temperatureFormat={props.temperatureFormat}
        />
      </Card.Content>
      <Card.Content>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={{
            justifyContent: "space-between",
            paddingVertical: 12,
            gap: 8,
            flexGrow: 1,
          }}
        >
          {hours.map((hour, index) =>
            props.dailyForecast.hourlyForecasts[hour] ? (
              <HourlyForecastCard
                key={`card-${hour}`}
                forecast={props.dailyForecast.hourlyForecasts[hour]}
                locale={props.locale}
                temperatureFormat={props.temperatureFormat}
                precipitationFormat={props.precipitationFormat}
                windFormat={props.windFormat}
              />
            ) : null
          )}
        </ScrollView>
      </Card.Content>
    </Card>
  );
};

const HourlyForecastCard = (props: HourlyForecastCardProps) => {
  const theme = useTheme();
  const { userViewModel } = useContext(MobXProviderContext);

  const time = dateTimeToTimeFormatter(
    props.forecast.dateTime,
    props.locale,
    "short"
  );
  const wind = roundToOneDecimalPlace(props.forecast.windSpeed);
  const windDirection = getWindDirectionIconFromAngle(
    props.forecast.windFromDirection
  );
  const temperature = roundToOneDecimalPlace(props.forecast.temperature);
  const precipitation = roundToOneDecimalPlace(props.forecast.precipitation);

  let weather;
  try {
    weather = getWeatherTypeIconFromString(props.forecast.weatherType);
  } catch (error) {
    weather = null;
  }

  return (
    <Card
      style={{
        padding: 4,
        flex: 1,
        minWidth: 120,
        maxWidth: "100%",
        justifyContent: "center",
      }}
      mode="contained"
    >
      <View style={{ flex: 1, alignItems: "center" }}>
        {weather ? (
          <View style={styles(theme).cardRow}>
            <Image source={weather} style={{ width: 24, height: 24 }} />
            <Text
              style={theme.fonts.bodyMedium}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {userViewModel.i18n.t(props.forecast.weatherType)}
            </Text>
          </View>
        ) : null}
        <View style={styles(theme).cardRow}>
          <Icon
            source="thermometer"
            size={18}
            color={theme.colors.onSurfaceVariant}
          />
          <Text
            style={theme.fonts.bodyMedium}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {temperature} {props.temperatureFormat}
          </Text>
        </View>
        <View style={styles(theme).cardRow}>
          <Icon
            source="water-outline"
            size={18}
            color={theme.colors.onSurfaceVariant}
          />
          <Text
            style={theme.fonts.bodyMedium}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {precipitation} {props.precipitationFormat}{" "}
            {props.forecast.humidity}%
          </Text>
        </View>
        <View style={styles(theme).cardRow}>
          <Icon
            source="weather-windy"
            size={18}
            color={theme.colors.onSurfaceVariant}
          />
          <Text
            style={theme.fonts.bodyMedium}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {wind} {props.windFormat}
          </Text>
          <Icon
            source={windDirection}
            size={18}
            color={theme.colors.onSurfaceVariant}
          />
        </View>
        {weather ? null : <VerticalSpacer size={24} />}
        {/* Currently there exists a bug in paper where the Divider disappears if the parent 
        has align items set to "center" */}
        <Divider
          horizontalInset={true}
          style={{ alignSelf: "stretch", marginVertical: 4 }}
        />
        <Text
          style={theme.fonts.bodyMedium}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {time}
        </Text>
      </View>
    </Card>
  );
};

const DailyDetailedForecastHeader = (
  props: DailyDetailedForecastHeaderProps
) => {
  const theme = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        maxWidth: "100%",
        flex: 1,
      }}
    >
      <Text style={{ ...theme.fonts.headlineSmall, flex: 1 }} numberOfLines={1}>
        {props.title}
      </Text>
      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <Icon source="thermometer-chevron-up" size={18} color={"#D01B1B"} />
        <HorizontalSpacer size={4} />
        <Text style={theme.fonts.bodyLarge} numberOfLines={1}>
          {props.dailyHigh} {props.temperatureFormat}
        </Text>
        <HorizontalSpacer size={12} />
        <Icon source="thermometer-chevron-down" size={18} color={"#47abd8"} />
        <HorizontalSpacer size={4} />
        <Text style={theme.fonts.bodyLarge} numberOfLines={1}>
          {props.dailyLow} {props.temperatureFormat}
        </Text>
      </View>
    </View>
  );
};

export default DetailedForecastSummary;
