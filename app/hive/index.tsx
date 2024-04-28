import { useNavigation } from "expo-router";
import { Dimensions, Platform, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import { observer, MobXProviderContext } from "mobx-react";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { RouteProp, useIsFocused } from "@react-navigation/native";
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
import Map from "@/components/Map";
import { HiveModel } from "@/models/hiveModel";
import HomeInfoModal from "@/components/modals/HomeInfoModal";
import HiveInfoModal from "@/components/modals/HiveInfoModal";

// TODO Add queen bee display.
const HiveScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { userViewModel } = useContext(MobXProviderContext);
  const { hiveViewModel } = useContext(MobXProviderContext);
  const hiveId = hiveViewModel.getSelectedHive().id;
  const [selectedHive, setSelectedHive] = useState<HiveModel>(
    hiveViewModel.getSelectedHive()
  );
  const [notes, setNotes] = useState<HiveNote[]>([]);
  const [forecast, setForecast] = useState<WeeklySimpleForecast>();
  const [isLoadingScreen, setLoadingScreen] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
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

  const handleOpenHistoricalSensorModal = () => {
    // TODO DB - Swap out dummy data with full sensor history. Might be worth adding a parameter here
    // to specify which sensor ID to retrieve from.
    setHistoricalSensorData(hiveViewModel.weightSensorDataExpanded);
    setHistoricalSensorModalVisible(true);
  };

  const handleCloseHistoricalSensorModal = () => {
    setHistoricalSensorModalVisible(false);
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
        setForecast(weeklySimplyForecast);
      } catch (error) {
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

  useEffect(() => {
    if (isFocused && selectedHive) {
      hiveViewModel.fetchWeightDataForLast12Days(selectedHive.id);
      hiveViewModel.fetchWeightDataForLast30Days(selectedHive.id);
      hiveViewModel
        .fetchNotesForHive(selectedHive.id)
        .then(() => {
          console.log("Notes fetched for hive: ", selectedHive.id);
          setNotes([...hiveViewModel.getSelectedHive().notes]);
        })
        .catch((error) => {
          console.error("Failed to fetch notes: ", error);
        });
    }
  }, [selectedHive?.id, isFocused]);

  useEffect(() => {
    setSelectedHive(hiveViewModel.getSelectedHive());
  }, [isFocused]);
  useEffect(() => {
    if (selectedHive.id) {
      console.log("not pref Id : ", selectedHive.id);
      hiveViewModel.fetchNotificationPreferencesForHive(selectedHive.id);
    }
  }, [selectedHive.id]);

  // TODO Test. Consider refactoring to domain layer.
  // Sorting the notes so that the stickied notes appear on the top. Additionally, sorts based on timestamp
  // from newest first.
  const sortNotes = () => {
    hiveViewModel.sortNotes();

    setNotes(hiveViewModel.getSelectedHive().notes);
  };

  useEffect(() => {
    sortNotes();
  }, [notes]);

  return (
    <SafeAreaView style={styles(theme).container}>
      <StatusBarCustom />
      <TopBar
        navigation={navigation}
        canOpenDrawer={!!navigation.openDrawer}
        title={selectedHive.name}
        trailingIcons={[
          <TouchableOpacity onPress={() => setInfoModalVisible(true)}>
            <MaterialCommunityIcons
              style={styles(theme).trailingIcon}
              name="information-outline"
            />
          </TouchableOpacity>,
          <TouchableOpacity onPress={handleOpenAddNoteToHiveModal}>
            <MaterialCommunityIcons
              style={styles(theme).trailingIcon}
              name="pencil"
            />
          </TouchableOpacity>,
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("hive/settings");
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
                      <Text
                        style={{
                          ...theme.fonts.headlineSmall,
                          textAlign: "center",
                        }}
                      >
                        {userViewModel.i18n.t("forecast")}
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
                          navigation.navigate("hive/forecast");
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
                  <Text
                    style={{
                      ...theme.fonts.headlineSmall,
                      textAlign: "center",
                    }}
                  >
                    {userViewModel.i18n.t("weight")}
                  </Text>
                  <VerticalSpacer size={8} />
                  <SensorGraph
                    sensorDataList={hiveViewModel.sensorWeight}
                    isDecimal={true}
                    colourScheme="blue"
                    onClick={handleOpenHistoricalSensorModal}
                  />
                  <VerticalSpacer size={8} />
                  <Text
                    style={{
                      ...theme.fonts.headlineSmall,
                      textAlign: "center",
                    }}
                  >
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
                  <Text
                    style={{
                      ...theme.fonts.headlineSmall,
                      textAlign: "center",
                    }}
                  >
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
                  <Text
                    style={{
                      ...theme.fonts.headlineSmall,
                      textAlign: "center",
                    }}
                  >
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
                  <Text
                    style={{
                      ...theme.fonts.headlineSmall,
                      textAlign: "center",
                    }}
                  >
                    {userViewModel.i18n.t("location")}
                  </Text>
                  <VerticalSpacer size={8} />
                  {selectedHive.latLng.lat != null &&
                  selectedHive.latLng.lng != null ? (
                    <Map
                      lat={hiveViewModel.getSelectedHive().latLng.lat}
                      lng={hiveViewModel.getSelectedHive().latLng.lng}
                      height={200}
                    />
                  ) : (
                    <Text
                      style={{
                        ...theme.fonts.bodyLarge,
                        textAlign: "center",
                      }}
                    >
                      No location set
                    </Text>
                  )}
                  <VerticalSpacer size={8} />
                  <Text
                    style={{
                      ...theme.fonts.headlineSmall,
                      textAlign: "center",
                    }}
                  >
                    {userViewModel.i18n.t("notes")}
                  </Text>
                  <VerticalSpacer size={8} />
                  {notes.length > 0 ? (
                    <HiveNotes
                      notes={notes}
                      sortNotes={sortNotes}
                      onPress={() => handleOpenModifyNoteModal()}
                    />
                  ) : (
                    <Text
                      style={{ ...theme.fonts.bodyLarge, textAlign: "center" }}
                    >
                      {userViewModel.i18n.t("to create a new note")}
                    </Text>
                  )}
                </View>
              </View>
            ) : (
              <View>
                {forecast ? (
                  <>
                    <Text
                      style={{
                        ...theme.fonts.headlineSmall,
                        textAlign: "center",
                      }}
                    >
                      {userViewModel.i18n.t("forecast")}
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
                        navigation.navigate("hive/forecast");
                      }}
                    />
                  </>
                ) : null}
                {/* TODO DB - Fetch sensor data from db and if tests render components if hive sensor exists */}
                <VerticalSpacer size={8} />
                <Text
                  style={{ ...theme.fonts.headlineSmall, textAlign: "center" }}
                >
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
                <Text
                  style={{ ...theme.fonts.headlineSmall, textAlign: "center" }}
                >
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
                <Text
                  style={{ ...theme.fonts.headlineSmall, textAlign: "center" }}
                >
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
                <Text
                  style={{ ...theme.fonts.headlineSmall, textAlign: "center" }}
                >
                  {userViewModel.i18n.t("bee count")}
                </Text>
                <VerticalSpacer size={8} />
                <SensorGraph
                  sensorDataList={beeCountSensorData}
                  colourScheme="violet"
                  onClick={handleOpenHistoricalSensorModal}
                />
                <VerticalSpacer size={8} />
                <Text
                  style={{ ...theme.fonts.headlineSmall, textAlign: "center" }}
                >
                  {userViewModel.i18n.t("location")}
                </Text>
                <VerticalSpacer size={8} />
                {/* TODO - Implement map component. */}
                <Map
                  lat={hiveViewModel.getSelectedHive().latLng.lat}
                  lng={hiveViewModel.getSelectedHive().latLng.lng}
                  height={200}
                />
                <VerticalSpacer size={8} />
                <Text
                  style={{
                    ...theme.fonts.headlineSmall,
                    textAlign: "center",
                  }}
                >
                  {userViewModel.i18n.t("notes")}
                </Text>
                <VerticalSpacer size={8} />
                {notes.length > 0 ? (
                  <HiveNotes
                    notes={notes}
                    sortNotes={sortNotes}
                    onPress={() => handleOpenModifyNoteModal()}
                  />
                ) : (
                  <Text
                    style={{ ...theme.fonts.bodyLarge, textAlign: "center" }}
                  >
                    {userViewModel.i18n.t("to create a new note")}
                  </Text>
                )}
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
      <HiveInfoModal
        isOverlayModalVisible={infoModalVisible}
        onClose={() => setInfoModalVisible(false)}
      />
    </SafeAreaView>
  );
};

export default observer(HiveScreen);
