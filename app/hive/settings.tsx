import { useNavigation } from "expo-router";
import { View } from "react-native";
import { observer, MobXProviderContext } from "mobx-react";
import { useContext } from "react";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTheme, Text } from "react-native-paper";
import styles from "@/assets/styles";
import TopBar from "@/components/TopBar";
import { SafeAreaView } from "react-native-safe-area-context";

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
  const navigation = useNavigation();
  const { userViewModel } = useContext(MobXProviderContext);
  const { exampleViewModel } = useContext(MobXProviderContext);
  const hiveId = params.route.params.hiveId;

  return (
    <SafeAreaView style={styles(theme).container}>
      <TopBar
        navigation={navigation}
        canOpenDrawer={!!navigation.openDrawer}
        title="Hive Settings"
      />
      <View style={styles(theme).main}>
        <Text style={theme.fonts.titleLarge}>Hive Settings</Text>
        <Text style={theme.fonts.bodyLarge}>Hive ID: {hiveId}</Text>
      </View>
    </SafeAreaView>
  );
};

export default observer(HiveSettingsScreen);
