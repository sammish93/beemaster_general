import { useNavigation } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { observer, MobXProviderContext } from "mobx-react";
import { useContext } from "react";
import { Button } from "react-native-paper";

const SettingsScreen = () => {
  const navigation = useNavigation();
  const { userViewModel } = useContext(MobXProviderContext);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>
          String displayed in either English or Norwegian:{" "}
          {userViewModel.i18n.t("welcome")}
        </Text>
        <Text style={styles.subtitle}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
