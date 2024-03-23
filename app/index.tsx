import { useNavigation } from "expo-router";
import { View, Platform, TouchableOpacity } from "react-native";
import { observer, MobXProviderContext } from "mobx-react";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useTheme, Text, Switch, Button, Chip } from "react-native-paper";
import TopBar from "@/components/TopBar";
import styles from "@/assets/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarCustom from "@/components/StatusBarCustom";
import { ScrollView } from "react-native-virtualized-view";
import HiveList from "@/components/hive/HiveList";
import AddHiveModal from "@/components/modals/AddHiveModal";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { HorizontalSpacer, VerticalSpacer } from "@/components/Spacers";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import HomeInfoModal from "@/components/modals/HomeInfoModal";
import AddFilterModal from "@/components/modals/AddFilterModal";
import { HiveModel } from "@/models/hiveModel";
import RemoveFilterModal from "@/components/modals/RemoveFilterModal";
import { startBackgroundTask } from "@/domain/tasks/notificationTask";

console.log("Starting backgroundtask...");
startBackgroundTask();

const HomeScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { userViewModel } = useContext(MobXProviderContext);
  const [removeFilterModalVisible, setRemoveFilterModalVisible] =
    useState(false);
  const bottomSheetRemoveFilterModalRef = useRef<BottomSheetModal>(null);
  const [addHiveModalVisible, setAddHiveModalVisible] = useState(false);
  const bottomSheetAddHiveModalRef = useRef<BottomSheetModal>(null);
  const [addFilterModalVisible, setAddFilterModalVisible] = useState(false);
  const bottomSheetAddFilterModalRef = useRef<BottomSheetModal>(null);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const { hiveViewModel } = useContext(MobXProviderContext);
  // TODO DB - Read user's isDetailedView Value from DB.
  const [isDetailedView, setIsDetailedView] = useState(false);
  const [filterList, setFilterList] = useState<string[]>([]);
  const [filteredHiveList, setFilteredHiveList] = useState<HiveModel[]>(
    hiveViewModel.hives
  );

  const handleAddHive = (hiveName: string) => {
    /*
    TODO Add validation. Coordinates of hive should use current 
    GPS location. If not available then default to oslo. Add toast on success or failure.
    */

    const newHiveId = `${userViewModel.userId}-hive-${Date.now()}`;

    hiveViewModel.addHive({
      id: newHiveId,
      name: hiveName,
      latLng: { lat: 53.483959, lng: -2.244644 },
      filters: [],
      notes: [],
    });

    handleCloseAddHiveModal();
  };

  const handleAddHiveModalSheetPressOpen = useCallback(() => {
    bottomSheetAddHiveModalRef.current?.present();
  }, []);

  const handleAddHiveModalSheetPressClose = useCallback(() => {
    bottomSheetAddHiveModalRef.current?.dismiss();
  }, []);

  const handleOpenAddHiveModal = () => {
    if (Platform.OS === "android" || Platform.OS === "ios") {
      handleAddHiveModalSheetPressOpen();
    } else {
      setAddHiveModalVisible(true);
    }
  };

  const handleCloseAddHiveModal = () => {
    if (Platform.OS === "android" || Platform.OS === "ios") {
      handleAddHiveModalSheetPressClose();
    } else {
      setAddHiveModalVisible(false);
    }
  };

  const handleAddFilter = (filterName: string) => {
    // TODO Add validation. Add toast behaviour.
    hiveViewModel.addFilter(filterName);
    handleCloseAddFilterModal();
  };

  const handleAddFilterModalSheetPressOpen = useCallback(() => {
    bottomSheetAddFilterModalRef.current?.present();
  }, []);

  const handleAddFilterModalSheetPressClose = useCallback(() => {
    bottomSheetAddFilterModalRef.current?.dismiss();
  }, []);

  const handleOpenAddFilterModal = () => {
    if (Platform.OS === "android" || Platform.OS === "ios") {
      handleAddFilterModalSheetPressOpen();
    } else {
      setAddFilterModalVisible(true);
    }
  };

  const handleCloseAddFilterModal = () => {
    if (Platform.OS === "android" || Platform.OS === "ios") {
      handleAddFilterModalSheetPressClose();
    } else {
      setAddFilterModalVisible(false);
    }
  };

  const handleRemoveFilterModalSheetPressOpen = useCallback(() => {
    bottomSheetRemoveFilterModalRef.current?.present();
  }, []);

  const handleRemoveFilterModalSheetPressClose = useCallback(() => {
    bottomSheetRemoveFilterModalRef.current?.dismiss();
  }, []);

  const handleOpenRemoveFilterModal = () => {
    if (Platform.OS === "android" || Platform.OS === "ios") {
      handleRemoveFilterModalSheetPressOpen();
    } else {
      setRemoveFilterModalVisible(true);
    }
  };

  const handleCloseRemoveFilterModal = () => {
    if (Platform.OS === "android" || Platform.OS === "ios") {
      handleRemoveFilterModalSheetPressClose();
    } else {
      setRemoveFilterModalVisible(false);
    }
  };

  const handleFilterChipPress = (filter: string) => {
    if (filterList.includes(filter)) {
      setFilterList(filterList.filter((item) => item !== filter));
    } else {
      setFilterList([...filterList, filter]);
    }
  };

  const handleClearFilterList = () => {
    setFilterList([]);
  };

  // Refreshes the GUI to show only the hives that contain the current filter criterium.
  useEffect(() => {
    if (filterList.length === 0) {
      setFilteredHiveList(hiveViewModel.hives);
    } else {
      const filtered = hiveViewModel.hives.filter((hive) =>
        filterList.every((filter) => hive.filters.includes(filter))
      );
      setFilteredHiveList(filtered);
    }
  }, [hiveViewModel.hives, filterList]);

  // In the case that a hive is deleted then the GUI is refreshed and all filters are cleared.
  useEffect(() => {
    if (filteredHiveList.length !== hiveViewModel.numberOfHives()) {
      setFilteredHiveList(hiveViewModel.hives);
      handleClearFilterList();
    }
  }, [hiveViewModel.hives]);

  useEffect(() => {
    if (userViewModel.authInitialized) {
      console.log(userViewModel.authInitialized);

      hiveViewModel.fetchHives();
      hiveViewModel.fetchFilters();
    }
  }, [userViewModel.authInitialized]);

  return (
    <SafeAreaView style={styles(theme).container}>
      <StatusBarCustom />
      <TopBar
        navigation={navigation}
        canOpenDrawer={!!navigation.openDrawer}
        title={userViewModel.i18n.t("home")}
        trailingIcons={[
          <TouchableOpacity onPress={() => setInfoModalVisible(true)}>
            <MaterialCommunityIcons
              style={styles(theme).trailingIcon}
              name="information-outline"
            />
          </TouchableOpacity>,
        ]}
      />
      <ScrollView>
        <View style={styles(theme).main}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Switch
              value={isDetailedView}
              // TODO DB - Update user's isDetailedView value in DB.
              onValueChange={() => setIsDetailedView(!isDetailedView)}
            />
            <HorizontalSpacer size={8} />
            <Text style={theme.fonts.bodyLarge}>
              {isDetailedView
                ? userViewModel.i18n.t("detailed view")
                : userViewModel.i18n.t("simplified view")}
            </Text>
          </View>
          <VerticalSpacer size={8} />
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Chip
              mode="outlined"
              icon="plus"
              elevated={true}
              onPress={handleOpenAddFilterModal}
              style={{ marginVertical: 4 }}
            >
              {userViewModel.i18n.t("add new filter")}
            </Chip>
            <HorizontalSpacer size={8} />
            {hiveViewModel.filters.map((filter: string) => (
              <View
                key={`${filter}-chip`}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Chip
                  selected={filterList.includes(filter)}
                  showSelectedOverlay={true}
                  disabled={
                    !filteredHiveList.some((hive) =>
                      hive.filters.includes(filter)
                    )
                  }
                  onPress={() => handleFilterChipPress(filter)}
                  style={{ marginVertical: 4 }}
                >
                  {filter}
                </Chip>
                <HorizontalSpacer size={8} />
              </View>
            ))}
            {hiveViewModel.filters.length > 0 ? (
              <>
                <Chip
                  icon="close"
                  disabled={filterList.length === 0}
                  onPress={handleClearFilterList}
                  style={{ marginVertical: 4 }}
                >
                  {userViewModel.i18n.t("unselect filters")}
                </Chip>
                <HorizontalSpacer size={8} />
                <Chip
                  icon="delete"
                  onPress={handleOpenRemoveFilterModal}
                  style={{ marginVertical: 4 }}
                >
                  {userViewModel.i18n.t("delete filter")}
                </Chip>
              </>
            ) : null}
          </View>
          <VerticalSpacer size={8} />
          <HiveList
            isDetailedView={isDetailedView}
            navigation={navigation}
            hives={filteredHiveList}
          />
        </View>
      </ScrollView>
      <Button
        icon="plus"
        mode="contained"
        onPress={handleOpenAddHiveModal}
        style={{ margin: 4 }}
      >
        {userViewModel.i18n.t("add new hive")}
      </Button>
      <AddHiveModal
        isOverlayModalVisible={addHiveModalVisible}
        bottomSheetModalRef={bottomSheetAddHiveModalRef}
        onClose={() => handleCloseAddHiveModal()}
        onAddHive={handleAddHive}
      />
      <AddFilterModal
        isOverlayModalVisible={addFilterModalVisible}
        bottomSheetModalRef={bottomSheetAddFilterModalRef}
        onClose={() => handleCloseAddFilterModal()}
        onAddFilter={handleAddFilter}
      />
      <HomeInfoModal
        isOverlayModalVisible={infoModalVisible}
        onClose={() => setInfoModalVisible(false)}
      />
      <RemoveFilterModal
        isOverlayModalVisible={removeFilterModalVisible}
        onClose={() => handleCloseRemoveFilterModal()}
        bottomSheetModalRef={bottomSheetRemoveFilterModalRef}
      />
    </SafeAreaView>
  );
};

export default observer(HomeScreen);
