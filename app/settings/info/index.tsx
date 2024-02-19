import { useNavigation } from "expo-router";
import { View } from "react-native";
import { observer, MobXProviderContext } from "mobx-react";
import { useContext } from "react";
import React from "react";
import { useTheme, Text } from "react-native-paper";
import styles from "@/assets/styles";
import TopBar from "@/components/TopBar";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarCustom from "@/components/StatusBarCustom";
import PermissionSwitch from "@/components/PermissionSwitch";
import SwitchTheme from "@/components/SwitchTheme";

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
        title="Info"
      />
      <View style={styles(paperTheme).main}>
        <Text style={paperTheme.fonts.titleLarge}>Settings Info</Text>
        <Text style={paperTheme.fonts.bodyLarge}>Permissions </Text>
        <PermissionSwitch type="location" />
        <PermissionSwitch type="camera" />
        <PermissionSwitch type="media" />
        <Text style={paperTheme.fonts.bodyLarge}>Switch light/dark mode </Text>
        <SwitchTheme />
      </View>
    </SafeAreaView>
  );
};

export default observer(SettingsInfoScreen);
