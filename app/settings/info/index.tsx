import { useNavigation } from "expo-router";
import { View } from "react-native";
import { observer, MobXProviderContext } from "mobx-react";
import { useContext } from "react";
import { useTheme, Text } from "react-native-paper";
import styles from "@/assets/styles";
import TopBar from "@/components/TopBar";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarCustom from "@/components/StatusBarCustom";

const SettingsInfoScreen = () => {
  const paperTheme = useTheme();
  const navigation = useNavigation();
  const { userViewModel } = useContext(MobXProviderContext);

  return (
    <SafeAreaView style={styles(paperTheme).container}>
      <StatusBarCustom />
      <TopBar
        navigation={navigation}
        canOpenDrawer={!!navigation.openDrawer}
        title={userViewModel.i18n.t("information")}
      />
      <View style={styles(paperTheme).main}>
        <Text style={paperTheme.fonts.titleLarge}>Settings Info</Text>
      </View>
    </SafeAreaView>
  );
};

export default observer(SettingsInfoScreen);
