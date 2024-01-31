import { useNavigation } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { observer, MobXProviderContext } from "mobx-react";
import { useContext } from "react";
import { useLocalSearchParams } from "expo-router";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button } from "react-native-paper";

type RootStackParamList = {
  hive: {
    hiveId: string;
  };
};

type HiveScreenProps = {
  route: RouteProp<RootStackParamList, "hive">;
  navigation: StackNavigationProp<RootStackParamList, "hive">;
};

const HiveScreen = (params: HiveScreenProps) => {
  const navigation = useNavigation();
  const { userViewModel } = useContext(MobXProviderContext);
  const { exampleViewModel } = useContext(MobXProviderContext);
  const hiveId = params.route.params.hiveId;

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Hive Screen</Text>
        <Text style={styles.subtitle}>Hive ID: {hiveId}</Text>
        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate("/hive/settings", { hiveId: hiveId });
          }}
        >
          Hive Settings
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate("/hive/forecast", { hiveId: hiveId });
          }}
        >
          Forecast
        </Button>
      </View>
    </View>
  );
};

export default observer(HiveScreen);

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