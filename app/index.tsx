import { useNavigation } from "expo-router";
import { View, Platform, TouchableOpacity } from "react-native";
import { observer, MobXProviderContext } from "mobx-react";
import { useCallback, useContext, useRef, useState } from "react";
import { useTheme, Text, Switch, Button, Chip } from "react-native-paper";
import TopBar from "@/components/TopBar";
import styles from "@/assets/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarCustom from "@/components/StatusBarCustom";
import { ScrollView } from "react-native-virtualized-view";
import HiveList from "@/components/home/HiveList";
import AddHiveModal from "@/components/modals/AddHiveModal";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { HorizontalSpacer, VerticalSpacer } from "@/components/Spacers";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import HomeInfoModal from "@/components/modals/HomeInfoModal";
import AddFilterModal from "@/components/modals/AddFilterModal";

const HomeScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { userViewModel } = useContext(MobXProviderContext);
  const { exampleViewModel } = useContext(MobXProviderContext);
  const [AddHiveModalVisible, setAddHiveModalVisible] = useState(false);
  const bottomSheetAddHiveModalRef = useRef<BottomSheetModal>(null);
  const [AddFilterModalVisible, setAddFilterModalVisible] = useState(false);
  const bottomSheetAddFilterModalRef = useRef<BottomSheetModal>(null);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const { hiveViewModel } = useContext(MobXProviderContext);
  const [isListView, setIsListView] = useState(false);

  const handleAddHive = (hiveName: string) => {
    const newHiveId = `hive-${Date.now()}`; // TODO Temporarly solution.
    hiveViewModel.addHive({ id: newHiveId, name: hiveName });
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
              value={isListView}
              onValueChange={() => setIsListView(!isListView)}
            />
            <HorizontalSpacer size={8} />
            <Text style={theme.fonts.bodyLarge}>
              {isListView
                ? userViewModel.i18n.t("detailed view")
                : userViewModel.i18n.t("simplified view")}
            </Text>
          </View>
          <VerticalSpacer size={8} />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Chip
              mode="outlined"
              icon="plus"
              elevated={true}
              onPress={handleOpenAddFilterModal}
            >
              Add filter
            </Chip>
            <HorizontalSpacer size={4} />
            <Chip onPress={() => console.log("Pressed")}>Fredrikstad</Chip>
            <HorizontalSpacer size={4} />
            <Chip onPress={() => console.log("Pressed")}>Harvested</Chip>
            <HorizontalSpacer size={4} />
            <Chip onPress={() => console.log("Pressed")}>Disease Risk</Chip>
          </View>
          <VerticalSpacer size={8} />
          <HiveList isListView={isListView} navigation={navigation} />
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
        isOverlayModalVisible={AddHiveModalVisible}
        bottomSheetModalRef={bottomSheetAddHiveModalRef}
        onClose={() => handleCloseAddHiveModal()}
        onAddHive={handleAddHive}
      />
      <AddFilterModal
        isOverlayModalVisible={AddFilterModalVisible}
        bottomSheetModalRef={bottomSheetAddFilterModalRef}
        onClose={() => handleCloseAddFilterModal()}
        onAddFilter={() => null}
      />
      <HomeInfoModal
        isOverlayModalVisible={infoModalVisible}
        onClose={() => setInfoModalVisible(false)}
      />
    </SafeAreaView>
  );
};

export default observer(HomeScreen);
