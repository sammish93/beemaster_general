import { useNavigation } from "expo-router";
import { View, Platform, Switch } from "react-native";
import { observer, MobXProviderContext } from "mobx-react";
import { useCallback, useContext, useRef, useState } from "react";
import { useTheme, Text } from "react-native-paper";
import TopBar from "@/components/TopBar";
import styles from "@/assets/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarCustom from "@/components/StatusBarCustom";
import { ScrollView } from "react-native-virtualized-view";
import getWeatherTypeIconFromString from "@/domain/weatherIconMapper";
import AddHiveButton from "@/components/AddHiveButton";
import HiveList from "@/components/hiveList/HiveList";
import AddHiveModal from "@/components/modals/AddHiveModal";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

const HomeScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { userViewModel } = useContext(MobXProviderContext);
  const { exampleViewModel } = useContext(MobXProviderContext);
  const [modalVisible, setModalVisible] = useState(false);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { hiveViewModel } = useContext(MobXProviderContext);
  const [isListView, setIsListView] = useState(false);

  const handleAddHive = (hiveName: string) => {
    const newHiveId = `hive-${Date.now()}`; // TODO Temporarly solution.
    hiveViewModel.addHive({ id: newHiveId, name: hiveName });
    handleCloseModal();
  };

  const handleModalSheetPressOpen = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleModalSheetPressClose = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const handleOpenModal = () => {
    if (Platform.OS === "android" || Platform.OS === "ios") {
      handleModalSheetPressOpen();
    } else {
      setModalVisible(true);
    }
  };

  const handleCloseModal = () => {
    if (Platform.OS === "android" || Platform.OS === "ios") {
      handleModalSheetPressClose();
    } else {
      setModalVisible(false);
    }
  };

  return (
    <SafeAreaView style={styles(theme).container}>
      <StatusBarCustom />
      <TopBar
        navigation={navigation}
        canOpenDrawer={!!navigation.openDrawer}
        title="Home"
      />
      <ScrollView>
        <View style={styles(theme).main}>
          <View style={styles(theme).toggleContainer}>
            <Switch
              value={isListView}
              onValueChange={() => setIsListView(!isListView)}
            />
            <Text style={{ color: "white" }}>
              {isListView ? "Detailed View" : "Simplified View"}
            </Text>
          </View>
          <HiveList isListView={isListView} navigation={navigation} />
        </View>
      </ScrollView>
      <AddHiveButton onAddHivePress={handleOpenModal} />
      <AddHiveModal
        isOverlayModalVisible={modalVisible}
        bottomSheetModalRef={bottomSheetModalRef}
        onClose={() => handleCloseModal()}
        onAddHive={handleAddHive}
      />
    </SafeAreaView>
  );
};

export default observer(HomeScreen);
