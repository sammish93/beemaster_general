import { useNavigation } from "expo-router";
import { View } from "react-native";
import { observer, MobXProviderContext } from "mobx-react";
import { useContext, useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import styles from "@/assets/styles";
import { useTheme, Text } from "react-native-paper";
import TopBar from "@/components/TopBar";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarCustom from "@/components/StatusBarCustom";
import { fetchWeatherForecast } from "@/data/api/weatherApi";

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

  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWeatherForecast({ lat: 60.1, lon: 9.58 });

        setData(JSON.stringify(data));
      } catch (error) {
        // TODO
        setData("Error retrieving data");
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles(theme).container}>
      <StatusBarCustom />
      <TopBar
        navigation={navigation}
        canOpenDrawer={!!navigation.openDrawer}
        title="Forecast"
      />
      <View style={styles(theme).main}>
        <Text style={theme.fonts.titleLarge}>Hive Forecast</Text>
        <Text style={theme.fonts.bodyLarge}>Hive ID: {hiveId}</Text>
        <Text style={theme.fonts.bodySmall}>{data}</Text>
      </View>
    </SafeAreaView>
  );
};

export default observer(HiveForecastScreen);
