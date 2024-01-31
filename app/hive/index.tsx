import { useNavigation } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { observer, MobXProviderContext } from "mobx-react";
import { useContext } from "react";
import { useLocalSearchParams } from "expo-router";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button, useTheme } from "react-native-paper";
import styles from "@/assets/styles";

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
  const theme = useTheme();
  const navigation = useNavigation();
  const { userViewModel } = useContext(MobXProviderContext);
  const { exampleViewModel } = useContext(MobXProviderContext);
  const hiveId = params.route.params.hiveId;

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={theme.fonts.titleLarge}>Hive Screen</Text>
        <Text style={theme.fonts.bodyLarge}>Hive ID: {hiveId}</Text>
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
