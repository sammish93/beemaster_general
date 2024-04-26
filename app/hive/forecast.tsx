import { useNavigation } from "expo-router";
import { ScrollView, View } from "react-native";
import { observer, MobXProviderContext } from "mobx-react";
import { useContext, useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { RouteProp, useIsFocused } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import styles from "@/assets/styles";
import { useTheme, Text, Button } from "react-native-paper";
import TopBar from "@/components/TopBar";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarCustom from "@/components/StatusBarCustom";
import { fetchWeatherForecast } from "@/data/api/weatherApi";
import {
  calculateDailyRainfall,
  deserialiseDailyForecast,
  deserialiseWeeklyDetailedForecast,
  deserialiseWeeklySimpleForecast,
  getForecastDateFormat,
} from "@/domain/weatherForecastDeserialiser";
import getWindDirectionIconFromAngle from "@/domain/windDirectionMapper";
import {
  PrecipitationMeasurement,
  TemperatureMeasurement,
  WindSpeedMeasurement,
} from "@/constants/Measurements";
import Toast from "react-native-toast-message";
import { toastCrossPlatform } from "@/components/ToastCustom";
import LoadingScreen from "@/components/LoadingScreen";
import {
  WeeklyDetailedForecast,
  WeeklySimpleForecast,
} from "@/models/forecast";
import ForecastSummary from "@/components/forecast/ForecastSummary";
import "@/assets/customScrollbar.css";
import DetailedForecast from "@/components/forecast/DetailedForecast";
import { VerticalSpacer } from "@/components/Spacers";

const HiveForecastScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { userViewModel } = useContext(MobXProviderContext);
  const { hiveViewModel } = useContext(MobXProviderContext);
  const hiveId = hiveViewModel.getSelectedHive().id;
  const selectedHive = hiveViewModel.getSelectedHive();

  const [detailedForecast, setDetailedForecast] =
    useState<WeeklyDetailedForecast>();
  const [isLoadingScreen, setLoadingScreen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingScreen(true);
        const data = await fetchWeatherForecast(selectedHive.latLng);

        const weeklyDetailedForecast = deserialiseWeeklyDetailedForecast(
          data,
          userViewModel.temperaturePreference,
          userViewModel.precipitationPreference,
          userViewModel.windSpeedPreference
        );

        const rainfall = calculateDailyRainfall(data, getForecastDateFormat(2));
        setDetailedForecast(weeklyDetailedForecast);
      } catch (error) {
        setData("Error retrieving data");
        Toast.show(
          toastCrossPlatform({
            title: userViewModel.i18n.t("error"),
            text: userViewModel.i18n.t("toast error retrieving forecast"),
            type: "error",
          })
        );
      } finally {
        setLoadingScreen(false);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles(theme).container}>
      <StatusBarCustom />
      <TopBar
        navigation={navigation}
        canOpenDrawer={!!navigation.openDrawer}
        title={userViewModel.i18n.t("detailed forecast")}
      />
      {isLoadingScreen ? (
        <LoadingScreen />
      ) : (
        <ScrollView>
          <View style={styles(theme).main}>
            <Text style={theme.fonts.titleLarge}>Hive Forecast</Text>
            {detailedForecast ? (
              <>
                <VerticalSpacer size={8} />
                <DetailedForecast
                  forecast={detailedForecast}
                  locale={userViewModel.i18n.locale}
                  temperatureFormat={userViewModel.temperaturePreference}
                  precipitationFormat={userViewModel.precipitationPreference}
                  windFormat={userViewModel.windSpeedPreference}
                />
              </>
            ) : null}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default observer(HiveForecastScreen);
