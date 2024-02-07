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
      </View>
    </SafeAreaView>
  );
};

export default observer(SettingsScreen);
