import { useNavigation } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { observer, MobXProviderContext } from "mobx-react";
import { useContext } from "react";
import { Button, useTheme, Text } from "react-native-paper";
import styles from "@/assets/styles";
import TopBar from "@/components/TopBar";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarCustom from "@/components/StatusBarCustom";
//import PermissionManager from "@/components/PermissionManager";
//import React, { useState } from 'react';

const SettingsScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { userViewModel } = useContext(MobXProviderContext);

  {/*const [permissionResult, setPermissionResult] = useState<string | null>(null);
  const handlePermissionResult = (result: string | null) => {
    setPermissionResult(result);
  };
  */}

  return (
    <SafeAreaView style={styles(theme).container}>
      <StatusBarCustom />
      <TopBar
        navigation={navigation}
        canOpenDrawer={!!navigation.openDrawer}
        title="Settings"
        trailingIcons={[
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("/settings/info/index");
            }}
          >
            <MaterialCommunityIcons
              style={styles(theme).trailingIcon}
              name="information-outline"
            />
          </TouchableOpacity>,
        ]}
      />
      <View style={styles(theme).main}>
        <Text style={theme.fonts.titleLarge}>Settings</Text>
        <Text style={theme.fonts.bodyLarge}>
          String displayed in either English or Norwegian:{" "}
          {userViewModel.i18n.t("welcome")}
        </Text>
        <Text style={theme.fonts.bodyLarge}>
          Your language is set to: {userViewModel.i18n.locale}
        </Text>
        <Button
          mode="contained"
          onPress={() => {
            userViewModel.clear();
          }}
        >
          Logout
        </Button>
        {/* 
        <Button
          mode="contained"
          onPress={() => {
            <PermissionManager onPermissionResult={handlePermissionResult} />;
          }}
        >
          Request Permission
        </Button>
        {permissionResult && ( <Text > Permission Result: {permissionResult} </Text>)}
        */}

      </View>
    </SafeAreaView>
  );
};

export default observer(SettingsScreen);
