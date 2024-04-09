import { useNavigation } from "expo-router";
import {
  Dimensions,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { observer, MobXProviderContext } from "mobx-react";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { RouteProp, useIsFocused } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTheme, Text, Button, TextInput, Divider } from "react-native-paper";
import styles from "@/assets/styles";
import TopBar from "@/components/TopBar";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarCustom from "@/components/StatusBarCustom";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import AddHiveModal from "@/components/modals/AddHiveModal";
import AddFiltersToHiveModal from "@/components/modals/AddFiltersToHiveModal";
import RepositionHiveModal from "@/components/modals/RepositionHiveModal";
import { HorizontalSpacer, VerticalSpacer } from "@/components/Spacers";
import RegisterSensorModal from "@/components/modals/RegisterSensorModal";
import DialogDeleteHive from "@/components/modals/DialogDeleteHive";
import NotificationSettingsComponent from "@/components/NotificationSettings";
import LoadingScreen from "@/components/LoadingScreen";
import Toast from "react-native-toast-message";
import { toastCrossPlatform } from "@/components/ToastCustom";
import { isValidString } from "@/domain/validation/stringValidation";
import { ScreenWidth } from "@/constants/Dimensions";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import NotificationInfoModal from "@/components/modals/NotificationInfoModal";
import FileDownloader from "@/components/FileDownloader";

// TODO Add queen bee customisation.
const HiveSettingsScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { userViewModel } = useContext(MobXProviderContext);
  const { hiveViewModel } = useContext(MobXProviderContext);
  const hiveId = hiveViewModel.getSelectedHive().id;
  const selectedHive = hiveViewModel.getSelectedHive();
  const [isLoadingScreen, setLoadingScreen] = useState(false);
  const [notificationInfoModalVisible, setNotificationInfoModalVisible] =
    useState(false);
  const [addFiltersToHiveModalVisible, setAddFiltersToHiveModalVisible] =
    useState(false);
  const bottomSheetAddFiltersToHiveModalRef = useRef<BottomSheetModal>(null);
  const [repositionHiveModalVisible, setRepositionHiveModalVisible] =
    useState(false);
  const bottomSheetRepositionHiveModalRef = useRef<BottomSheetModal>(null);
  const [registerSensorModalVisible, setRegisterSensorModalVisible] =
    useState(false);
  const bottomSheetRegisterSensorModalRef = useRef<BottomSheetModal>(null);
  const [newHiveName, setNewHiveName] = useState(selectedHive.name);
  const [isNameValid, setIsNameValid] = useState<boolean>(true);
  const [nameErrorMessage, setNameErrorMessage] = useState<string>("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const createJSON = (): string => {
    // TODO Swap out sensor data with real data.
    const jsonData = JSON.stringify(
      [
        {
          name: selectedHive.name,
          latLng: {
            lat: selectedHive.latLng.lat,
            lng: selectedHive.latLng.lng,
          },
          notes: selectedHive.notes,
          queen: selectedHive.queen,
          sensors: {
            weight: [],
            temperature: [],
            humidity: [],
            count: [],
          },
        },
      ],
      null,
      2
    );

    return jsonData;
  };

  const handleRepositionHiveModalSheetPressOpen = useCallback(() => {
    bottomSheetRepositionHiveModalRef.current?.present();
  }, []);

  const handleRepositionHiveModalSheetPressClose = useCallback(() => {
    bottomSheetRepositionHiveModalRef.current?.dismiss();
  }, []);

  const handleOpenRepositionHiveModal = () => {
    setRepositionHiveModalVisible(true);
  };

  const handleCloseRepositionHiveModal = () => {
    setRepositionHiveModalVisible(false);
  };

  const handleAddFiltersToHiveModalSheetPressOpen = useCallback(() => {
    bottomSheetAddFiltersToHiveModalRef.current?.present();
  }, []);

  const handleAddFilterToHiveModalSheetPressClose = useCallback(() => {
    bottomSheetAddFiltersToHiveModalRef.current?.dismiss();
  }, []);

  const handleOpenAddFiltersToHiveModal = () => {
    if (Platform.OS === "android" || Platform.OS === "ios") {
      handleAddFiltersToHiveModalSheetPressOpen();
    } else {
      setAddFiltersToHiveModalVisible(true);
    }
  };

  const handleCloseAddFiltersToHiveModal = () => {
    if (Platform.OS === "android" || Platform.OS === "ios") {
      handleAddFilterToHiveModalSheetPressClose();
    } else {
      setAddFiltersToHiveModalVisible(false);
    }
  };

  const handleRegisterSensorModalSheetPressOpen = useCallback(() => {
    bottomSheetRegisterSensorModalRef.current?.present();
  }, []);

  const handleRegisterSensorModalSheetPressClose = useCallback(() => {
    bottomSheetRegisterSensorModalRef.current?.dismiss();
  }, []);

  const handleOpenRegisterSensorModal = () => {
    if (Platform.OS === "android" || Platform.OS === "ios") {
      handleRegisterSensorModalSheetPressOpen();
    } else {
      setRegisterSensorModalVisible(true);
    }
  };

  const handleCloseRegisterSensorModal = () => {
    if (Platform.OS === "android" || Platform.OS === "ios") {
      handleRegisterSensorModalSheetPressClose();
    } else {
      setRegisterSensorModalVisible(false);
    }
  };

  const handleDeleteButtonPress = () => {
    setShowDeleteDialog(true);
  };

  const hideDeleteDialog = () => {
    setShowDeleteDialog(false);
  };

  const handleDeleteHive = () => {
    const deletedHiveName: string = selectedHive.name;
    hideDeleteDialog();
    hiveViewModel.removeHive(selectedHive.id);
    navigation.navigate("index");

    Toast.show(
      toastCrossPlatform({
        title: userViewModel.i18n.t("success"),
        text: userViewModel.i18n.t("toast_deleted_hive", {
          deletedHiveName: deletedHiveName,
        }),
        type: "success",
      })
    );
  };

  const handleModifyName = (input: string) => {
    setNewHiveName(input);

    if (isValidString(input, 1, 64)) {
      setIsNameValid(true);
    } else {
      setIsNameValid(false);
    }
  };

  const handleUpdateName = (name: string) => {
    if (isNameValid) {
      const updatedHive = { ...selectedHive };
      updatedHive.name = name;

      hiveViewModel.updateHive(updatedHive);
      hiveViewModel.addSelectedHive(updatedHive);
      console.log("changed hive name" + hiveViewModel.getSelectedHive().name);

      Toast.show(
        toastCrossPlatform({
          title: userViewModel.i18n.t("success"),
          text: userViewModel.i18n.t("toast_renamed_hive", {
            name: name,
          }),
          type: "success",
        })
      );
    } else {
      setNameErrorMessage(userViewModel.i18n.t("invalid hive name"));
    }
  };

  return (
    <SafeAreaView style={styles(theme).container}>
      <StatusBarCustom />
      <TopBar
        navigation={navigation}
        canOpenDrawer={!!navigation.openDrawer}
        title={userViewModel.i18n.t("settings")}
      />
      {isLoadingScreen ? (
        <LoadingScreen />
      ) : (
        <ScrollView>
          <View style={styles(theme).main}>
            <Text
              style={{
                ...theme.fonts.headlineSmall,
                textAlign: "center",
                padding: 1,
              }}
            >
              {userViewModel.i18n.t("hive name")}
            </Text>

            <View
              style={{
                flexDirection:
                  Dimensions.get("window").width <= ScreenWidth.Compact
                    ? "column"
                    : "row",
                alignItems: "center",
              }}
            >
              <TextInput
                label={
                  newHiveName.length > 64
                    ? userViewModel.i18n.t("too many characters")
                    : userViewModel.i18n.t("rename hive") +
                      (newHiveName.length >= 32
                        ? userViewModel.i18n.t("characters_remaining", {
                            character: 64 - newHiveName.length,
                          })
                        : "")
                }
                value={newHiveName}
                onChangeText={(value) => handleModifyName(value)}
                mode="outlined"
                error={!isNameValid}
                style={{
                  flex:
                    Dimensions.get("window").width <= ScreenWidth.Compact
                      ? undefined
                      : 3,
                  backgroundColor: theme.colors.primaryContainer,
                  width: "100%",
                }}
              />
              {Dimensions.get("window").width <= ScreenWidth.Compact ? (
                <VerticalSpacer size={12} />
              ) : (
                <HorizontalSpacer size={12} />
              )}
              <Button
                icon="pencil"
                mode="contained"
                onPress={() => handleUpdateName(newHiveName)}
                style={{
                  flex:
                    Dimensions.get("window").width <= ScreenWidth.Compact
                      ? undefined
                      : 1,
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                {userViewModel.i18n.t("rename")}
              </Button>
            </View>

            {nameErrorMessage ? (
              <>
                <VerticalSpacer size={12} />
                <Text
                  style={{
                    ...theme.fonts.bodyLarge,
                    flex: 1,
                    textAlign: "center",
                    color: theme.colors.error,
                  }}
                >
                  {nameErrorMessage}
                </Text>
              </>
            ) : null}

            <VerticalSpacer size={12} />
            <Divider style={{ backgroundColor: theme.colors.outline }} />
            <VerticalSpacer size={8} />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: 1,
              }}
            >
              <Text
                style={{
                  ...theme.fonts.headlineSmall,
                  textAlign: "center",
                  padding: 1,
                }}
              >
                {userViewModel.i18n.t("notification types")}
              </Text>

              <TouchableOpacity
                onPress={() => setNotificationInfoModalVisible(true)}
                style={{ marginLeft: 8 }}
              >
                <MaterialCommunityIcons
                  style={styles(theme).trailingIcon}
                  name="information-outline"
                  size={24}
                />
              </TouchableOpacity>
            </View>
            <VerticalSpacer size={8} />

            <NotificationSettingsComponent hiveId={hiveId} />

            <VerticalSpacer size={12} />
            <Divider style={{ backgroundColor: theme.colors.outline }} />
            <VerticalSpacer size={8} />

            <Text
              style={{
                ...theme.fonts.headlineSmall,
                textAlign: "center",
                padding: 1,
              }}
            >
              {userViewModel.i18n.t("additional functionality")}
            </Text>
            <VerticalSpacer size={8} />

            <Button
              icon="pencil"
              mode="contained"
              onPress={handleOpenAddFiltersToHiveModal}
            >
              {userViewModel.i18n.t("modify hive filters")}
            </Button>
            <VerticalSpacer size={8} />
            <Button
              icon="map-marker"
              mode="contained"
              onPress={handleOpenRepositionHiveModal}
            >
              {userViewModel.i18n.t("reposition hive")}
            </Button>
            <VerticalSpacer size={8} />
            <Button
              icon="remote"
              mode="contained"
              onPress={handleOpenRegisterSensorModal}
            >
              {userViewModel.i18n.t("manage sensors")}
            </Button>
            <VerticalSpacer size={8} />
            <FileDownloader
              jsonString={createJSON()}
              fileName="hive_historical_data.json"
              buttonLabel={userViewModel.i18n.t("download hive data")}
            />
            <VerticalSpacer size={20} />
            <Button
              icon="delete"
              mode="contained"
              onPress={handleDeleteButtonPress}
              style={{ backgroundColor: theme.colors.error }}
            >
              {userViewModel.i18n.t("delete hive")}
            </Button>
          </View>
        </ScrollView>
      )}
      <AddFiltersToHiveModal
        isOverlayModalVisible={addFiltersToHiveModalVisible}
        bottomSheetModalRef={bottomSheetAddFiltersToHiveModalRef}
        onClose={() => handleCloseAddFiltersToHiveModal()}
      />
      <RepositionHiveModal
        isOverlayModalVisible={repositionHiveModalVisible}
        bottomSheetModalRef={bottomSheetRepositionHiveModalRef}
        onClose={() => handleCloseRepositionHiveModal()}
      />
      <RegisterSensorModal
        isOverlayModalVisible={registerSensorModalVisible}
        bottomSheetModalRef={bottomSheetRegisterSensorModalRef}
        onClose={() => handleCloseRegisterSensorModal()}
      />
      {showDeleteDialog ? (
        <DialogDeleteHive
          hideDialog={hideDeleteDialog}
          deleteHive={handleDeleteHive}
        />
      ) : null}
      <NotificationInfoModal
        isOverlayModalVisible={notificationInfoModalVisible}
        onClose={() => setNotificationInfoModalVisible(false)}
      />
    </SafeAreaView>
  );
};

export default observer(HiveSettingsScreen);
