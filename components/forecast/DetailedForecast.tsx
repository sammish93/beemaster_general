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

interface HourlyForecastCardProps {
  forecast: ForecastPeriod;
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

  const dateTime = props.hourlyForecasts["18HundredHours"]
    ? props.hourlyForecasts["18HundredHours"].dateTime
    : props.hourlyForecasts["23HundredHours"].dateTime;

  const formattedDate = dateTimeToDateFormatter(dateTime, props.locale, "full");

  return (
    <Card>
      <Card.Content style={{ flexDirection: "row" }}>
        <Title style={theme.fonts.headlineSmall} numberOfLines={1}>
          {formattedDate}
        </Title>
      </Card.Content>
      <Card.Content>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={{
            justifyContent: "space-between",
            flex: 1,
            paddingVertical: 12,
            gap: 8,
          }}
        >
          {hours.map((hour, index) =>
            props.hourlyForecasts[hour] ? (
              <HourlyForecastCard
                key={`card-${hour}`}
                forecast={props.hourlyForecasts[hour]}
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
        minWidth: 100,
        maxWidth: "100%",
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
            {precipitation} {props.precipitationFormat}
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

export default DetailedForecastSummary;
