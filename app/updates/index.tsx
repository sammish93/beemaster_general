import { useNavigation } from "expo-router";
import { Platform, TouchableOpacity, View } from "react-native";
import { observer, MobXProviderContext } from "mobx-react";
import { useCallback, useContext, useMemo, useRef, useState } from "react";
import { useTheme, Text, Button } from "react-native-paper";
import styles from "@/assets/styles";
import TopBar from "@/components/TopBar";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarCustom from "@/components/StatusBarCustom";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { ScrollView } from "react-native-virtualized-view";
import ExampleModal from "@/components/modals/ExampleModal";
import NotificationList from "@/components/notification/NotificationList";
import UpdateInfoModal from "@/components/modals/UpdateInfoModal";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const UpdatesScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { userViewModel } = useContext(MobXProviderContext);
  const { notificationViewModel } = useContext(MobXProviderContext);
  const [infoModalVisible, setInfoModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles(theme).container}>
      <StatusBarCustom />
      <TopBar
        navigation={navigation}
        canOpenDrawer={!!navigation.openDrawer}
        title={userViewModel.i18n.t("updates")}
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
          <NotificationList
            navigation={navigation}
            notifications={notificationViewModel.notifications}
          />
        </View>
      </ScrollView>
      <UpdateInfoModal
        isOverlayModalVisible={infoModalVisible}
        onClose={() => setInfoModalVisible(false)}
      />
    </SafeAreaView>
  );
};

export default observer(UpdatesScreen);
