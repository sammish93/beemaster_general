import * as React from "react";
import { MobXProviderContext } from "mobx-react";
import { useTheme, Text, List } from "react-native-paper";
import { useContext } from "react";
import {
  BeeCountMeasurement,
  PrecipitationMeasurement,
  TemperatureMeasurement,
  WeightMeasurement,
  WindSpeedMeasurement,
} from "@/constants/Measurements";
import { VerticalSpacer } from "./Spacers";
import styles from "@/assets/styles";

const ListMeasurements = () => {
  const { userViewModel } = useContext(MobXProviderContext);
  const theme = useTheme();

  const [expanded, setExpanded] = React.useState<string | null>(null);
  const handlePress = (panel: string) => {
    setExpanded(expanded === panel ? null : panel);
  };

  const onSelectMeasurement = (
    setPreferenceFunction: Function,
    measurement: any,
    panel: string
  ) => {
    setPreferenceFunction(measurement);
    setExpanded(null);
  };

  return (
    <>
      <List.Accordion
        style={{
          ...styles(theme).settingsItem,
          borderRadius: 20,
          backgroundColor: theme.colors.background,
        }}
        theme={{ colors: { background: "transparent" } }}
        title={`${userViewModel.i18n.t("temperature unit")}: ${
          userViewModel.temperaturePreference
        }`}
        titleStyle={theme.fonts.bodyLarge}
        description={expanded === "temperature" ? "description" : ""}
        descriptionStyle={theme.fonts.bodySmall}
        left={(props) => <List.Icon {...props} icon="thermometer" />}
        expanded={expanded === "temperature"}
        onPress={() => handlePress("temperature")}
      >
        <List.Item
          style={{ ...styles(theme).settingsItem, borderRadius: 20 }}
          theme={{ colors: { background: "blue" } }}
          title="Celsius (°C)"
          titleStyle={theme.fonts.bodyLarge}
          onPress={() =>
            onSelectMeasurement(
              userViewModel.setTemperaturePreference,
              TemperatureMeasurement.Celsius,
              "temperature"
            )
          }
        />
        <List.Item
          style={{ ...styles(theme).settingsItem, borderRadius: 20 }}
          theme={{ colors: { background: "blue" } }}
          title="Fahrenheit (°F)"
          titleStyle={theme.fonts.bodyLarge}
          onPress={() =>
            onSelectMeasurement(
              userViewModel.setTemperaturePreference,
              TemperatureMeasurement.Fahrenheit,
              "temperature"
            )
          }
        />
      </List.Accordion>

      <VerticalSpacer size={8} />

      <List.Accordion
        style={{
          ...styles(theme).settingsItem,
          borderRadius: 20,
          backgroundColor: theme.colors.background,
        }}
        theme={{ colors: { background: "transparent" } }}
        title={`${userViewModel.i18n.t("unit of weight")}: ${
          userViewModel.weightPreference
        }`}
        titleStyle={theme.fonts.bodyLarge}
        description={expanded === "weight" ? "description" : ""}
        descriptionStyle={theme.fonts.bodySmall}
        left={(props) => <List.Icon {...props} icon="scale" />}
        expanded={expanded === "weight"}
        onPress={() => handlePress("weight")}
      >
        <List.Item
          style={{ ...styles(theme).settingsItem, borderRadius: 20 }}
          theme={{ colors: { background: "blue" } }}
          title={userViewModel.i18n.t("grams (g)")}
          titleStyle={theme.fonts.bodyLarge}
          onPress={() =>
            onSelectMeasurement(
              userViewModel.setWeightPreference,
              WeightMeasurement.Grams,
              "weight"
            )
          }
        />
        <List.Item
          style={{ ...styles(theme).settingsItem, borderRadius: 20 }}
          theme={{ colors: { background: "blue" } }}
          title={userViewModel.i18n.t("kilograms (kg)")}
          titleStyle={theme.fonts.bodyLarge}
          onPress={() =>
            onSelectMeasurement(
              userViewModel.setWeightPreference,
              WeightMeasurement.Kilograms,
              "weight"
            )
          }
        />
        <List.Item
          style={{ ...styles(theme).settingsItem, borderRadius: 20 }}
          theme={{ colors: { background: "blue" } }}
          title={userViewModel.i18n.t("pounds (lb)")}
          titleStyle={theme.fonts.bodyLarge}
          onPress={() =>
            onSelectMeasurement(
              userViewModel.setWeightPreference,
              WeightMeasurement.Pounds,
              "weight"
            )
          }
        />
        <List.Item
          style={{ ...styles(theme).settingsItem, borderRadius: 20 }}
          theme={{ colors: { background: "blue" } }}
          title={userViewModel.i18n.t("ounces (℥)")}
          titleStyle={theme.fonts.bodyLarge}
          onPress={() =>
            onSelectMeasurement(
              userViewModel.setWeightPreference,
              WeightMeasurement.Ounces,
              "weight"
            )
          }
        />
        <List.Item
          style={{ ...styles(theme).settingsItem, borderRadius: 20 }}
          theme={{ colors: { background: "blue" } }}
          title={userViewModel.i18n.t("stones (st)")}
          titleStyle={theme.fonts.bodyLarge}
          onPress={() =>
            onSelectMeasurement(
              userViewModel.setWeightPreference,
              WeightMeasurement.Stones,
              "weight"
            )
          }
        />
      </List.Accordion>

      <VerticalSpacer size={8} />

      <List.Accordion
        style={{
          ...styles(theme).settingsItem,
          borderRadius: 20,
          backgroundColor: theme.colors.background,
        }}
        theme={{ colors: { background: "transparent" } }}
        title={`${userViewModel.i18n.t("precipitation unit")}: ${
          userViewModel.precipitationPreference
        }`}
        titleStyle={theme.fonts.bodyLarge}
        description={expanded === "precipitation" ? "description" : ""}
        descriptionStyle={theme.fonts.bodySmall}
        left={(props) => <List.Icon {...props} icon="weather-rainy" />}
        expanded={expanded === "precipitation"}
        onPress={() => handlePress("precipitation")}
      >
        <List.Item
          style={{ ...styles(theme).settingsItem, borderRadius: 20 }}
          theme={{ colors: { background: "blue" } }}
          title={userViewModel.i18n.t("centimeters (cm)")}
          titleStyle={theme.fonts.bodyLarge}
          onPress={() =>
            onSelectMeasurement(
              userViewModel.setPrecipitationPreference,
              PrecipitationMeasurement.Centimeters,
              "precipitation"
            )
          }
        />
        <List.Item
          style={{ ...styles(theme).settingsItem, borderRadius: 20 }}
          theme={{ colors: { background: "blue" } }}
          title={userViewModel.i18n.t("millimeters (mm)")}
          titleStyle={theme.fonts.bodyLarge}
          onPress={() =>
            onSelectMeasurement(
              userViewModel.setPrecipitationPreference,
              PrecipitationMeasurement.Millimeters,
              "precipitation"
            )
          }
        />
        <List.Item
          style={{ ...styles(theme).settingsItem, borderRadius: 20 }}
          theme={{ colors: { background: "blue" } }}
          title={userViewModel.i18n.t("inches (in)")}
          titleStyle={theme.fonts.bodyLarge}
          onPress={() =>
            onSelectMeasurement(
              userViewModel.setPrecipitationPreference,
              PrecipitationMeasurement.Inches,
              "precipitation"
            )
          }
        />
      </List.Accordion>

      <VerticalSpacer size={8} />

      <List.Accordion
        style={{
          ...styles(theme).settingsItem,
          borderRadius: 20,
          backgroundColor: theme.colors.background,
        }}
        theme={{ colors: { background: "transparent" } }}
        title={`${userViewModel.i18n.t("windspeed unit")}: ${
          userViewModel.windSpeedPreference
        }`}
        titleStyle={theme.fonts.bodyLarge}
        description={expanded === "windspeed" ? "description" : ""}
        descriptionStyle={theme.fonts.bodySmall}
        left={(props) => <List.Icon {...props} icon="weather-windy-variant" />}
        expanded={expanded === "windspeed"}
        onPress={() => handlePress("windspeed")}
      >
        <List.Item
          style={{ ...styles(theme).settingsItem, borderRadius: 20 }}
          theme={{ colors: { background: "blue" } }}
          title={userViewModel.i18n.t("meters per second (m/s)")}
          titleStyle={theme.fonts.bodyLarge}
          onPress={() =>
            onSelectMeasurement(
              userViewModel.setWindSpeedPreference,
              WindSpeedMeasurement.MetersPerSecond,
              "windspeed"
            )
          }
        />

        <List.Item
          style={{ ...styles(theme).settingsItem, borderRadius: 20 }}
          theme={{ colors: { background: "blue" } }}
          title={userViewModel.i18n.t("miles per hour (mph)")}
          titleStyle={theme.fonts.bodyLarge}
          onPress={() =>
            onSelectMeasurement(
              userViewModel.setWindSpeedPreference,
              WindSpeedMeasurement.MilesPerHour,
              "windspeed"
            )
          }
        />
        <List.Item
          style={{ ...styles(theme).settingsItem, borderRadius: 20 }}
          theme={{ colors: { background: "blue" } }}
          title={userViewModel.i18n.t("kilometers per hour (km/h)")}
          titleStyle={theme.fonts.bodyLarge}
          onPress={() =>
            onSelectMeasurement(
              userViewModel.setWindSpeedPreference,
              WindSpeedMeasurement.KilometersPerHour,
              "windspeed"
            )
          }
        />
        <List.Item
          style={{ ...styles(theme).settingsItem, borderRadius: 20 }}
          theme={{ colors: { background: "blue" } }}
          title={userViewModel.i18n.t("knots (kn)")}
          titleStyle={theme.fonts.bodyLarge}
          onPress={() =>
            onSelectMeasurement(
              userViewModel.setWindSpeedPreference,
              WindSpeedMeasurement.Knots,
              "windspeed"
            )
          }
        />
      </List.Accordion>

      <VerticalSpacer size={8} />

      <List.Accordion
        style={{
          ...styles(theme).settingsItem,
          borderRadius: 20,
          backgroundColor: theme.colors.background,
        }}
        theme={{ colors: { background: "transparent" } }}
        title={`${userViewModel.i18n.t("bee count unit")}: ${
          userViewModel.beeCountPreference
        }`}
        titleStyle={theme.fonts.bodyLarge}
        description={expanded === "bee count" ? "description" : ""}
        descriptionStyle={theme.fonts.bodySmall}
        left={(props) => <List.Icon {...props} icon="bee" />}
        expanded={expanded === "bee count"}
        onPress={() => handlePress("bee count")}
      >
        <List.Item
          style={{ ...styles(theme).settingsItem, borderRadius: 20 }}
          theme={{ colors: { background: "blue" } }}
          title={userViewModel.i18n.t("per second (p/s)")}
          titleStyle={theme.fonts.bodyLarge}
          onPress={() =>
            onSelectMeasurement(
              userViewModel.setBeeCountPreference,
              BeeCountMeasurement.PerSecond,
              "bee count"
            )
          }
        />

        <List.Item
          style={{ ...styles(theme).settingsItem, borderRadius: 20 }}
          theme={{ colors: { background: "blue" } }}
          title={userViewModel.i18n.t("per minute (p/m)")}
          titleStyle={theme.fonts.bodyLarge}
          onPress={() =>
            onSelectMeasurement(
              userViewModel.setBeeCountPreference,
              BeeCountMeasurement.PerMinute,
              "bee count"
            )
          }
        />
        <List.Item
          style={{ ...styles(theme).settingsItem, borderRadius: 20 }}
          theme={{ colors: { background: "blue" } }}
          title={userViewModel.i18n.t("per hour (p/h)")}
          titleStyle={theme.fonts.bodyLarge}
          onPress={() =>
            onSelectMeasurement(
              userViewModel.setBeeCountPreference,
              BeeCountMeasurement.PerHour,
              "bee count"
            )
          }
        />
      </List.Accordion>
    </>
  );
};
export default ListMeasurements;
