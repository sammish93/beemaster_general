import React, { useContext, useEffect, useState } from "react";
import { HiveModel } from "@/models/hiveModel";
import { View, Image } from "react-native";
import { useTheme, Text, Card, Icon } from "react-native-paper";
import { sensorData } from "@/data/hiveData";
import getWeatherTypeIconFromString from "@/domain/weatherIconMapper";
import { MobXProviderContext } from "mobx-react";
import { HorizontalSpacer } from "../Spacers";
import { CurrentForecast } from "@/models/forecast";
import { fetchWeatherForecast } from "@/data/api/weatherApi";
import { deserialiseCurrentForecast } from "@/domain/weatherForecastDeserialiser";
import Toast from "react-native-toast-message";
import { toastCrossPlatform } from "../ToastCustom";

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
  const [forecast, setForecast] = useState<CurrentForecast>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWeatherForecast(item.latLng);

        const currentForecast = deserialiseCurrentForecast(
          data,
          userViewModel.temperaturePreference,
          userViewModel.precipitationPreference,
          userViewModel.windSpeedPreference
        );

        setForecast(currentForecast);
      } catch (error) {
        Toast.show(
          toastCrossPlatform({
            title: userViewModel.i18n.t("error"),
            text: userViewModel.i18n.t("toast error retrieving forecast"),
            type: "error",
          })
        );
      }
    };

    fetchData();
  }, []);

  return (
    <Card onPress={onPress} style={{ margin: 4, flex: 1, maxWidth: maxWidth }}>
      <Card.Title title={item.name} titleStyle={{ alignSelf: "center" }} />
      <Card.Content style={{ flexDirection: "row" }}>
        <View
          style={{
            flexDirection: "column",
            flex: 1,
            alignItems: "center",
            width: "100%",
            justifyContent: "center",
          }}
        >
          {forecast?.currentForecast.weatherType && (
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                alignItems: "center",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <Image
                source={getWeatherTypeIconFromString(
                  forecast.currentForecast.weatherType
                )}
                style={{ width: 18, height: 18 }}
              />
              <HorizontalSpacer size={4} />
              <Text
                style={theme.fonts.bodyMedium}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {userViewModel.i18n.t(forecast.currentForecast.weatherType)}
              </Text>
            </View>
          )}

          <View
            style={{
              flexDirection: "row",
              flex: 1,
              alignItems: "center",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Icon
              source="weather-windy"
              size={18}
              color={theme.colors.onSurfaceVariant}
            />
            <HorizontalSpacer size={4} />
            <Text
              style={theme.fonts.bodyMedium}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {forecast?.currentForecast.windSpeed}{" "}
              {userViewModel.windSpeedPreference}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              flex: 1,
              alignItems: "center",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Icon
              source="thermometer"
              size={18}
              color={theme.colors.onSurfaceVariant}
            />
            <HorizontalSpacer size={4} />
            <Text
              style={theme.fonts.bodyMedium}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {forecast?.currentForecast.temperature}{" "}
              {userViewModel.temperaturePreference}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              flex: 1,
              alignItems: "center",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Icon
              source="water-outline"
              size={18}
              color={theme.colors.onSurfaceVariant}
            />
            <HorizontalSpacer size={4} />
            <Text
              style={theme.fonts.bodyMedium}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {forecast?.currentForecast.precipitation}{" "}
              {userViewModel.precipitationPreference}
            </Text>
          </View>
        </View>
        {isDetailedView ? (
          <View
            style={{
              flexDirection: "column",
              flex: 1,
              alignItems: "center",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                alignItems: "center",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <Icon
                source="weight"
                size={18}
                color={theme.colors.onSurfaceVariant}
              />
              <HorizontalSpacer size={4} />
              <Text
                style={theme.fonts.bodyMedium}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.weight
                  ? `${item.weight} ${userViewModel.weightPreference}`
                  : "N/A"}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                flex: 1,
                alignItems: "center",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <Icon
                source="home-thermometer"
                size={18}
                color={theme.colors.onSurfaceVariant}
              />
              <HorizontalSpacer size={4} />
              <Text
                style={theme.fonts.bodyMedium}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.temperature
                  ? `${item.temperature} ${userViewModel.temperaturePreference}`
                  : "N/A"}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                flex: 1,
                alignItems: "center",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <Icon
                source="air-humidifier"
                size={18}
                color={theme.colors.onSurfaceVariant}
              />
              <HorizontalSpacer size={4} />
              <Text
                style={theme.fonts.bodyMedium}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.humidity ? `${item.humidity} %` : "N/A"}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                flex: 1,
                alignItems: "center",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <Icon
                source="bee"
                size={18}
                color={theme.colors.onSurfaceVariant}
              />
              <HorizontalSpacer size={4} />
              <Text
                style={theme.fonts.bodyMedium}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.beeCount ? `${item.beeCount} p/m` : "N/A"}
              </Text>
            </View>
          </View>
        ) : null}
      </Card.Content>
    </Card>
  );
};

export default HiveCard;
