import {
  PrecipitationMeasurement,
  TemperatureMeasurement,
  WindSpeedMeasurement,
} from "@/constants/Measurements";
import {
  dateTimeToTimeFormatter,
  dateTimeToDateFormatter,
  dateTimeToDayFormatter,
} from "@/domain/dateTimeFormatter";
import { roundToOneDecimalPlace } from "@/domain/numberFormatter";
import getWeatherTypeIconFromString from "@/domain/weatherIconMapper";
import getWindDirectionIconFromAngle from "@/domain/windDirectionMapper";
import { ForecastPeriod, WeeklySimpleForecast } from "@/models/forecast";
import { View, Image } from "react-native";
import { Icon, Text, useTheme } from "react-native-paper";

interface ForecastSummaryProps {
  forecast: WeeklySimpleForecast;
  locale: string;
  temperatureFormat: TemperatureMeasurement;
  precipitationFormat: PrecipitationMeasurement;
  windFormat: WindSpeedMeasurement;
}

interface DailyForecastSummaryProps {
  forecast: ForecastPeriod;
  locale: string;
  temperatureFormat: TemperatureMeasurement;
  precipitationFormat: PrecipitationMeasurement;
  windFormat: WindSpeedMeasurement;
}

const ForecastSummary = (props: ForecastSummaryProps) => {
  return (
    <>
      <DailyForecastSummary
        forecast={props.forecast.currentForecast}
        locale={props.locale}
        temperatureFormat={props.temperatureFormat}
        precipitationFormat={props.precipitationFormat}
        windFormat={props.windFormat}
      />
      <DailyForecastSummary
        forecast={props.forecast.dayTwoForecast}
        locale={props.locale}
        temperatureFormat={props.temperatureFormat}
        precipitationFormat={props.precipitationFormat}
        windFormat={props.windFormat}
      />
      <DailyForecastSummary
        forecast={props.forecast.dayThreeForecast}
        locale={props.locale}
        temperatureFormat={props.temperatureFormat}
        precipitationFormat={props.precipitationFormat}
        windFormat={props.windFormat}
      />
      <DailyForecastSummary
        forecast={props.forecast.dayFourForecast}
        locale={props.locale}
        temperatureFormat={props.temperatureFormat}
        precipitationFormat={props.precipitationFormat}
        windFormat={props.windFormat}
      />
      <DailyForecastSummary
        forecast={props.forecast.dayFiveForecast}
        locale={props.locale}
        temperatureFormat={props.temperatureFormat}
        precipitationFormat={props.precipitationFormat}
        windFormat={props.windFormat}
      />
      <DailyForecastSummary
        forecast={props.forecast.daySixForecast}
        locale={props.locale}
        temperatureFormat={props.temperatureFormat}
        precipitationFormat={props.precipitationFormat}
        windFormat={props.windFormat}
      />
      <DailyForecastSummary
        forecast={props.forecast.daySevenForecast}
        locale={props.locale}
        temperatureFormat={props.temperatureFormat}
        precipitationFormat={props.precipitationFormat}
        windFormat={props.windFormat}
      />
    </>
  );
};

const DailyForecastSummary = (props: DailyForecastSummaryProps) => {
  const theme = useTheme();

  const time = dateTimeToTimeFormatter(props.forecast.dateTime, props.locale);
  const date = dateTimeToDateFormatter(props.forecast.dateTime, props.locale);
  const day = dateTimeToDayFormatter(props.forecast.dateTime, props.locale);
  const wind = roundToOneDecimalPlace(props.forecast.windSpeed);
  const windDirection = getWindDirectionIconFromAngle(
    props.forecast.windFromDirection
  );
  const temperature = roundToOneDecimalPlace(props.forecast.temperature);
  const precipitation = roundToOneDecimalPlace(props.forecast.precipitation);
  const weather = getWeatherTypeIconFromString(props.forecast.weatherType);

  return (
    <>
      <Text style={theme.fonts.bodyMedium}>{time}</Text>
      <Text style={theme.fonts.bodyMedium}>{date}</Text>
      <Text style={theme.fonts.bodyMedium}>{day}</Text>
      <Image source={weather} style={{ width: 24, height: 24 }} />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Icon
          source="weather-windy"
          size={18}
          color={theme.colors.onSurfaceVariant}
        />
        <Text style={theme.fonts.bodyMedium}>
          {wind} {props.windFormat}
        </Text>
        <Icon
          source={windDirection}
          size={18}
          color={theme.colors.onSurfaceVariant}
        />
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Icon
          source="thermometer"
          size={18}
          color={theme.colors.onSurfaceVariant}
        />
        <Text style={theme.fonts.bodyMedium}>
          {temperature} {props.temperatureFormat}
        </Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Icon
          source="water-outline"
          size={18}
          color={theme.colors.onSurfaceVariant}
        />
        <Text style={theme.fonts.bodyMedium}>
          {precipitation} {props.precipitationFormat}
        </Text>
      </View>
    </>
  );
};

export default ForecastSummary;
