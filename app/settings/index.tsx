import { useNavigation } from "expo-router";
import { TouchableOpacity, View, ScrollView } from "react-native";
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
import { VerticalSpacer } from "@/components/Spacers";
import NotificationButton from "@/components/NotificationButton";
import NotificationSettingsComponent from "@/components/NotificationSettings";

const SettingsScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { userViewModel } = useContext(MobXProviderContext);

  const currentLanguage = userViewModel.currentLanguage;
  const currentCountry = userViewModel.currentCountry;

  useEffect(() => {
    userViewModel.fetchUserParametersFromDatabase();
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
      <ScrollView>
        <View style={styles(theme).main}>
          <Text
            style={{
              ...theme.fonts.headlineSmall,
              textAlign: "center",
              padding: 1,
            }}
          >
            {userViewModel.i18n.t("accessibility")}
          </Text>

          <SwitchTheme />

          {currentLanguage && (
            <Text style={theme.fonts.bodyLarge}>
              {userViewModel.i18n.t("language")}: {currentLanguage}
            </Text>
          )}
          {currentCountry && (
            <Text style={theme.fonts.bodyLarge}>
              {userViewModel.i18n.t("country")}: {currentCountry}
            </Text>
          )}
          <VerticalSpacer size={12} />

          <Divider style={{ backgroundColor: theme.colors.outline }} />

          <Text
            style={{
              ...theme.fonts.headlineSmall,
              textAlign: "center",
              padding: 1,
            }}
          >
            {userViewModel.i18n.t("permissions")}
          </Text>
          <PermissionSwitch type="location permission" />
          <PermissionSwitch type="camera permission" />
          <PermissionSwitch type="media permission" />

          <Divider style={{ backgroundColor: theme.colors.outline }} />

          <Text
            style={{
              ...theme.fonts.headlineSmall,
              textAlign: "center",
              padding: 1,
            }}
          >
            {userViewModel.i18n.t("notifications")}
          </Text>
          <DefaultSwitchComponent type="mobile" />
          <DefaultSwitchComponent type="sms" />
          <DefaultSwitchComponent type="email" />
          <NotificationButton />

          <Divider style={{ backgroundColor: theme.colors.outline }} />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              padding: 1,
            }}
          >
            <Text
              style={{
                ...theme.fonts.headlineSmall,
                textAlign: "center",
                padding: 1,
              }}
            >
              {userViewModel.i18n.t("notification types")}
            </Text>

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

          <NotificationSettingsComponent />

          <VerticalSpacer size={12} />

          <Divider style={{ backgroundColor: theme.colors.outline }} />

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 1,
              margin: 8,
            }}
          >
            <Button
              style={styles(theme).settingsButton}
              mode="contained"
              onPress={() => {
                //TODO DB - Add functionality to register an anonymous account.
                //Only show if user is anonymous.
              }}
            >
              {userViewModel.i18n.t("register email")}
            </Button>

            <Button
              style={styles(theme).settingsButton}
              mode="contained"
              onPress={() => {
                //TODO: Add functionality to provide all data stored about a user and their hives.
              }}
            >
              {userViewModel.i18n.t("request data")}
            </Button>

            <Button
              icon="logout-variant"
              style={styles(theme).settingsButton}
              mode="contained"
              onPress={() => {
                userViewModel.logout();
              }}
            >
              {userViewModel.i18n.t("logout")}
            </Button>

            <Button
              icon="account-remove-outline"
              style={[
                styles(theme).settingsButton,
                { backgroundColor: theme.colors.error },
              ]}
              mode="contained"
              onPress={() => {
                //TODO: DB - Add functionality to delete a user account
              }}
            >
              <Text
                style={[
                  theme.fonts.labelLarge,
                  { color: theme.colors.onError },
                ]}
              >
                {userViewModel.i18n.t("delete account")}
              </Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default observer(SettingsScreen);
