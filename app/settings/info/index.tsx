import { useNavigation } from "expo-router";
import { View } from "react-native";
import { observer, MobXProviderContext } from "mobx-react";
import { useContext } from "react";
import React from "react";
import { useTheme, Text, Switch } from "react-native-paper";
import styles from "@/assets/styles";
import TopBar from "@/components/TopBar";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarCustom from "@/components/StatusBarCustom";
import LocationPermissionComponent from "@/components/LocationPermissionsSwitch";
import CameraPermissionsSwitch from "@/components/CameraSwitchPermission";
import MediaFilePermissionSwitch from "@/components/MediaFileSwitchPermission";

const SettingsInfoScreen = () => {
  const paperTheme = useTheme();
  const navigation = useNavigation();
  const { userViewModel } = useContext(MobXProviderContext);


  const toggleTheme = () => {
    const newTheme = paperTheme.dark ? "light" : "dark";
    userViewModel.setTheme(newTheme);
  };

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
        <LocationPermissionComponent />
        <CameraPermissionsSwitch />
        <MediaFilePermissionSwitch />
        <Text>Switch light/dark mode: </Text>
        <Switch
          value={paperTheme.dark}
          onValueChange={toggleTheme}
        />

      </View>
    </SafeAreaView>
  );
};

export default observer(SettingsInfoScreen);
