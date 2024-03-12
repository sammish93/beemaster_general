import { useNavigation } from "expo-router";
import { Platform, View } from "react-native";
import { observer, MobXProviderContext } from "mobx-react";
import { useCallback, useContext, useMemo, useRef } from "react";
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
import { ScrollView } from "react-native-gesture-handler";
import ExampleModal from "@/components/modals/ExampleModal";

const UpdatesScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { userViewModel } = useContext(MobXProviderContext);
  const { notificationViewModel } = useContext(MobXProviderContext);

  return (
    <SafeAreaView style={styles(theme).container}>
      <StatusBarCustom />
      <TopBar
        navigation={navigation}
        canOpenDrawer={!!navigation.openDrawer}
        title={userViewModel.i18n.t("updates")}
      />
      <ScrollView>
        <View style={styles(theme).main}>
          <Text style={theme.fonts.bodyMedium}>
            {notificationViewModel.notifications[0].message}
          </Text>
          <Text style={theme.fonts.bodyMedium}>
            {notificationViewModel.notifications[1].message}
          </Text>
          <Text style={theme.fonts.bodyMedium}>
            {notificationViewModel.notifications[2].message}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default observer(UpdatesScreen);
