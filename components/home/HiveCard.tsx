import React, { useContext } from "react";
import { HiveModel } from "@/models/hiveModel";
import { View, Image } from "react-native";
import { useTheme, Text, Card, Icon } from "react-native-paper";
import { sensorData } from "@/data/hiveData";
import getWeatherTypeIconFromString from "@/domain/weatherIconMapper";
import { MobXProviderContext } from "mobx-react";

// Assures that only the string "100%" can be passed.
type maxWidthString = "100%";

interface HiveCardProps {
  item: HiveModel;
  isDetailedView: boolean;
  onPress: () => void;
  maxWidth: number | maxWidthString;
}

const HiveCard = ({
  item,
  isDetailedView,
  onPress,
  maxWidth,
}: HiveCardProps) => {
  const { userViewModel } = useContext(MobXProviderContext);
  const theme = useTheme();

  const filterOnLabel = (
    ...list: string[]
  ): {
    label: string;
    icon?: string;
    weatherIcon?: string;
    value: string;
  }[] => {
    return sensorData.filter(({ label }) => list.includes(label));
  };

  //TODO Swap out with real data. Add temp/weight/precipitation/wind preference to <Text>
  const filteredData = isDetailedView
    ? sensorData
    : filterOnLabel("Weather", "Temperature", "Wind", "Rain");
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
        <View style={{ flex: 1 }}>
          {" "}
          {/* Adjusted to ensure content is within bounds */}
          {firstHalf.map(({ label, icon, weatherIcon, value }) => (
            <View
              key={label}
              style={{ flexDirection: "row", flex: 1, alignItems: "center" }}
            >
              {icon && (
                <Icon
                  source={icon}
                  size={18}
                  color={theme.colors.onSurfaceVariant}
                />
              )}
              {weatherIcon && (
                <>
                  <Image
                    source={getWeatherTypeIconFromString(weatherIcon)}
                    style={{ width: 24, height: 24 }}
                  />
                  <Text
                    style={[
                      theme.fonts.bodyMedium,
                      { flexShrink: 1, marginRight: 4 },
                    ]}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {userViewModel.i18n.t(weatherIcon)}
                  </Text>
                </>
              )}
              <Text
                style={[theme.fonts.bodyMedium, { flexShrink: 1 }]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {value}
              </Text>
            </View>
          ))}
        </View>
        {secondHalf.length !== 0 && (
          <View style={{ flex: 1 }}>
            {secondHalf.map(({ label, icon, weatherIcon, value }) => (
              <View
                key={label}
                style={{ flexDirection: "row", flex: 1, alignItems: "center" }}
              >
                {icon && (
                  <Icon
                    source={icon}
                    size={18}
                    color={theme.colors.onSurfaceVariant}
                  />
                )}
                {weatherIcon && (
                  <Image
                    source={getWeatherTypeIconFromString(weatherIcon)}
                    style={{ width: 24, height: 24 }}
                  />
                )}
                <Text
                  style={[theme.fonts.bodyMedium, { flexShrink: 1 }]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {value}
                </Text>
              </View>
            ))}
          </View>
        )}
      </Card.Content>
    </Card>
  );
};

export default HiveCard;
