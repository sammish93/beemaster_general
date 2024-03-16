import { useNavigation } from "expo-router";
import { TouchableOpacity, View, ScrollView, Platform } from "react-native";
import { observer, MobXProviderContext } from "mobx-react";
import { useContext, useEffect, useRef, useState } from "react";
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
import NotificationModal from "@/components/modals/NotificationModal";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { VerticalSpacer } from "@/components/Spacers";
import NotificationButton from "@/components/NotificationButton";

const SettingsScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { userViewModel } = useContext(MobXProviderContext);
  const bottomSheetAddHiveModalRef = useRef<BottomSheetModal>(null);
  const currentLanguage = userViewModel.currentLanguage;
  const currentCountry = userViewModel.currentCountry;
  const [selectedNotificationType, setSelectedNotificationType] = useState("");
  const [AddHiveModalVisible, setAddHiveModalVisible] = useState(false);

  useEffect(() => {
    userViewModel.fetchUserParametersFromDatabase();
    userViewModel.updateLocaleSettings();
  }, [userViewModel]);



  const handleOpenModal = (notificationType: string) => {
    setSelectedNotificationType(notificationType);
    if (Platform.OS === "android" || Platform.OS === "ios") {
      bottomSheetAddHiveModalRef.current?.present();
    } else {
      setAddHiveModalVisible(true);
    }
  };

  const handleCloseModal = () => {
    if (Platform.OS === "android" || Platform.OS === "ios") {
      bottomSheetAddHiveModalRef.current?.dismiss();
    } else {
      setAddHiveModalVisible(false);
    }
  };

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

          <Text style={{ ...theme.fonts.headlineSmall, textAlign: 'center', padding: 1 }}>
            {userViewModel.i18n.t('accessibility')}
          </Text>

          <SwitchTheme />

          {currentLanguage && (
            <Text style={theme.fonts.bodyLarge}>
              {userViewModel.i18n.t('language')}: {currentLanguage}
            </Text>
          )}
          {currentCountry && (
            <Text style={theme.fonts.bodyLarge}>
              {userViewModel.i18n.t('country')}: {currentCountry}
            </Text>
          )}
          <VerticalSpacer size={12} />

          <Divider style={{ backgroundColor: theme.colors.outline }} />


          <Text style={{ ...theme.fonts.headlineSmall, textAlign: 'center', padding: 1 }}>
            {userViewModel.i18n.t('permissions')}</Text>
          <PermissionSwitch type='location permission' />
          <PermissionSwitch type='camera permission' />
          <PermissionSwitch type='media permission' />

          <Divider style={{ backgroundColor: theme.colors.outline }} />

          <Text style={{ ...theme.fonts.headlineSmall, textAlign: 'center', padding: 1 }}>
            {userViewModel.i18n.t('notifications')}</Text>
          <DefaultSwitchComponent type='mobile' />
          <DefaultSwitchComponent type='sms' />
          <DefaultSwitchComponent type='email' />
          <NotificationButton />

          <Divider style={{ backgroundColor: theme.colors.outline }} />

          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 1 }}>
            <Text style={{ ...theme.fonts.headlineSmall, textAlign: 'center', padding: 1 }}>
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
          <TouchableOpacity >
            <Text style={theme.fonts.bodyLarge} onPress={() => handleOpenModal(userViewModel.i18n.t('weather'))}>
              {userViewModel.i18n.t('weather')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity >
            <Text style={theme.fonts.bodyLarge} onPress={() => handleOpenModal(userViewModel.i18n.t('potential swarm'))}>
              {userViewModel.i18n.t('potential swarm')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity >
            <Text style={theme.fonts.bodyLarge} onPress={() => handleOpenModal(userViewModel.i18n.t('consider feeding'))}>
              {userViewModel.i18n.t('consider feeding')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity >
            <Text style={theme.fonts.bodyLarge} onPress={() => handleOpenModal(userViewModel.i18n.t('honey harvest'))}>
              {userViewModel.i18n.t('honey harvest')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity >
            <Text style={theme.fonts.bodyLarge} onPress={() => handleOpenModal(userViewModel.i18n.t('maintenance'))}>
              {userViewModel.i18n.t('maintenance')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity >
            <Text style={theme.fonts.bodyLarge} onPress={() => handleOpenModal(userViewModel.i18n.t('expand hive'))}>
              {userViewModel.i18n.t('expand hive')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity >
            <Text style={theme.fonts.bodyLarge} onPress={() => handleOpenModal(userViewModel.i18n.t('check hive'))}>
              {userViewModel.i18n.t('check hive')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity >
            <Text style={theme.fonts.bodyLarge} onPress={() => handleOpenModal(userViewModel.i18n.t('reminder'))}>
              {userViewModel.i18n.t('reminder')}
            </Text>
          </TouchableOpacity>
          <VerticalSpacer size={12} />

          <Divider style={{ backgroundColor: theme.colors.outline }} />

          <View style={{ justifyContent: 'center', alignItems: 'center', padding: 1, margin: 8 }}>
            <Button
              style={styles(theme).settingsButton}
              mode="contained"
              onPress={() => {
                //TODO: do someting
              }}
            >

              {userViewModel.i18n.t('register email')}
            </Button>

            <Button
              style={styles(theme).settingsButton}
              mode="contained"
              onPress={() => {
                //TODO: do someting
              }}
            >
              {userViewModel.i18n.t('request data')}
            </Button>

            <Button
              style={styles(theme).settingsButton}
              mode="contained"
              onPress={() => {
                userViewModel.logout()
              }}
            >
              {userViewModel.i18n.t('logout')}
            </Button>

            <Button
              style={[styles(theme).settingsButton, { backgroundColor: theme.colors.error }]}
              mode="contained"
              onPress={() => {
                //TODO: do someting
              }}
            >
              <Text style={[theme.fonts.labelLarge, { color: theme.colors.onError }]}>
                {userViewModel.i18n.t('delete account')}</Text>
            </Button>

          </View>
        </ScrollView>
      </View>
      <NotificationModal
        isOverlayModalVisible={AddHiveModalVisible}
        bottomSheetModalRef={bottomSheetAddHiveModalRef}
        onClose={() => handleCloseModal()}
        onSave={(newValue) => {
          // TODO: Add functionality for saving values to database
          console.log("New value for", selectedNotificationType, " saved to database:", newValue);
          handleCloseModal();
        }}
        parameterName={selectedNotificationType}
      />

    </SafeAreaView>
  );

};


export default observer(SettingsScreen);
