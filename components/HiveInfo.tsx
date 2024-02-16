import { HiveModel } from "@/models/hiveModel";
import React from "react";
import { useTheme, Text } from "react-native-paper";

const HiveInfo = (item: HiveModel) => {
    const theme = useTheme();

    return (
        <>
            <Text style={theme.fonts.bodyLarge}>Name: {item.name}</Text>
            <Text style={theme.fonts.bodyLarge}>{item.weather}</Text>
            <Text style={theme.fonts.bodyLarge}>{`${item.wind} km/h`}</Text>
            <Text style={theme.fonts.bodyLarge}>{`${item.temprature} °C`}</Text>
            <Text style={theme.fonts.bodyLarge}>{`${item.precipitation}mm`}</Text>
            <Text style={theme.fonts.bodyLarge}>{`${item.weight} kg`}</Text>
            <Text style={theme.fonts.bodyLarge}>{`${item.humidity}%`}</Text>
        </>
    )
}

export default HiveInfo;