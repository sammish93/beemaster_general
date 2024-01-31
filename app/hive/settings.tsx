import { useNavigation } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { observer, MobXProviderContext } from "mobx-react";
import { useContext } from "react";
import { useLocalSearchParams } from "expo-router";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTheme } from "react-native-paper";
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

const HiveSettingsScreen = (params: HiveScreenProps) => {
  const theme = useTheme();
  const { userViewModel } = useContext(MobXProviderContext);
  const { exampleViewModel } = useContext(MobXProviderContext);
  const hiveId = params.route.params.hiveId;

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={theme.fonts.titleLarge}>Hive Settings</Text>
        <Text style={theme.fonts.bodyLarge}>Hive ID: {hiveId}</Text>
      </View>
    </View>
  );
};

export default observer(HiveSettingsScreen);
