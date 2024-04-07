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

const ListMeasurements = () => {
    const { userViewModel } = useContext(MobXProviderContext);
    const theme = useTheme();
    const currentMeasurements = `${userViewModel.temperaturePreference} & ${userViewModel.weightPreference}`;

    return (
        <>
            <Text style={theme.fonts.bodyLarge}>
                {userViewModel.i18n.t("measurement preferences")}:{" "}
                {currentMeasurements}
            </Text>
            <List.Accordion
                title={userViewModel.i18n.t("select temperature unit")}
                titleStyle={theme.fonts.bodyLarge}
                left={(props) => <List.Icon {...props} icon="thermometer" />}
            >
                <List.Item
                    title="Celsius (°C)"
                    titleStyle={theme.fonts.bodyLarge}
                    onPress={() =>
                        userViewModel.setTemperaturePreference(
                            TemperatureMeasurement.Celsius
                        )
                    }
                />
                <List.Item
                    title="Fahrenheit (°F)"
                    titleStyle={theme.fonts.bodyLarge}
                    onPress={() =>
                        userViewModel.setTemperaturePreference(
                            TemperatureMeasurement.Fahrenheit
                        )
                    }
                />
            </List.Accordion>

            <List.Accordion
                title={userViewModel.i18n.t("select unit of weight")}
                titleStyle={theme.fonts.bodyLarge}
                left={(props) => <List.Icon {...props} icon="scale" />}
            >
                <List.Item
                    title={userViewModel.i18n.t("grams (g)")}
                    titleStyle={theme.fonts.bodyLarge}
                    onPress={() =>
                        userViewModel.setWeightPreference(WeightMeasurement.Grams)
                    }
                />
                <List.Item
                    title={userViewModel.i18n.t("kilograms (kg)")}
                    titleStyle={theme.fonts.bodyLarge}
                    onPress={() =>
                        userViewModel.setWeightPreference(WeightMeasurement.Kilograms)
                    }
                />
                <List.Item
                    title={userViewModel.i18n.t("pounds (lb)")}
                    titleStyle={theme.fonts.bodyLarge}
                    onPress={() =>
                        userViewModel.setWeightPreference(WeightMeasurement.Pounds)
                    }
                />
                <List.Item
                    title={userViewModel.i18n.t("ounces (℥)")}
                    titleStyle={theme.fonts.bodyLarge}
                    onPress={() =>
                        userViewModel.setWeightPreference(WeightMeasurement.Ounces)
                    }
                />
                <List.Item
                    title={userViewModel.i18n.t("stones (st)")}
                    titleStyle={theme.fonts.bodyLarge}
                    onPress={() =>
                        userViewModel.setWeightPreference(WeightMeasurement.Stones)
                    }
                />
            </List.Accordion>
            <List.Accordion
                title={userViewModel.i18n.t("select precipitation unit")}
                titleStyle={theme.fonts.bodyLarge}
                left={(props) => <List.Icon {...props} icon="weather-rainy" />}
            >
                <List.Item
                    title={userViewModel.i18n.t("centimeters (cm)")}
                    titleStyle={theme.fonts.bodyLarge}
                    onPress={() =>
                        userViewModel.setPrecipitationPreference(PrecipitationMeasurement.Centimeters)
                    }
                />
                <List.Item
                    title={userViewModel.i18n.t("millimeters (mm)")}
                    titleStyle={theme.fonts.bodyLarge}
                    onPress={() =>
                        userViewModel.setPrecipitationPreference(PrecipitationMeasurement.Millimeters)
                    }
                />
                <List.Item
                    title={userViewModel.i18n.t("inches (in)")}
                    titleStyle={theme.fonts.bodyLarge}
                    onPress={() =>
                        userViewModel.setPrecipitationPreference(PrecipitationMeasurement.Inches)
                    }
                />
            </List.Accordion>

            <List.Accordion
                title={userViewModel.i18n.t("select windspeed unit")}
                titleStyle={theme.fonts.bodyLarge}
                left={(props) => <List.Icon {...props} icon="weather-windy-variant" />}
            >
                <List.Item
                    title={userViewModel.i18n.t("meters per second (m/s)")}
                    titleStyle={theme.fonts.bodyLarge}
                    onPress={() =>
                        userViewModel.setWindSpeedPreference(WindSpeedMeasurement.MetersPerSecond)
                    }
                />

                <List.Item
                    title={userViewModel.i18n.t("miles per hour (mph)")}
                    titleStyle={theme.fonts.bodyLarge}
                    onPress={() =>
                        userViewModel.setWindSpeedPreference(WindSpeedMeasurement.MilesPerHour)
                    }
                />
                <List.Item
                    title={userViewModel.i18n.t("kilometers per hour (km/h)")}
                    titleStyle={theme.fonts.bodyLarge}
                    onPress={() =>
                        userViewModel.setWindSpeedPreference(WindSpeedMeasurement.KilometersPerHour)
                    }
                />
                <List.Item
                    title={userViewModel.i18n.t("knots (kn)")}
                    titleStyle={theme.fonts.bodyLarge}
                    onPress={() =>
                        userViewModel.setWindSpeedPreference(WindSpeedMeasurement.Knots)
                    }
                />

            </List.Accordion>
            <List.Accordion
                title={userViewModel.i18n.t("select measurement unit for bee count")}
                titleStyle={theme.fonts.bodyLarge}
                left={(props) => <List.Icon {...props} icon="bee" />}
            >
                <List.Item
                    title={userViewModel.i18n.t("per second (p/s)")}
                    titleStyle={theme.fonts.bodyLarge}
                    onPress={() =>
                        userViewModel.setBeeCountPreference(BeeCountMeasurement.PerSecond)
                    }
                />

                <List.Item
                    title={userViewModel.i18n.t("per minute (p/m)")}
                    titleStyle={theme.fonts.bodyLarge}
                    onPress={() =>
                        userViewModel.setBeeCountPreference(BeeCountMeasurement.PerMinute)
                    }
                />
                <List.Item
                    title={userViewModel.i18n.t("per hour (p/h)")}
                    titleStyle={theme.fonts.bodyLarge}
                    onPress={() =>
                        userViewModel.setBeeCountPreference(BeeCountMeasurement.PerHour)
                    }
                />
            </List.Accordion>

        </>

    );

}
export default ListMeasurements;