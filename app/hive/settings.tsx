import { useNavigation } from "expo-router";
import { Platform, ScrollView, View } from "react-native";
import { observer, MobXProviderContext } from "mobx-react";
import { useCallback, useContext, useRef, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTheme, Text, Button } from "react-native-paper";
import styles from "@/assets/styles";
import TopBar from "@/components/TopBar";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarCustom from "@/components/StatusBarCustom";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import AddHiveModal from "@/components/modals/AddHiveModal";
import AddFiltersToHiveModal from "@/components/modals/AddFiltersToHiveModal";

type RootStackParamList = {
  hive: {
    hiveId: string;
  };
};

type HiveScreenProps = {
  route: RouteProp<RootStackParamList, "hive">;
  navigation: StackNavigationProp<RootStackParamList, "hive">;
};

const HiveSettingsScreen = (params: HiveScreenProps) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { userViewModel } = useContext(MobXProviderContext);
  const { hiveViewModel } = useContext(MobXProviderContext);
  const hiveId = params.route.params.hiveId;
  const selectedHive = hiveViewModel.getSelectedHive();
  const [AddFiltersToHiveModalVisible, setAddFiltersToHiveModalVisible] =
    useState(false);
  const bottomSheetAddFiltersToHiveModalRef = useRef<BottomSheetModal>(null);

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

  return (
    <SafeAreaView style={styles(theme).container}>
      <StatusBarCustom />
      <TopBar
        navigation={navigation}
        canOpenDrawer={!!navigation.openDrawer}
        title={userViewModel.i18n.t("settings")}
      />
      <ScrollView>
        <View style={styles(theme).main}>
          <Text>{hiveId}</Text>
          <Button
            icon="pencil"
            mode="contained"
            onPress={handleOpenAddFiltersToHiveModal}
            style={{ margin: 4 }}
          >
            {userViewModel.i18n.t("modify hive filters")}
          </Button>
        </View>
      </ScrollView>
      <AddFiltersToHiveModal
        isOverlayModalVisible={AddFiltersToHiveModalVisible}
        bottomSheetModalRef={bottomSheetAddFiltersToHiveModalRef}
        onClose={() => handleCloseAddFiltersToHiveModal()}
        onAddFilters={handleCloseAddFiltersToHiveModal}
      />
    </SafeAreaView>
  );
};

export default observer(HiveSettingsScreen);
