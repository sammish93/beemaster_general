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

    const [expanded, setExpanded] = React.useState<string | null>(null);
    const handlePress = (panel: string) => {
        setExpanded(expanded === panel ? null : panel);
    };


    const onSelectMeasurement = (setPreferenceFunction: Function, measurement: any, panel: string) => {
        setPreferenceFunction(measurement);
        setExpanded(null);
    };

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
                expanded={expanded === 'temperature'}
                onPress={() => handlePress('temperature')}
            >
                <List.Item
                    title="Celsius (°C)"
                    titleStyle={theme.fonts.bodyLarge}
                    onPress={() => onSelectMeasurement(
                        userViewModel.setTemperaturePreference,
                        TemperatureMeasurement.Celsius, 'temperature'
                    )
                    }
                />
                <List.Item
                    title="Fahrenheit (°F)"
                    titleStyle={theme.fonts.bodyLarge}
                    onPress={() => onSelectMeasurement(
                        userViewModel.setTemperaturePreference,
                        TemperatureMeasurement.Fahrenheit, 'temperature'
                    )
                    }
                />
            </List.Accordion>

            <List.Accordion
                title={userViewModel.i18n.t("select unit of weight")}
                titleStyle={theme.fonts.bodyLarge}
                left={(props) => <List.Icon {...props} icon="scale" />}
                expanded={expanded === 'weight'}
                onPress={() => handlePress('weight')}
            >
                <List.Item
                    title={userViewModel.i18n.t("grams (g)")}
                    titleStyle={theme.fonts.bodyLarge}
                    onPress={() => onSelectMeasurement(
                        userViewModel.setWeightPreference, WeightMeasurement.Grams, 'weight')

                    }
                />
                <List.Item
                    title={userViewModel.i18n.t("kilograms (kg)")}
                    titleStyle={theme.fonts.bodyLarge}
                    onPress={() => onSelectMeasurement(
                        userViewModel.setWeightPreference, WeightMeasurement.Kilograms, 'weight')
                    }
                />
                <List.Item
                    title={userViewModel.i18n.t("pounds (lb)")}
                    titleStyle={theme.fonts.bodyLarge}
                    onPress={() => onSelectMeasurement(
                        userViewModel.setWeightPreference, WeightMeasurement.Pounds, 'weight')
                    }
                />
                <List.Item
                    title={userViewModel.i18n.t("ounces (℥)")}
                    titleStyle={theme.fonts.bodyLarge}
                    onPress={() => onSelectMeasurement(
                        userViewModel.setWeightPreference, WeightMeasurement.Ounces, 'weight')
                    }
                />
                <List.Item
                    title={userViewModel.i18n.t("stones (st)")}
                    titleStyle={theme.fonts.bodyLarge}
                    onPress={() => onSelectMeasurement(
                        userViewModel.setWeightPreference, WeightMeasurement.Stones, 'weight')
                    }
                />
            </List.Accordion>
            <List.Accordion
                title={userViewModel.i18n.t("select precipitation unit")}
                titleStyle={theme.fonts.bodyLarge}
                left={(props) => <List.Icon {...props} icon="weather-rainy" />}
                expanded={expanded === 'precipitation'}
                onPress={() => handlePress('precipitation')}
            >
                <List.Item
                    title={userViewModel.i18n.t("centimeters (cm)")}
                    titleStyle={theme.fonts.bodyLarge}
                    onPress={() => onSelectMeasurement(
                        userViewModel.setPrecipitationPreference, PrecipitationMeasurement.Centimeters, 'precipitation')
                    }
                />
                <List.Item
                    title={userViewModel.i18n.t("millimeters (mm)")}
                    titleStyle={theme.fonts.bodyLarge}
                    onPress={() => onSelectMeasurement(
                        userViewModel.setPrecipitationPreference, PrecipitationMeasurement.Millimeters, 'precipitation')
                    }
                />
                <List.Item
                    title={userViewModel.i18n.t("inches (in)")}
                    titleStyle={theme.fonts.bodyLarge}
                    onPress={() => onSelectMeasurement(
                        userViewModel.setPrecipitationPreference, PrecipitationMeasurement.Inches, 'precipitation')
                    }
                />
            </List.Accordion>

            <List.Accordion
                title={userViewModel.i18n.t("select windspeed unit")}
                titleStyle={theme.fonts.bodyLarge}
                left={(props) => <List.Icon {...props} icon="weather-windy-variant" />}
                expanded={expanded === 'windspeed'}
                onPress={() => handlePress('windspeed')}
            >
                <List.Item
                    title={userViewModel.i18n.t("meters per second (m/s)")}
                    titleStyle={theme.fonts.bodyLarge}
                    onPress={() => onSelectMeasurement(
                        userViewModel.setWindSpeedPreference, WindSpeedMeasurement.MetersPerSecond, 'windspeed')
                    }
                />

                <List.Item
                    title={userViewModel.i18n.t("miles per hour (mph)")}
                    titleStyle={theme.fonts.bodyLarge}
                    onPress={() => onSelectMeasurement(
                        userViewModel.setWindSpeedPreference, WindSpeedMeasurement.MilesPerHour, 'windspeed')
                    }
                />
                <List.Item
                    title={userViewModel.i18n.t("kilometers per hour (km/h)")}
                    titleStyle={theme.fonts.bodyLarge}
                    onPress={() => onSelectMeasurement(
                        userViewModel.setWindSpeedPreference, WindSpeedMeasurement.KilometersPerHour, 'windspeed')
                    }
                />
                <List.Item
                    title={userViewModel.i18n.t("knots (kn)")}
                    titleStyle={theme.fonts.bodyLarge}
                    onPress={() => onSelectMeasurement(
                        userViewModel.setWindSpeedPreference, WindSpeedMeasurement.Knots, 'windspeed')
                    }
                />

            </List.Accordion>
            <List.Accordion
                title={userViewModel.i18n.t("select measurement unit for bee count")}
                titleStyle={theme.fonts.bodyLarge}
                left={(props) => <List.Icon {...props} icon="bee" />}
                expanded={expanded === 'bee count'}
                onPress={() => handlePress('bee count')}

            >
                <List.Item
                    title={userViewModel.i18n.t("per second (p/s)")}
                    titleStyle={theme.fonts.bodyLarge}
                    onPress={() => onSelectMeasurement(
                        userViewModel.setBeeCountPreference, BeeCountMeasurement.PerSecond, 'bee count')
                    }
                />

                <List.Item
                    title={userViewModel.i18n.t("per minute (p/m)")}
                    titleStyle={theme.fonts.bodyLarge}
                    onPress={() => onSelectMeasurement(
                        userViewModel.setBeeCountPreference, BeeCountMeasurement.PerMinute, 'bee count')
                    }
                />
                <List.Item
                    title={userViewModel.i18n.t("per hour (p/h)")}
                    titleStyle={theme.fonts.bodyLarge}
                    onPress={() => onSelectMeasurement(
                        userViewModel.setBeeCountPreference, BeeCountMeasurement.PerHour, 'bee count')
                    }
                />
            </List.Accordion>

        </>

    );

}
export default ListMeasurements;