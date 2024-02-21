import { HiveModel } from "@/models/hiveModel";
import React from "react";
import { View } from "react-native";
import { useTheme, Text } from "react-native-paper";
import { sensorData } from "@/data/hiveData";

interface HiveInfoProps {
    item: HiveModel
    isDetailedView: boolean
}

const HiveInfo = ({ item, isDetailedView }: HiveInfoProps) => {
    const theme = useTheme();

    const filteredData = isDetailedView ? sensorData : sensorData.filter(({ label }) => 
        label === 'Temperature' || label === 'Wind' || label === 'Rain'
    );

    const mid = sensorData.length / 2;
    const firstHalf = filteredData.slice(0, mid);
    const secondHalf = filteredData.slice(mid);

    return (
        <>
            <Text style={theme.fonts.titleMedium}>{item.name}</Text>
            <View style={{ 
                flexDirection: "row", 
                justifyContent: "space-between",
                gap: isDetailedView ? 30 : 0,
                padding: isDetailedView ? 8 : 4
            }}>
                <View style={{flex: 1}}>
                    {firstHalf.map(({label, value}) => (
                        <View key={label} style={{flexDirection: 'row', margin: 5}}>
                            {isDetailedView && <Text style={theme.fonts.bodyLarge}>{label}: </Text>}
                            <Text style={theme.fonts.bodyLarge}>{value}</Text>
                        </View>
                    ))}
                </View>
                {secondHalf.length !== 0 && (
                    <View style={{flex: 1}}>
                        {secondHalf.map(({label, value}) => (
                            <View key={label} style={{flexDirection: 'row', margin: 5}}>
                                {isDetailedView && <Text style={theme.fonts.bodyLarge}>{label}: </Text>}
                                <Text style={theme.fonts.bodyLarge}>{value}</Text>
                            </View>
                        ))}
                    </View>
                )}
            </View>
        </>
    )
}

export default HiveInfo;