import { useNavigation } from "expo-router";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { observer, MobXProviderContext } from "mobx-react";
import { useContext, useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import styles from "@/assets/styles";
import { useTheme, Text, Button, Divider } from "react-native-paper";
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
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type RootStackParamList = {
  hive: {
    hiveId: string;
  };
};

type HiveScreenProps = {
  route: RouteProp<RootStackParamList, "hive">;
  navigation: StackNavigationProp<RootStackParamList, "hive">;
};

const HiveScreen = (params: HiveScreenProps) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { userViewModel } = useContext(MobXProviderContext);
  const { exampleViewModel } = useContext(MobXProviderContext);
  const hiveId = params.route.params.hiveId;

  const [data, setData] = useState("");
  const [forecast, setForecast] = useState<WeeklySimpleForecast>();
  const [isLoadingScreen, setLoadingScreen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingScreen(true);
        const data = await fetchWeatherForecast({ lat: 59.9139, lng: 10.7522 });

        const weeklySimplyForecast = deserialiseWeeklySimpleForecast(
          data,
          userViewModel.temperaturePreference,
          userViewModel.precipitationPreference,
          userViewModel.windSpeedPreference,
          true
        );

        const rainfall = calculateDailyRainfall(data, getForecastDateFormat(2));

        //setData(
        //  `Temperature in 2 days time at 18:00: ${thing.hourlyForecasts["18HundredHours"].temperature} °C, and the daily rainfall is: ${rainfall}mm.`
        //);

        setData("Retrieved forecast!");
        setForecast(weeklySimplyForecast);

        Toast.show(
          toastCrossPlatform({
            title: "Success!",
            text: "Click to go home",
            onPress: () => {
              navigation.navigate("../index");
            },
          })
        );
      } catch (error) {
        setData("Error retrieving data");
        Toast.show(
          toastCrossPlatform({
            title: "Error",
            text: "Could not retrieve the latest weather forecast.",
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
        title={`${userViewModel.i18n.t("hive")} ${hiveId}`}
        trailingIcons={[
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("/hive/settings", { hiveId: hiveId });
            }}
          >
            <MaterialCommunityIcons
              style={styles(theme).trailingIcon}
              name="cog"
            />
          </TouchableOpacity>,
        ]}
      />
      {isLoadingScreen ? (
        <LoadingScreen />
      ) : (
        <ScrollView>
          <View style={styles(theme).main}>
            <Text style={theme.fonts.titleLarge}>Hive Forecast</Text>
            <Text style={theme.fonts.bodyLarge}>Hive ID: {hiveId}</Text>
            <Text style={theme.fonts.bodySmall}>{data}</Text>
            {forecast ? (
              <>
                <VerticalSpacer size={8} />
                <ForecastSummary
                  forecast={forecast}
                  locale={userViewModel.i18n.locale}
                  temperatureFormat={userViewModel.temperaturePreference}
                  precipitationFormat={userViewModel.precipitationPreference}
                  windFormat={userViewModel.windSpeedPreference}
                  onPress={() => {
                    navigation.navigate("/hive/forecast", { hiveId: hiveId });
                  }}
                />
              </>
            ) : null}
            
            <Text style={theme.fonts.titleLarge}>Weight</Text>
            <Text style={theme.fonts.bodySmall}>Weight id: </Text>
            <Text style={theme.fonts.bodySmall}>Weight: </Text>
            
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default observer(HiveScreen);
