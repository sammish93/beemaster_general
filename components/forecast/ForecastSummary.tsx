import {
  PrecipitationMeasurement,
  TemperatureMeasurement,
  WindSpeedMeasurement,
} from "@/constants/Measurements";
import { dateTimeToDateFormatter } from "@/domain/dateTimeFormatter";
import { roundToOneDecimalPlace } from "@/domain/numberFormatter";
import getWeatherTypeIconFromString from "@/domain/weatherIconMapper";
import getWindDirectionIconFromAngle from "@/domain/windDirectionMapper";
import { ForecastPeriod, WeeklySimpleForecast } from "@/models/forecast";
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
import { HorizontalSpacer } from "../Spacers";
import { useContext } from "react";
import { MobXProviderContext } from "mobx-react";
import styles from "@/assets/styles";
import React from "react";

interface ForecastSummaryProps {
  forecast: WeeklySimpleForecast;
  locale: string;
  temperatureFormat: TemperatureMeasurement;
  precipitationFormat: PrecipitationMeasurement;
  windFormat: WindSpeedMeasurement;
  onPress: () => void;
}

interface DailyForecastSummaryProps {
  forecast: ForecastPeriod;
  locale: string;
  temperatureFormat: TemperatureMeasurement;
  precipitationFormat: PrecipitationMeasurement;
  windFormat: WindSpeedMeasurement;
}

interface DailyForecastSummaryHeaderProps {
  forecast: ForecastPeriod;
  locale: string;
  temperatureFormat: TemperatureMeasurement;
  precipitationFormat: PrecipitationMeasurement;
  windFormat: WindSpeedMeasurement;
  onPress: () => void;
}

const ForecastSummary = (props: ForecastSummaryProps) => {
  const theme = useTheme();
  const { userViewModel } = useContext(MobXProviderContext);
  const days = [
    "dayTwoForecast",
    "dayThreeForecast",
    "dayFourForecast",
    "dayFiveForecast",
    "daySixForecast",
    "daySevenForecast",
  ];

  return (
    <Card>
      <Card.Content style={{ flexDirection: "row" }}>
        <CurrentForecastHeader
          forecast={props.forecast.currentForecast}
          locale={props.locale}
          temperatureFormat={props.temperatureFormat}
          precipitationFormat={props.precipitationFormat}
          windFormat={props.windFormat}
          onPress={props.onPress}
        />
      </Card.Content>
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
        {days.map((day, index) => (
          <React.Fragment key={`${day}-fragment`}>
            {index !== 0 && <HorizontalSpacer size={8} key={`spacer-${day}`} />}
            <DailyForecastSummary
              key={`summary-${day}`}
              forecast={props.forecast[day]}
              locale={props.locale}
              temperatureFormat={props.temperatureFormat}
              precipitationFormat={props.precipitationFormat}
              windFormat={props.windFormat}
            />
          </React.Fragment>
        ))}
        <HorizontalSpacer size={12} />
      </ScrollView>
    </Card>
  );
};

const DailyForecastSummary = (props: DailyForecastSummaryProps) => {
  const theme = useTheme();
  const { userViewModel } = useContext(MobXProviderContext);

  const date = dateTimeToDateFormatter(
    props.forecast.dateTime,
    props.locale,
    "medium"
  );
  const wind = roundToOneDecimalPlace(props.forecast.windSpeed);
  const windDirection = getWindDirectionIconFromAngle(
    props.forecast.windFromDirection
  );
  const temperature = roundToOneDecimalPlace(props.forecast.temperature);
  const precipitation = roundToOneDecimalPlace(props.forecast.precipitation);
  const weather = getWeatherTypeIconFromString(props.forecast.weatherType);

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
          {date}
        </Text>
      </View>
    </Card>
  );
};

const CurrentForecastHeader = (props: DailyForecastSummaryHeaderProps) => {
  const theme = useTheme();
  const { userViewModel } = useContext(MobXProviderContext);

  const weather = getWeatherTypeIconFromString(props.forecast.weatherType);
  const wind = roundToOneDecimalPlace(props.forecast.windSpeed);
  const windDirection = getWindDirectionIconFromAngle(
    props.forecast.windFromDirection
  );
  const temperature = roundToOneDecimalPlace(props.forecast.temperature);
  const precipitation = roundToOneDecimalPlace(props.forecast.precipitation);

  return (
    <>
      <View style={{ alignItems: "center" }}>
        <Image source={weather} style={{ width: 72, height: 72 }} />
      </View>
      <HorizontalSpacer size={12} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          maxWidth: "100%",
          flex: 1,
        }}
      >
        <View
          style={{
            alignItems: "flex-start",
            flexDirection: "column",
            justifyContent: "flex-start",
            flex: 3,
          }}
        >
          <Title style={theme.fonts.headlineSmall} numberOfLines={1}>
            {userViewModel.i18n.t(props.forecast.weatherType)}
          </Title>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              maxWidth: "100%",
              flex: 1,
            }}
          >
            <View style={styles(theme).weatherTopRow}>
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
                {temperature}
                {props.temperatureFormat}
              </Text>
            </View>
            <HorizontalSpacer size={8} />
            <View style={styles(theme).weatherTopRow}>
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
                {precipitation}
                {props.precipitationFormat} {props.forecast.humidity}%
              </Text>
            </View>
            <HorizontalSpacer size={8} />
            <View style={styles(theme).weatherTopRow}>
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
          </View>
        </View>
        <View
          style={{
            alignItems: "flex-end",
            flexDirection: "column",
            justifyContent: "flex-start",
            flex: 1,
          }}
        >
          <FAB
            icon="arrow-right"
            onPress={props.onPress}
            style={{ position: "relative", left: 25 }}
          />
        </View>
      </View>
    </>
  );
};

export default ForecastSummary;
