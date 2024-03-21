import { useNavigation } from "expo-router";
import { Dimensions, Platform, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import { observer, MobXProviderContext } from "mobx-react";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
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
import { HorizontalSpacer, VerticalSpacer } from "@/components/Spacers";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { LineChart } from "react-native-chart-kit";
import SensorGraph from "@/components/sensor/SensorGraph";
import {
  beeCountSensorData,
  humiditySensorData,
  temperatureSensorData,
  weightSensorData,
  weightSensorDataExpanded,
} from "@/data/sensorData";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import AddNoteToHiveModal from "@/components/modals/AddNoteToHiveModal";
import HiveNotes from "@/components/hive/HiveNotes";
import { HiveNote } from "@/models/note";
import ModifyNoteModal from "@/components/modals/ModifyNoteModal";
import { ScreenWidth } from "@/constants/Dimensions";
import HistoricalSensorModal from "@/components/modals/HistoricalSensorModal";
import { SensorDataList } from "@/models/sensor";

type RootStackParamList = {
  hive: {
    hiveId: string;
  };
};

type HiveScreenProps = {
  route: RouteProp<RootStackParamList, "hive">;
  navigation: StackNavigationProp<RootStackParamList, "hive">;
};

// TODO Add queen bee display.
const HiveScreen = (params: HiveScreenProps) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { userViewModel } = useContext(MobXProviderContext);
  const { hiveViewModel } = useContext(MobXProviderContext);
  const hiveId = params.route.params.hiveId;
  const selectedHive = hiveViewModel.getSelectedHive();

  const [data, setData] = useState("");
  const [forecast, setForecast] = useState<WeeklySimpleForecast>();
  const [isLoadingScreen, setLoadingScreen] = useState(false);
  const [historicalSensorData, setHistoricalSensorData] =
    useState<SensorDataList>();
  const [addNoteToHiveModalVisible, setAddNoteToHiveModalVisible] =
    useState(false);
  const bottomSheetAddNoteToHiveModalRef = useRef<BottomSheetModal>(null);
  const [modifyNoteModalVisible, setModifyNoteModalVisible] = useState(false);
  const bottomSheetModifyNoteModalRef = useRef<BottomSheetModal>(null);
  const [historicalSensorModalVisible, setHistoricalSensorModalVisible] =
    useState(false);
  const bottomSheetHistoricalSensorModalRef = useRef<BottomSheetModal>(null);

  const handleAddNoteToHiveModalSheetPressOpen = useCallback(() => {
    bottomSheetAddNoteToHiveModalRef.current?.present();
  }, []);

  const handleAddNoteToHiveModalSheetPressClose = useCallback(() => {
    bottomSheetAddNoteToHiveModalRef.current?.dismiss();
  }, []);

  const handleOpenAddNoteToHiveModal = () => {
    if (Platform.OS === "android" || Platform.OS === "ios") {
      handleAddNoteToHiveModalSheetPressOpen();
    } else {
      setAddNoteToHiveModalVisible(true);
    }
  };

  const handleCloseAddNoteToHiveModal = () => {
    if (Platform.OS === "android" || Platform.OS === "ios") {
      handleAddNoteToHiveModalSheetPressClose();
    } else {
      setAddNoteToHiveModalVisible(false);
    }
  };

  const handleModifyNoteModalSheetPressOpen = useCallback(() => {
    bottomSheetModifyNoteModalRef.current?.present();
  }, []);

  const handleModifyNoteModalSheetPressClose = useCallback(() => {
    bottomSheetModifyNoteModalRef.current?.dismiss();
  }, []);

  const handleOpenModifyNoteModal = () => {
    if (Platform.OS === "android" || Platform.OS === "ios") {
      handleModifyNoteModalSheetPressOpen();
    } else {
      setModifyNoteModalVisible(true);
    }
  };

  const handleCloseModifyNoteModal = () => {
    if (Platform.OS === "android" || Platform.OS === "ios") {
      handleModifyNoteModalSheetPressClose();
    } else {
      setModifyNoteModalVisible(false);
    }
  };

  const handleHistoricalSensorModalSheetPressOpen = useCallback(() => {
    bottomSheetHistoricalSensorModalRef.current?.present();
  }, []);

  const handleHistoricalSensorModalSheetPressClose = useCallback(() => {
    bottomSheetHistoricalSensorModalRef.current?.dismiss();
  }, []);

  const handleOpenHistoricalSensorModal = () => {
    // TODO DB - Swap out dummy data with full sensor history. Might be worth adding a parameter here
    // to specify which sensor ID to retrieve from.
    setHistoricalSensorData(weightSensorDataExpanded);

    if (Platform.OS === "android" || Platform.OS === "ios") {
      handleHistoricalSensorModalSheetPressOpen();
    } else {
      setHistoricalSensorModalVisible(true);
    }
  };

  const handleCloseHistoricalSensorModal = () => {
    if (Platform.OS === "android" || Platform.OS === "ios") {
      handleHistoricalSensorModalSheetPressClose();
    } else {
      setHistoricalSensorModalVisible(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingScreen(true);
        const data = await fetchWeatherForecast(selectedHive.latLng);

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

  // TODO Test. Consider refactoring to domain layer.
  // Sorting the notes so that the stickied notes appear on the top. Additionally, sorts based on timestamp
  // from newest first.
  const sortNotes = (notes: HiveNote[]) => {
    return notes?.sort((a: HiveNote, b: HiveNote) => {
      if (Number(b.isSticky) - Number(a.isSticky) !== 0) {
        return Number(b.isSticky) - Number(a.isSticky);
      }
      return b.timestamp.getTime() - a.timestamp.getTime();
    });
  };

  return (
    <SafeAreaView style={styles(theme).container}>
      <StatusBarCustom />
      <TopBar
        navigation={navigation}
        canOpenDrawer={!!navigation.openDrawer}
        title={`${userViewModel.i18n.t("hive")} ${hiveId}`}
        trailingIcons={[
          <TouchableOpacity onPress={handleOpenAddNoteToHiveModal}>
            <MaterialCommunityIcons
              style={styles(theme).trailingIcon}
              name="pencil"
            />
          </TouchableOpacity>,
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
            {Dimensions.get("window").width >= ScreenWidth.Expanded ? (
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  {forecast ? (
                    <>
                      <Text style={theme.fonts.titleLarge}>
                        {userViewModel.i18n.t("forecast")}
                      </Text>
                      <Text style={theme.fonts.bodyLarge}>
                        Hive ID: {hiveId}
                      </Text>
                      <Text style={theme.fonts.bodySmall}>{data}</Text>
                      <Text style={theme.fonts.bodySmall}>
                        {selectedHive.name}
                      </Text>
                      <VerticalSpacer size={8} />
                      <ForecastSummary
                        forecast={forecast}
                        locale={userViewModel.i18n.locale}
                        temperatureFormat={userViewModel.temperaturePreference}
                        precipitationFormat={
                          userViewModel.precipitationPreference
                        }
                        windFormat={userViewModel.windSpeedPreference}
                        onPress={() => {
                          navigation.navigate("/hive/forecast", {
                            hiveId: hiveId,
                          });
                        }}
                      />
                    </>
                  ) : null}
                  {/* 
                  TODO DB - Fetch sensor data from DB. Possibly the last 12 readings. Note that there's a 
                  chart for each individual sensor.
                  Add (if sensor exists) sections for showing charts.
                  */}
                  <VerticalSpacer size={8} />
                  <Text style={theme.fonts.titleLarge}>
                    {userViewModel.i18n.t("weight")}
                  </Text>
                  <VerticalSpacer size={8} />
                  <SensorGraph
                    sensorDataList={weightSensorData}
                    isDecimal={true}
                    colourScheme="blue"
                    onClick={handleOpenHistoricalSensorModal}
                  />
                  <VerticalSpacer size={8} />
                  <Text style={theme.fonts.titleLarge}>
                    {userViewModel.i18n.t("temperature")}
                  </Text>
                  <VerticalSpacer size={8} />
                  <SensorGraph
                    sensorDataList={temperatureSensorData}
                    isDecimal={true}
                    colourScheme="orange"
                    onClick={handleOpenHistoricalSensorModal}
                  />
                  <VerticalSpacer size={8} />
                  <Text style={theme.fonts.titleLarge}>
                    {userViewModel.i18n.t("humidity")}
                  </Text>
                  <VerticalSpacer size={8} />
                  <SensorGraph
                    sensorDataList={humiditySensorData}
                    isDecimal={true}
                    colourScheme="green"
                    onClick={handleOpenHistoricalSensorModal}
                  />
                  <VerticalSpacer size={8} />
                  <Text style={theme.fonts.titleLarge}>
                    {userViewModel.i18n.t("bee count")}
                  </Text>
                  <VerticalSpacer size={8} />
                  <SensorGraph
                    sensorDataList={beeCountSensorData}
                    colourScheme="violet"
                    onClick={handleOpenHistoricalSensorModal}
                  />
                </View>
                <HorizontalSpacer size={20} />
                <View style={{ flex: 1 }}>
                  <Text style={theme.fonts.titleLarge}>
                    {userViewModel.i18n.t("location")}
                  </Text>
                  <VerticalSpacer size={8} />
                  <View
                    style={{
                      height: 100,
                      backgroundColor: "red",
                      borderRadius: 16,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={theme.fonts.bodyLarge}>
                      Map component here
                    </Text>
                    <Text style={theme.fonts.bodyLarge}>
                      Lat: {selectedHive.latLng.lat}, Lng:{" "}
                      {selectedHive.latLng.lng}
                    </Text>
                  </View>
                  <VerticalSpacer size={8} />
                  <Text style={theme.fonts.titleLarge}>
                    {userViewModel.i18n.t("notes")}
                  </Text>
                  <VerticalSpacer size={8} />
                  <HiveNotes
                    notes={hiveViewModel.selectedHive.notes}
                    sortNotes={sortNotes}
                    onPress={() => handleOpenModifyNoteModal()}
                  />
                </View>
              </View>
            ) : (
              <View>
                {forecast ? (
                  <>
                    <VerticalSpacer size={8} />
                    <ForecastSummary
                      forecast={forecast}
                      locale={userViewModel.i18n.locale}
                      temperatureFormat={userViewModel.temperaturePreference}
                      precipitationFormat={
                        userViewModel.precipitationPreference
                      }
                      windFormat={userViewModel.windSpeedPreference}
                      onPress={() => {
                        navigation.navigate("/hive/forecast", {
                          hiveId: hiveId,
                        });
                      }}
                    />
                  </>
                ) : null}
                {/* TODO DB - Fetch sensor data from db and if tests render components if hive sensor exists */}
                <VerticalSpacer size={8} />
                <Text style={theme.fonts.titleLarge}>
                  {userViewModel.i18n.t("weight")}
                </Text>
                <VerticalSpacer size={8} />
                <SensorGraph
                  sensorDataList={weightSensorData}
                  isDecimal={true}
                  colourScheme="blue"
                  onClick={handleOpenHistoricalSensorModal}
                />
                <VerticalSpacer size={8} />
                <Text style={theme.fonts.titleLarge}>
                  {userViewModel.i18n.t("temperature")}
                </Text>
                <VerticalSpacer size={8} />
                <SensorGraph
                  sensorDataList={temperatureSensorData}
                  isDecimal={true}
                  colourScheme="orange"
                  onClick={handleOpenHistoricalSensorModal}
                />
                <VerticalSpacer size={8} />
                <Text style={theme.fonts.titleLarge}>
                  {userViewModel.i18n.t("humidity")}
                </Text>
                <VerticalSpacer size={8} />
                <SensorGraph
                  sensorDataList={humiditySensorData}
                  isDecimal={true}
                  colourScheme="green"
                  onClick={handleOpenHistoricalSensorModal}
                />
                <VerticalSpacer size={8} />
                <Text style={theme.fonts.titleLarge}>
                  {userViewModel.i18n.t("bee count")}
                </Text>
                <VerticalSpacer size={8} />
                <SensorGraph
                  sensorDataList={beeCountSensorData}
                  colourScheme="violet"
                  onClick={handleOpenHistoricalSensorModal}
                />
                <VerticalSpacer size={8} />
                <Text style={theme.fonts.titleLarge}>
                  {userViewModel.i18n.t("location")}
                </Text>
                <VerticalSpacer size={8} />
                {/* TODO - Implement map component. */}
                <View
                  style={{
                    height: 100,
                    backgroundColor: "red",
                    borderRadius: 16,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={theme.fonts.bodyLarge}>Map component here</Text>
                  <Text style={theme.fonts.bodyLarge}>
                    Lat: {selectedHive.latLng.lat}, Lng:{" "}
                    {selectedHive.latLng.lng}
                  </Text>
                </View>
                <VerticalSpacer size={8} />
                <Text style={theme.fonts.titleLarge}>
                  {userViewModel.i18n.t("notes")}
                </Text>
                <VerticalSpacer size={8} />
                <HiveNotes
                  notes={hiveViewModel.selectedHive.notes}
                  sortNotes={sortNotes}
                  onPress={() => handleOpenModifyNoteModal()}
                />
              </View>
            )}
          </View>
        </ScrollView>
      )}
      <AddNoteToHiveModal
        isOverlayModalVisible={addNoteToHiveModalVisible}
        bottomSheetModalRef={bottomSheetAddNoteToHiveModalRef}
        onClose={() => handleCloseAddNoteToHiveModal()}
        onAddNote={sortNotes}
      />
      <ModifyNoteModal
        isOverlayModalVisible={modifyNoteModalVisible}
        bottomSheetModalRef={bottomSheetModifyNoteModalRef}
        onClose={() => handleCloseModifyNoteModal()}
        onModifyNote={sortNotes}
      />
      <HistoricalSensorModal
        isOverlayModalVisible={historicalSensorModalVisible}
        bottomSheetModalRef={bottomSheetHistoricalSensorModalRef}
        onClose={() => handleCloseHistoricalSensorModal()}
        sensorData={historicalSensorData}
      />
    </SafeAreaView>
  );
};

export default observer(HiveScreen);
