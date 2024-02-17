import { HiveModel } from "@/models/hiveModel";
import React from "react";
import { View } from "react-native";
import { useTheme, Text } from "react-native-paper";

const HiveInfo = (item: HiveModel) => {
    const theme = useTheme();

    const data = [
        { label: 'Weather', value: item.weather },
        { label: 'Wind', value: `${item.wind} km/h` },
        { label: 'Temperature', value: `${item.temprature} °C` },
        { label: 'Rain', value: `${item.precipitation}mm` },
        { label: 'Weight', value: `${item.weight} kg` },
        { label: 'Hive Temperature', value: `34.2 °C` }, 
        { label: 'Humidity', value: `${item.humidity}%` },
        { label: 'Counter', value: '421 p/h' },
    ];

    return (
        <>
            <Text style={theme.fonts.titleMedium}>{item.name}</Text>
            <View style={{ 
                flexDirection: "row", 
                justifyContent: "space-between",
                padding: 10
            }}>
                <View>
                    <Text style={theme.fonts.bodyLarge}>Weather: {item.weather}</Text>
                    <Text style={theme.fonts.bodyLarge}>Wind: {`${item.wind} km/h`}</Text>
                    <Text style={theme.fonts.bodyLarge}>Temperature: {`${item.temprature} °C`}</Text>
                    <Text style={theme.fonts.bodyLarge}>Rain: {`${item.precipitation}mm`}</Text>
                </View>
                <View>
                    <Text style={theme.fonts.bodyLarge}>Weight: {`${item.weight} kg`}</Text>
                    <Text style={theme.fonts.bodyLarge}>Temperature: {`34.2 °C`}</Text>
                    <Text style={theme.fonts.bodyLarge}>Humidity: {`${item.humidity}%`}</Text>
                    <Text style={theme.fonts.bodyLarge}>Counter: 421 p/h</Text>
                </View>
            </View>
        </>
    )
}

export default HiveInfo;