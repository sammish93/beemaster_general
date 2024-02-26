import React from "react";
import { HiveModel } from "@/models/hiveModel";
import { View } from "react-native";
import { useTheme, Text, Card } from "react-native-paper";
import { sensorData } from "@/data/hiveData";

interface HiveCardProps {
  item: HiveModel;
  isDetailedView: boolean;
  onPress: () => void;
  maxWidth: number | string;
}

const HiveCard = ({
  item,
  isDetailedView,
  onPress,
  maxWidth,
}: HiveCardProps) => {
  const theme = useTheme();

  const filterOnLabel = (
    ...list: string[]
  ): { label: string; value: string }[] => {
    return sensorData.filter(({ label }) => list.includes(label));
  };

  const filteredData = isDetailedView
    ? sensorData
    : filterOnLabel("Temperature", "Wind", "Rain");
  const mid = Math.ceil(sensorData.length / 2);
  const firstHalf = filteredData.slice(0, mid);
  const secondHalf = filteredData.slice(mid);

  return (
    <Card onPress={onPress} style={{ margin: 4, flex: 1, maxWidth: maxWidth }}>
      <Card.Title title={item.name} />
      <Card.Content
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          {firstHalf.map(({ label, value }) => (
            <View key={label} style={{ flexDirection: "row" }}>
              {isDetailedView && (
                <Text style={theme.fonts.bodyMedium}>{label}: </Text>
              )}
              <Text style={theme.fonts.bodyMedium}>{value}</Text>
            </View>
          ))}
        </View>
        {secondHalf.length !== 0 && (
          <View>
            {secondHalf.map(({ label, value }) => (
              <View key={label} style={{ flexDirection: "row" }}>
                {isDetailedView && (
                  <Text style={theme.fonts.bodyMedium}>{label}: </Text>
                )}
                <Text style={theme.fonts.bodyMedium}>{value}</Text>
              </View>
            ))}
          </View>
        )}
      </Card.Content>
    </Card>
  );
};

export default HiveCard;
