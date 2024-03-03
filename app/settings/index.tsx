import { useNavigation } from "expo-router";
import { TouchableOpacity, View, ScrollView, Platform } from "react-native";
import { observer, MobXProviderContext } from "mobx-react";
import { useContext, useEffect } from "react";
import { Button, useTheme, Divider, Text } from "react-native-paper";
import styles from "@/assets/styles";
import TopBar from "@/components/TopBar";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarCustom from "@/components/StatusBarCustom";
import React from "react";
import PermissionSwitch from "@/components/PermissionSwitch";
import SwitchTheme from "@/components/SwitchTheme";
import DefaultSwitchComponent from "@/components/DefaultSwitch";


const SettingsScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { userViewModel } = useContext(MobXProviderContext);

  const currentLanguage = userViewModel.currentLanguage;
  const currentCountry = userViewModel.currentCountry;
  useEffect(() => {
    userViewModel.updateLocaleSettings();
  }, [userViewModel]);


  return (
    <SafeAreaView style={styles(theme).container}>
      <StatusBarCustom />
      <TopBar
        navigation={navigation}
        canOpenDrawer={!!navigation.openDrawer}
        title={userViewModel.i18n.t("settings")}
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

          <Text style={{ ...theme.fonts.bodyLarge, textAlign: 'center', padding: 1 }}>
            {userViewModel.i18n.t('accessibility')}
          </Text>

          <SwitchTheme />

          {currentLanguage && (
            <Text style={theme.fonts.bodyMedium}>
              {userViewModel.i18n.t('language')}: {currentLanguage}
            </Text>
          )}
          {currentCountry && (
            <Text style={theme.fonts.bodyMedium}>
              {userViewModel.i18n.t('country')}: {currentCountry}
            </Text>
          )}

          <Divider style={{ backgroundColor: theme.colors.outline }} />

          <Text style={{ ...theme.fonts.bodyLarge, textAlign: 'center', padding: 1 }}>
            {userViewModel.i18n.t('permissions')}</Text>
          <PermissionSwitch type='location permission' />
          <PermissionSwitch type='camera permission' />
          <PermissionSwitch type='media permission' />

          <Divider style={{ backgroundColor: theme.colors.outline }} />

          <Text style={{ ...theme.fonts.bodyLarge, textAlign: 'center', padding: 1 }}>
            {userViewModel.i18n.t('notifications')}</Text>
          <DefaultSwitchComponent type='mobile' />
          <DefaultSwitchComponent type='sms' />
          <DefaultSwitchComponent type='email' />

          <Divider style={{ backgroundColor: theme.colors.outline }} />

          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 1 }}>
            <Text style={{ ...theme.fonts.bodyLarge, textAlign: 'center', padding: 1 }}>
              {userViewModel.i18n.t('notification types')}</Text>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("/settings/info/index");
              }}
              style={{ marginLeft: 8 }}
            >
              <MaterialCommunityIcons
                style={styles(theme).trailingIcon}
                name="information-outline"
                size={24}
              />
            </TouchableOpacity>
          </View>

          <Text style={theme.fonts.bodyMedium}>
            {userViewModel.i18n.t('potential swarm')}
          </Text>
          <Text style={theme.fonts.bodyMedium}>
            {userViewModel.i18n.t('consider feeding')}
          </Text>
          <Text style={theme.fonts.bodyMedium}>
            {userViewModel.i18n.t('honey harvest')}
          </Text>
          <Text style={theme.fonts.bodyMedium}>
            {userViewModel.i18n.t('maintenance')}
          </Text>
          <Text style={theme.fonts.bodyMedium}>
            {userViewModel.i18n.t('expand hive')}
          </Text>
          <Text style={theme.fonts.bodyMedium}>
            {userViewModel.i18n.t('check hive')}
          </Text>
          <Text style={theme.fonts.bodyMedium}>
            {userViewModel.i18n.t('reminder')}
          </Text>

          <Divider style={{ backgroundColor: theme.colors.outline }} />

          <View style={{ justifyContent: 'center', alignItems: 'center', padding: 1, margin: 8 }}>
            <Button
              style={{ width: 150, margin: 4 }}
              mode="contained"
              onPress={() => {
                //TODO: do someting
              }}
            >
              {userViewModel.i18n.t('register email')}
            </Button>

            <Button
              style={{ width: 150, margin: 4 }}
              mode="contained"
              onPress={() => {
                //TODO: do someting
              }}
            >
              {userViewModel.i18n.t('request data')}
            </Button>

            <Button
              style={{ width: 150, margin: 4 }}
              mode="contained"
              onPress={() => {
                userViewModel.clear();
              }}
            >
              {userViewModel.i18n.t('logout')}
            </Button>

            <Button
              style={{ width: 150, margin: 4, backgroundColor: theme.colors.error }}
              mode="contained"
              onPress={() => {
                //TODO: do someting
              }}
            >
              <Text style={[theme.fonts.bodyMedium, { color: theme.colors.onError }]}>
                {userViewModel.i18n.t('delete account')}</Text>
            </Button>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );

};


export default observer(SettingsScreen);
