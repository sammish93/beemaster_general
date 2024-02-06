import { useNavigation } from "expo-router";
import { View } from "react-native";
import { observer, MobXProviderContext } from "mobx-react";
import { useContext } from "react";
import { useLocalSearchParams } from "expo-router";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import styles from "@/assets/styles";
import { useTheme, Text } from "react-native-paper";
import TopBar from "@/components/TopBar";

type RootStackParamList = {
  hive: {
    hiveId: string;
  };
};

type HiveScreenProps = {
  route: RouteProp<RootStackParamList, "hive">;
  navigation: StackNavigationProp<RootStackParamList, "hive">;
};

const HiveForecastScreen = (params: HiveScreenProps) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { userViewModel } = useContext(MobXProviderContext);
  const { exampleViewModel } = useContext(MobXProviderContext);
  const hiveId = params.route.params.hiveId;

  return (
    <View style={styles(theme).container}>
      <TopBar
        navigation={navigation}
        canOpenDrawer={!!navigation.openDrawer}
        title="Forecast"
      />
      <View style={styles(theme).main}>
        <Text style={theme.fonts.titleLarge}>Hive Forecast</Text>
        <Text style={theme.fonts.bodyLarge}>Hive ID: {hiveId}</Text>
      </View>
    </View>
  );
};

export default observer(HiveForecastScreen);
