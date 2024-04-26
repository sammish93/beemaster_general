import { useNavigation } from "expo-router";
import { Platform, TouchableOpacity, View } from "react-native";
import { observer, MobXProviderContext } from "mobx-react";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
import { VerticalSpacer } from "@/components/Spacers";
import { hiveViewModel } from "@/viewModels/HiveViewModel";
import { HiveNotification } from "@/models/notification";
import { useIsFocused } from "@react-navigation/native";
import { auth } from "@/firebaseConfig";

const UpdatesScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { userViewModel } = useContext(MobXProviderContext);
  const { notificationViewModel } = useContext(MobXProviderContext);
  const [notifications, setNotifications] = useState<HiveNotification[]>(
    notificationViewModel.notifications
  );
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  useEffect(() => {
    console.log("use effect ");
    notificationViewModel.fetchNotifications();

    setIsButtonPressed(false);
  }, [isButtonPressed]);

  useEffect(() => {
    setNotifications(notificationViewModel.notifications);
  }, [notificationViewModel.notifications]);

  useEffect(() => {});
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
          {notificationViewModel.getUnreadNotificationAmount() > 0 ? (
            <Button
              icon="checkbox-marked-circle"
              mode="contained"
              onPress={() => {
                notificationViewModel.markNotificationsAsRead();
                setIsButtonPressed(true);
              }}
            >
              {userViewModel.i18n.t("mark all notifications as seen")}
            </Button>
          ) : (
            <Text
              style={{
                ...theme.fonts.bodyLarge,
                textAlign: "center",
              }}
            >
              {userViewModel.i18n.t("you have no unread notifications")}
            </Text>
          )}
          <VerticalSpacer size={12} />
          <NotificationList
            navigation={navigation}
            notifications={notifications}
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
