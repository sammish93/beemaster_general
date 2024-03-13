import { useNavigation } from "expo-router";
import { View } from "react-native";
import { observer, MobXProviderContext } from "mobx-react";
import { useContext } from "react";
import { Button, useTheme, Text } from "react-native-paper";
import styles from "@/assets/styles";
import TopBar from "@/components/TopBar";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarCustom from "@/components/StatusBarCustom";

const ToolboxScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { userViewModel } = useContext(MobXProviderContext);

  return (
    <SafeAreaView style={styles(theme).container}>
      <StatusBarCustom />
      <TopBar
        navigation={navigation}
        canOpenDrawer={!!navigation.openDrawer}
        title={userViewModel.i18n.t("toolbox")}
      />
      <View style={styles(theme).main}>
        <Text style={theme.fonts.titleLarge}>Toolbox</Text>
        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate("/toolbox/community");
          }}
        >
          Community
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate("/toolbox/checklist");
          }}
        >
          Checklist
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate("/toolbox/calendar");
          }}
        >
          Calendar
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate("/toolbox/hiveScan");
          }}
        >
          Hive Scan
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default observer(ToolboxScreen);
