import { HiveModel } from "@/models/hiveModel";
import { View } from "react-native";
import { useTheme, Text } from "react-native-paper";

interface HiveInfoProps {
  item: HiveModel;
  isDetailedView: boolean;
}

const HiveInfo = ({ item, isDetailedView }: HiveInfoProps) => {
  const theme = useTheme();

  // Temporary solution.
  const data = [
    { label: "Weather", value: "Sunny" },
    { label: "Wind", value: `4 km/h` },
    { label: "Temperature", value: `21 °C` },
    { label: "Rain", value: `0.0mm 0%` },
    { label: "Weight", value: `57.6 kg` },
    { label: "Hive Temp", value: `34.2 °C` },
    { label: "Humidity", value: `54%` },
    { label: "Counter", value: "421 p/h" },
  ];

  const filteredData = isDetailedView
    ? data
    : data.filter(
        ({ label }) =>
          label === "Temperature" || label === "Wind" || label === "Rain"
      );

  const mid = data.length / 2;
  const firstHalf = filteredData.slice(0, mid);
  const secondHalf = filteredData.slice(mid);

  return (
    <>
      <Text style={theme.fonts.titleMedium}>{item.name}</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          gap: isDetailedView ? 30 : 0,
          padding: isDetailedView ? 8 : 4,
        }}
      >
        <View style={{ flex: 1 }}>
          {firstHalf.map(({ label, value }) => (
            <View key={label} style={{ flexDirection: "row", margin: 5 }}>
              {isDetailedView && (
                <Text style={theme.fonts.bodyLarge}>{label}: </Text>
              )}
              <Text style={theme.fonts.bodyLarge}>{value}</Text>
            </View>
          ))}
        </View>
        {secondHalf.length !== 0 && (
          <View style={{ flex: 1 }}>
            {secondHalf.map(({ label, value }) => (
              <View key={label} style={{ flexDirection: "row", margin: 5 }}>
                {isDetailedView && (
                  <Text style={theme.fonts.bodyLarge}>{label}: </Text>
                )}
                <Text style={theme.fonts.bodyLarge}>{value}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </>
  );
};

export default HiveInfo;
