import { useNavigation } from "expo-router";
import { View, useColorScheme } from "react-native";
import { observer, MobXProviderContext } from "mobx-react";
import { useContext } from "react";
import { useTheme, Text } from "react-native-paper";
import styles from "@/assets/styles";
import TopBar from "@/components/TopBar";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarCustom from "@/components/StatusBarCustom";

const CalendarScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { userViewModel } = useContext(MobXProviderContext);

  return (
    <SafeAreaView style={styles(theme).container}>
      <StatusBarCustom />
      <TopBar
        navigation={navigation}
        canOpenDrawer={!!navigation.openDrawer}
        title={userViewModel.i18n.t("calendar")}
      />
      <View style={styles(theme).main}>
        <Text style={{ ...theme.fonts.bodyLarge, textAlign: "center" }}>
          {userViewModel.i18n.t("future feature")}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default observer(CalendarScreen);
