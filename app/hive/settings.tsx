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
import RepositionHiveModal from "@/components/modals/RepositionHive";

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
  const [addFiltersToHiveModalVisible, setAddFiltersToHiveModalVisible] =
    useState(false);
  const bottomSheetAddFiltersToHiveModalRef = useRef<BottomSheetModal>(null);
  const [repositionHiveModalVisible, setRepositionHiveModalVisible] =
    useState(false);
  const bottomSheetRepositionHiveModalRef = useRef<BottomSheetModal>(null);

  const handleRepositionHiveModalSheetPressOpen = useCallback(() => {
    bottomSheetRepositionHiveModalRef.current?.present();
  }, []);

  const handleRepositionHiveModalSheetPressClose = useCallback(() => {
    bottomSheetRepositionHiveModalRef.current?.dismiss();
  }, []);

  const handleOpenRepositionHiveModal = () => {
    if (Platform.OS === "android" || Platform.OS === "ios") {
      handleRepositionHiveModalSheetPressOpen();
    } else {
      setRepositionHiveModalVisible(true);
    }
  };

  const handleCloseRepositionHiveModal = () => {
    if (Platform.OS === "android" || Platform.OS === "ios") {
      handleRepositionHiveModalSheetPressClose();
    } else {
      setRepositionHiveModalVisible(false);
    }
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
          <Button
            icon="map-marker"
            mode="contained"
            onPress={handleOpenRepositionHiveModal}
            style={{ margin: 4 }}
          >
            Reposition hive
          </Button>
        </View>
      </ScrollView>
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
    </SafeAreaView>
  );
};

export default observer(HiveSettingsScreen);
