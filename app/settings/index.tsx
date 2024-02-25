import { useNavigation } from "expo-router";
import { TouchableOpacity, View, ScrollView } from "react-native";
import { observer, MobXProviderContext } from "mobx-react";
import { useContext } from "react";
import { Button, useTheme, Divider, Text } from "react-native-paper";
import styles from "@/assets/styles";
import TopBar from "@/components/TopBar";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarCustom from "@/components/StatusBarCustom";
import React from 'react';
import PermissionSwitch from "@/components/PermissionSwitch";
import SwitchTheme from "@/components/SwitchTheme";
import DefaultSwitchComponent from "@/components/DefaultSwitch";


const SettingsScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { userViewModel } = useContext(MobXProviderContext);


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
        <ScrollView >
          <Text style={{ ...theme.fonts.titleLarge, textAlign: 'center', padding: 1 }}>Settings</Text>

          <Divider style={{ backgroundColor: theme.colors.outline }} />
          <Text style={{ ...theme.fonts.bodyLarge, textAlign: 'center', padding: 1 }}>Accessibility</Text>
          <SwitchTheme />
          <Text style={theme.fonts.bodyMedium}>
            Your language is set to: {userViewModel.i18n.locale}
          </Text>
          <Text style={theme.fonts.bodyMedium}>
            String displayed in either English or Norwegian:{" "}
            {userViewModel.i18n.t("welcome")}
          </Text>
          {/*TODO: ADD Country */}


          <Divider style={{ backgroundColor: theme.colors.outline }} />
          <Text style={{ ...theme.fonts.bodyLarge, textAlign: 'center', padding: 1 }}>Permissions</Text>
          <PermissionSwitch type="location" />
          <PermissionSwitch type="camera" />
          <PermissionSwitch type="media" />


          <Divider style={{ backgroundColor: theme.colors.outline }} />
          <Text style={{ ...theme.fonts.bodyLarge, textAlign: 'center', padding: 1 }}>Notifications</Text>
          <DefaultSwitchComponent type="mobile" />
          <DefaultSwitchComponent type="sms" />
          <DefaultSwitchComponent type="email" />


          <Divider style={{ backgroundColor: theme.colors.outline }} />
          <Text style={{ ...theme.fonts.bodyLarge, textAlign: 'center', padding: 1 }}>Notification Types</Text>
          {/*TODO: ADD info button in top corner*/}
          <DefaultSwitchComponent type="snow" />
          <DefaultSwitchComponent type="potential swarm" />


          <Divider style={{ backgroundColor: theme.colors.outline }} />
          <Text style={{ ...theme.fonts.bodyLarge, textAlign: 'center', padding: 1 }}>Actions</Text>
          <View style={{ justifyContent: 'center', alignItems: 'center', padding: 1, margin: 8 }}>
            <Button
              style={{ width: 150, margin: 4 }}
              mode="contained"
              onPress={() => {
                //TODO: do someting
              }}
            >
              Register Email
            </Button>

            <Button
              style={{ width: 150, margin: 4 }}
              mode="contained"
              onPress={() => {
                //TODO: do someting
              }}
            >
              Request Data
            </Button>

            <Button
              style={{ width: 150, margin: 4 }}
              mode="contained"
              onPress={() => {
                userViewModel.clear();
              }}
            >
              Logout
            </Button>

            <Button
              style={{ width: 150, margin: 4, backgroundColor: theme.colors.error }}
              mode="contained"
              onPress={() => {
                //TODO: do someting
              }}
            >
              <Text style={{ color: theme.colors.onError }}>Delete Account</Text>
            </Button>

          </View>

        </ScrollView>

      </View>
    </SafeAreaView>
  );
};

export default observer(SettingsScreen);
