import { HiveModel } from "@/models/hiveModel";
import React from "react";
import { View } from "react-native";
import { useTheme, Text } from "react-native-paper";

interface HiveInfoProps {
    item: HiveModel
    isDetailedView: boolean
}

const HiveInfo = ({ item, isDetailedView }: HiveInfoProps) => {
    const theme = useTheme();

    const data = [
        { label: 'Weather', value: "Sunny" },
        { label: 'Wind', value: `4 km/h` },
        { label: 'Temperature', value: `21 °C` },
        { label: 'Rain', value: `0.0mm 0%` },
        { label: 'Weight', value: `57.6 kg` },
        { label: 'Hive Temp', value: `34.2 °C` }, 
        { label: 'Humidity', value: `54%` },
        { label: 'Counter', value: '421 p/h' },
    ];

    return (
        <>
            <Text style={theme.fonts.titleMedium}>{item.name}</Text>
            <View style={{ 
                flexDirection: "row", 
                justifyContent: "space-between",
                flexWrap: "wrap",
                padding: 10
            }}>
                {data.map(({ label, value }) => (
                    <View key={label} style={{ flexDirection: 'row', margin: 5 }}>
                        {isDetailedView && <Text style={theme.fonts.bodyLarge}>{label}: </Text>}
                        <Text style={theme.fonts.bodyLarge}>{value}</Text>
                    </View>
                ))}
            </View>
        </>
    )
}

export default HiveInfo;