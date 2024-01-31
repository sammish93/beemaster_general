import { useNavigation } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { observer, MobXProviderContext } from "mobx-react";
import { useContext } from "react";
import { Button, useTheme } from "react-native-paper";
import styles from "@/assets/styles";

const SettingsScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { userViewModel } = useContext(MobXProviderContext);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
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
            navigation.navigate("/settings/info/index");
          }}
        >
          See More Info
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            userViewModel.clear();
          }}
        >
          Logout
        </Button>
      </View>
    </View>
  );
};

export default observer(SettingsScreen);
