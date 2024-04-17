import { useNavigation } from "expo-router";
import { TouchableOpacity, View, ScrollView } from "react-native";
import { observer, MobXProviderContext } from "mobx-react";
import { useContext, useEffect, useState } from "react";
import { Button, useTheme, Divider, Text, List } from "react-native-paper";
import styles from "@/assets/styles";
import TopBar from "@/components/TopBar";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarCustom from "@/components/StatusBarCustom";
import PermissionSwitch from "@/components/PermissionSwitch";
import SwitchTheme from "@/components/SwitchTheme";
import DefaultSwitchComponent from "@/components/DefaultSwitch";
import { VerticalSpacer } from "@/components/Spacers";
import NotificationButton from "@/components/NotificationButton";
import NotificationSettingsComponent from "@/components/NotificationSettings";
import NotificationInfoModal from "@/components/modals/NotificationInfoModal";
import SettingsInfoModal from "@/components/modals/SettingsInfoModal";
import ListMeasurements from "@/components/ListMeasurements";
import {
  CountryEnum,
  CountryOption,
  LanguageEnum,
  LanguageOption,
  availableCountries,
  availableLanguages,
} from "@/constants/LocaleEnums";
import FileDownloader from "@/components/FileDownloader";
import DialogCountry from "@/components/modals/DialogCountry";

const SettingsScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { userViewModel } = useContext(MobXProviderContext);
  const [notificationInfoModalVisible, setNotificationInfoModalVisible] =
    useState(false);
  const [settingsInfoModalVisible, setSettingsInfoModalVisible] =
    useState(false);
  const [showCountryDialog, setShowCountryDialog] = useState(false);
  const [countryCode, setCountryCode] = useState<CountryEnum>();
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>(
    null
  );

  const currentLanguage = userViewModel.currentLanguage;
  const currentCountry = userViewModel.currentCountry;

  const hideCountryDialog = () => {
    setShowCountryDialog(false);
  };

  const createJSON = (): string => {
    //TODO Add functionality to provide all data stored about a user and their hives.
    const jsonData = JSON.stringify(
      [
        {
          name: "John Smith",
          country: "Svíþjóð",
        },
      ],
      null,
      2
    );

    return jsonData;
  };

  /**
   * Turns a list of languages (`availableLanguages`) into a list without duplicates, making sure
   * each language is listed only once. If a language's code is for Norwegian Bokmål, it changes
   * that code to the standard Norwegian code. This makes the language list simpler and more consistent,
   * especially by grouping different codes for Norwegian into one. It helps clean up the list by
   * removing duplicates and making Norwegian Bokmaal just 'Norwegian'.
   */

  const uniqueLanguageOptions = availableLanguages.reduce<LanguageOption[]>(
    (unique, option) => {
      const exists = unique.some((u) => u.name === option.name);
      if (!exists) {
        unique.push({ ...option, code: option.code });
      }
      return unique;
    },
    []
  );

  /**
   * Turns a list of countries (`availableCountries`) into a list without duplicates, making sure
   * each country appears only once. If a country's code is for a web version (like `WebNorway` or `WebEngland`),
   * it changes those codes to their standard forms (`Norway` or `England`). This helps make sure
   * the country codes are consistent, especially for countries listed differently for web use.
   * It helps avoid having the same country listed more than once and makes the list of countries
   * easier to manage and understand.
   */

  const uniqueCountryOptions = availableCountries.reduce<CountryOption[]>(
    (unique, option) => {
      const exists = unique.some((u) => u.name === option.name);
      if (!exists) {
        unique.push({ ...option, code: option.code });
      }
      return unique;
    },
    []
  );

  const handleLanguageChange = (langCode: LanguageEnum) => {
    userViewModel.setLanguage(langCode);
    setExpandedAccordion(null);
  };

  const handleCountryChange = (countryCode: CountryEnum) => {
    setCountryCode(countryCode);
    setShowCountryDialog(true);
    setExpandedAccordion(null);
  };

  const toggleAccordion = (accordionName: string) => {
    setExpandedAccordion(
      expandedAccordion === accordionName ? null : accordionName
    );
  };

  useEffect(() => {
    userViewModel.fetchUserParametersFromDatabase();
    //userViewModel.updateLocaleSettings();
  }, [userViewModel]);

  return (
    <SafeAreaView style={styles(theme).container}>
      <StatusBarCustom />
      <TopBar
        navigation={navigation}
        canOpenDrawer={!!navigation.openDrawer}
        title={userViewModel.i18n.t("settings")}
        trailingIcons={[
          <TouchableOpacity onPress={() => setSettingsInfoModalVisible(true)}>
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

          <VerticalSpacer size={8} />

          <List.Accordion
            style={{
              ...styles(theme).settingsItem,
              borderRadius: 20,
              backgroundColor: theme.colors.background,
            }}
            theme={{ colors: { background: "transparent" } }}
            title={`${userViewModel.i18n.t("language")}: ${userViewModel.i18n.t(
              userViewModel.i18n.locale
            )}`}
            titleStyle={theme.fonts.bodyLarge}
            description={
              expandedAccordion === "language"
                ? userViewModel.i18n.t("language description")
                : ""
            }
            descriptionStyle={theme.fonts.bodySmall}
            descriptionNumberOfLines={5}
            left={(props) => <List.Icon {...props} icon="translate" />}
            expanded={expandedAccordion === "language"}
            onPress={() => toggleAccordion("language")}
          >
            {uniqueLanguageOptions.map((language) => (
              <List.Item
                style={{ ...styles(theme).settingsItem, borderRadius: 20 }}
                theme={{ colors: { background: "blue" } }}
                title={userViewModel.i18n.t(language.name)}
                titleStyle={theme.fonts.bodyLarge}
                key={language.code}
                onPress={() => handleLanguageChange(language.code)}
              />
            ))}
          </List.Accordion>

          <VerticalSpacer size={20} />

          <List.Accordion
            style={{
              ...styles(theme).settingsItem,
              borderRadius: 20,
              backgroundColor: theme.colors.background,
            }}
            theme={{ colors: { background: "transparent" } }}
            title={`${userViewModel.i18n.t("country")}: ${userViewModel.i18n.t(
              userViewModel.currentCountry
            )}`}
            titleStyle={theme.fonts.bodyLarge}
            description={
              expandedAccordion === "country"
                ? userViewModel.i18n.t("country description")
                : ""
            }
            descriptionStyle={theme.fonts.bodySmall}
            descriptionNumberOfLines={5}
            left={(props) => <List.Icon {...props} icon="earth" />}
            expanded={expandedAccordion === "country"}
            onPress={() => toggleAccordion("country")}
          >
            {uniqueCountryOptions.map((country) => (
              <List.Item
                style={{ ...styles(theme).settingsItem, borderRadius: 20 }}
                theme={{ colors: { background: "blue" } }}
                title={userViewModel.i18n.t(country.name)}
                titleStyle={theme.fonts.bodyLarge}
                key={country.code}
                onPress={() => handleCountryChange(country.code)}
              />
            ))}
          </List.Accordion>

          <VerticalSpacer size={20} />

          <ListMeasurements />

          <VerticalSpacer size={12} />

          <Divider style={{ backgroundColor: theme.colors.outline }} />

          <VerticalSpacer size={8} />

          <Text
            style={{
              ...theme.fonts.headlineSmall,
              textAlign: "center",
              padding: 1,
            }}
          >
            {userViewModel.i18n.t("permissions")}
          </Text>

          <VerticalSpacer size={8} />

          <PermissionSwitch type="location permission" />
          <PermissionSwitch type="camera permission" />
          <PermissionSwitch type="media permission" />

          <VerticalSpacer size={12} />

          <Divider style={{ backgroundColor: theme.colors.outline }} />

          <VerticalSpacer size={8} />

          <Text
            style={{
              ...theme.fonts.headlineSmall,
              textAlign: "center",
              padding: 1,
            }}
          >
            {userViewModel.i18n.t("notifications")}
          </Text>

          <VerticalSpacer size={8} />

          <DefaultSwitchComponent type="mobile" />
          <DefaultSwitchComponent type="sms" />
          <DefaultSwitchComponent type="email" />

          {/*TODO - Create a section with NotificationButton to allow manual debugging etc for 
          demonstration of app functionality. */}
          <NotificationButton />

          <VerticalSpacer size={12} />

          <Divider style={{ backgroundColor: theme.colors.outline }} />

          <VerticalSpacer size={8} />

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
              onPress={() => setNotificationInfoModalVisible(true)}
              style={{ marginLeft: 8 }}
            >
              <MaterialCommunityIcons
                style={styles(theme).trailingIcon}
                name="information-outline"
                size={24}
              />
            </TouchableOpacity>
          </View>

          <VerticalSpacer size={8} />

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

            <FileDownloader
              jsonString={createJSON()}
              fileName="user_data.json"
              buttonLabel={userViewModel.i18n.t("request data")}
              style={styles(theme).settingsButton}
            />

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

            <VerticalSpacer size={12} />

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

      <NotificationInfoModal
        isOverlayModalVisible={notificationInfoModalVisible}
        onClose={() => setNotificationInfoModalVisible(false)}
      />
      <SettingsInfoModal
        isOverlayModalVisible={settingsInfoModalVisible}
        onClose={() => setSettingsInfoModalVisible(false)}
      />
      {countryCode != undefined && showCountryDialog ? (
        <DialogCountry
          hideDialog={hideCountryDialog}
          countryCode={countryCode}
        />
      ) : null}
    </SafeAreaView>
  );
};

export default observer(SettingsScreen);
