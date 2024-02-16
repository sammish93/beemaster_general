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
import LocationPermissionComponent from "@/components/LocationPermissionsSwitch";
import CameraPermissionsSwitch from "@/components/CameraSwitchPermission";
import MediaFilePermissionSwitch from "@/components/MediaFileSwitchPermission";

const SettingsInfoScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { userViewModel } = useContext(MobXProviderContext);

  return (
    <SafeAreaView style={styles(theme).container}>
      <StatusBarCustom />
      <TopBar
        navigation={navigation}
        canOpenDrawer={!!navigation.openDrawer}
        title="Info"
      />
      <View style={styles(theme).main}>
        <Text style={theme.fonts.titleLarge}>Settings Info</Text>
        <LocationPermissionComponent />
        <CameraPermissionsSwitch />
        <MediaFilePermissionSwitch />
      </View>
    </SafeAreaView>
  );
};

export default observer(SettingsInfoScreen);
