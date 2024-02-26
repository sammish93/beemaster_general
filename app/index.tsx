import { useNavigation } from "expo-router";
import { View, Platform, TouchableOpacity } from "react-native";
import { observer, MobXProviderContext } from "mobx-react";
import { useCallback, useContext, useRef, useState } from "react";
import { useTheme, Text, Switch, Button } from "react-native-paper";
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

const HomeScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { userViewModel } = useContext(MobXProviderContext);
  const { exampleViewModel } = useContext(MobXProviderContext);
  const [modalVisible, setModalVisible] = useState(false);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
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
          <HiveList isListView={isListView} navigation={navigation} />
        </View>
      </ScrollView>
      <Button
        icon="plus"
        mode="contained"
        onPress={handleOpenModal}
        style={{ margin: 4 }}
      >
        {userViewModel.i18n.t("add new hive")}
      </Button>
      <AddHiveModal
        isOverlayModalVisible={modalVisible}
        bottomSheetModalRef={bottomSheetModalRef}
        onClose={() => handleCloseModal()}
        onAddHive={handleAddHive}
      />
      <HomeInfoModal
        isOverlayModalVisible={infoModalVisible}
        onClose={() => setInfoModalVisible(false)}
      />
    </SafeAreaView>
  );
};

export default observer(HomeScreen);
